---
date: 2022-06-24
tags: 
- kubernetes
---

# [K8S] Node 스케쥴링 - taint/cordon/drain

## 이슈 상황 및 해결
 
갑자기 application이 안된다고 연락이 와서 후다닥 pod들을 확인하였더니 다 `Pending` 상태로 멈춰있는 것을 확인했다. (진리의 껏키) 재배포를 시도하였으나, Pod이 `Terminating`도 아니고 그대로 쭉 `Pending`으로 멈춰있는 상태. `kubectl describe pod <pod 이름>` 해보니 아래와 같은 상태로 멈춰있었다.

```
Type Reason Age From Message

---- ------ ---- ---- -------

Warning FailedScheduling 66s (x31 over 46m) default-scheduler 0/20 nodes are available: 17 node(s) were unschedulable, 3 node(s) had taints that the pod didn't tolerate.
```

가능한 노드가 없다. `kubectl get nodes`로 노드 상태를 확인해보았다.

```sh

NAME STATUS ROLES AGE VERSION

cluster-e1 Ready controlplane,etcd 204d v1.14.6

cluster-e2 Ready controlplane,etcd 204d v1.14.6

cluster-e3 Ready controlplane,etcd 204d v1.14.6

cluster-w1 Ready,SchedulingDisabled worker 417d v1.14.6

cluster-w2 Ready,SchedulingDisabled worker 417d v1.14.6

cluster-w3 Ready,SchedulingDisabled worker 417d v1.14.6

```

worker node들이 모두 `SchedulingDisabled` 상태임을 확인했다.

```sh
$ kubectl uncordon -l node-role.kubernetes.io/worker=true
```

worker node들에 대하여 `uncordon` 해주었고, `pending` 은 자연스럽게 풀리면서 정상화 되었다.

## 쿠버네티스 스케쥴링 

![스크린샷 2022-06-25 오후 1 34 46](https://user-images.githubusercontent.com/2231510/175758120-7027210d-1435-47a6-a681-d2fb56889513.png)
(ref: [시작하세요!도커/쿠버네티스](http://www.yes24.com/Product/Goods/93765519))

- pod 생성시 어느 노드에 생성할 것인지 결정하는 일
- 노드 필터링/ 노드 스코어링을 통해 최종적으로 어느 노드에 생성할 지 결정. 
  - 노드 필터링 : 할당 가능한지 아닌지. 가용 자원지 충분한 조건인지. `kubectl get nodes` 에서 STATUS가 Ready 인지 등 
  - 노드 스코어링 : 쿠버네티스의 알고리즘 가중치에 따라 매겨짐. 도커 이미지가 이미 노드에 존재 하는지, 가용 자원이 많은 지 등 

## nodeName, nodeSelector

Pod YAML에 어느 노드에 띄울 것인지 지정하면 스케쥴링에 의해서가 아니라 **특정 워커 노드에 할당**되게 만들 수 있다. 

```sh
$ kubectl get nodes # node 이름 확인

NAME STATUS ROLES AGE VERSION

...
cluster-w1 Ready worker 417d v1.14.6
...

```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  nodeName: cluster-w1
```

하지만 이렇게 하면 유연성에 좋지 못함. 그 노드가 잘못 되면?! 대신 라벨(Label)을 사용해 볼 수 있음.

```sh
# label과 함께 node들 확인
$ kubectl get nodes --show-labels

# node에 label 추가하기 
$ kubectl label nodes <node> <label>
$ kubectl label nodes cluster-w1 mylabel/disk=hdd
```

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  nodeSelector: 
    mylabel/disk: hdd
```

- 쿠버네티스 클러스터 운영시에 특정 노드에 문제가 생겨서 빼야한다던가 pod들을 이사 시키는 등 pod들이 특정 노드에 스케쥴링 되지 않도록 제한을 걸어 주어야 할 때가 있음. 이때 `taint`, `cordon`, `drain` 등을 사용하여 운영.

## taint, toleration

- `taint` 는 특정 노드에 '얼룩'을 지정하여 해당 노드에 pod가 할당 되는 것을 막는 것. 
- `taint` 가 되어있는 노드이지만 `용인`(toleration)된 pod은 할당이 가능하다. 
- `taint`는 노드 별로 설정 될 수도 있고, 특정 이벤트에 따라 쿠버네티스에서 자동으로 설정하기도 함.
  - 기본적으로 마스터 노드는 pod이 할당되지 않도록 taint 설정되어있음.
  ```
  $ kubectl describe node cluster-e1 
  
  ...
  Taints:             node-role.kubernetes.io/master:NoSchedule
  Unschedulable:      false # 스케쥴링 대상이 되는 노드다
  ...

  ```
- taint 설정은 라벨과 비슷하게 키=값 형태로 설정
  - 다른점 : 뒤에 `:effect`가 붙음
  - `NoSchedule` : pod 스케쥴링 하지 않음
  - `NoExcute` : pod 실행 허용하지 않음
  - `PreferNoSchedule` : 가능하면 스케쥴링하지 않음 

```sh 
$ kubectl taint node <노드 이름> <key=value:effect>
$ kubectl taint node cluster-w1 cheese/taint=dirty:NoSchedule

# taint 삭제 
$ kubectl taint node <노드 이름> <key:effect->
```

만약, 이 node에 특정 pod을 용인(toleration) 해주려면 다음과 같이 yaml을 작성

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
spec:
  tolerations: 
  - key: cheese/taint
    value: dirty
    operator: Equal   # cheese/taint 값이 dirty 이며
    effect: NoSchedule    # Taint effect가 NoSchedule 인 경우 용인한다.   
...

```
- node 할당을 **용인** 한다는거지, 반드시 저 노드에 할당 된다는 뜻 X  

## cordon, uncordon

- 위와 동일하게 스케쥴링 되는 것을 막는 방법. 다만 좀 더 명시적으로. 


```sh
$ kubectl cordon <노드 이름>
$ kubectl cordon cluster-w1

$ kubectl get nodes
NAME STATUS ROLES AGE VERSION

...
cluster-w1 Ready,SchedulingDisabled worker 417d v1.14.6
...

$ kubectl describe node cluster-w1

...
Taints:             node.kubernetes.io/unschedulable:NoSchedule
Unschedulable:      true # 스케쥴링 대상이 안된다. 
...

```

- 이미 해당 노드에 실행중인 pod은 종료되지는 않음. 
- 다시 스케쥴링 대상으로 넣으려면 아래와 같이 `uncordon` 할 수 있음. 

```sh
$ kubectl uncordon <노드 이름>
$ kubectl uncordon cluster-w1

$ kubectl get nodes
NAME STATUS ROLES AGE VERSION

...
cluster-w1 Ready worker 417d v1.14.6
...
```

## drain

- cordon과 비슷. 노드에서 **기존 실행 중인 pod를 다른 노드로 옮겨가도록 퇴거(eviction) 수행.**
  
```sh
$ kubectl drain <노드 이름>
$ kubectl drain cluster-w1

$ kubectl get nodes
NAME STATUS ROLES AGE VERSION

...
cluster-w1 Ready,SchedulingDisabled worker 417d v1.14.6
...

```

- 만약 노드에 데몬셋으로 실행된 pod이 있으면 drain은 실패함. 
  - `--ignore-daemonsets=true` 옵션을 주면 무시함. 

- pod은 graceful 하게 종료 및 삭제.
  - kubelet을 통해 직접 실행된 [static pod](https://kubernetes.io/ko/docs/tasks/configure-pod-container/static-pod/) 들은 drain을 통해 삭제되지 않는다. 

더 자세한 내용은 [쿠버네티스 스케쥴러 문서](https://kubernetes.io/ko/docs/concepts/scheduling-eviction/kube-scheduler/)를 참고할 수 있다.
  

## References

- [https://arisu1000.tistory.com/27845](https://arisu1000.tistory.com/27845)

- [https://arisu1000.tistory.com/27846?category=787056](https://arisu1000.tistory.com/27846?category=787056)

- [https://velog.io/@koo8624/Kubernetes-Drain-Cordon-and-Uncordon](https://velog.io/@koo8624/Kubernetes-Drain-Cordon-and-Uncordon)