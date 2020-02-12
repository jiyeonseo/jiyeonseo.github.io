---
date: 2018-05-11
tags:
  - etc
---

# Introduction to Kubernetes - 1

refer to edX course ["Introduction to Kubernetes"](https://courses.edx.org/courses/course-v1:LinuxFoundationX+LFS158x+1T2018/)

***

Container Orchestrator 중 하나인 쿠버네티스. 
Container는 무엇이며, Container Orchestration은 왜 필요한지
그리고 쿠버네티스의 특징은 무엇이 있는지 공부하며 정리 하였습니다. 

# Containers?
- an application-centric way to deliver high-performing, scalable applications on the infrastructure of your choice
- container image : bundle the application along with its runtime and dependencies.
- 이 이미지를 가지고 컨테이너 환경을 독립적으로 실행 가능 

# Container Orchestration? 
- QA 단계에서는 하나의 호스트와 하나의 테스트 어플리케이션만으로도 테스트가 가능하다
- 하지만 실제 production 모드에서는 
  - Fault-tolerant 
  - 확장 가능해야하며 
  - 리소스를 효율적으로 사용해야하며 
  - 각각의 어플리케이션들을 찾고 서로 커뮤니케이션 할 수 있어야 하며 
  - 외부 세계와도 연결가능하며
  - 다운타임 없이 업데이트 혹은 롤백이 되어야 한다. 
- Container orchestrator : 위의 조건들을 모두 만족할수 있도록 도와주며, 클러스터로 모든 호스트들을 묶어주는 툴. 
- ex) Docker Swarm, Kubernetes, Mesos Marathon, Amazon ECS, Hashicorp Nomad.

# Why use Container Orchestrators?
- 여러 호스트들을 묶고 클러스터로 만들어준다. 
- 다른 호스트들에서 컨테이너들을 스케쥴링
- 같은 클러스터 내 다른 호스트에서 돌고있는 컨테이너들끼리 통신할수 있게 해준다.
- 컨테이너와 스토리지를 묶어준다.
- 서비스와 같이 higher-level construct와 비슷한 타입의 컨테이너로 묶어준다. 
- 계속해서 리소스 사용을 확인하며 필요한 경우 optimize
- 컨테이너 내 application 의 접근을 보장해준다. 

# Where to deploy container orchestrators? 
- 대부분의 오케스트레이터들은 원하는 인프라스트럭쳐 위에서 배포 가능하다 
- 개인 로컬, AWS, OpenStack 도 가능하며 
- Google Could 내 Google Kubernetes Engine이나 Azure Container Service 의 경우원 클릭으로 설치 가능하다. 

# What is Kubernetes?

"Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.”

- 이름의 어원은 그리스어 κυβερνήτης: 
- 조타수, 키잡이 라는 뜻.
- 즉, 컨테이너를 운반하는 매니저 라고 생각하면 된다. 
- k8s 이라고 쓰이기도 한다. 
- Google Borg system에서 시작되었으며, Go language로 쓰여졌다. 
- Apache License Version 2.0.

이 블로그는 2018년 2월, 1.9 stable version을 기준으로 하고 있습니다.  

# Kubernatetes Feature
- Automatic binpacking
  - 쿠버네티스는 자동으로 리소스 사용량과 제약조건에 따라서 커네이너들을 스케쥴링 한다.
- Self-healing
  - 만약 노드에서 실패가 일어나면 자동적으로 대체하고 재 스케쥴링을 한다. 
  - 만약 헬스체크에 응답이 제대로 오지않으면 컨테이너를 킬하고 재시작한다.
- Horizontal scaling 
  - CPU나 메모리와 같은 리소스 사용을 기반으로 자동적으로 확장 가능하다. 
  - custom metrics에 따라 다이나믹하게 화장도 가능하다. 
- Service discovery and Load balancing
  - DNS를 이용하여 컨테이너 그룹을 세팅할수도 있다. 
  - 이 DNS를 Kunernetes service라고 부른다. 
  - 쿠버네티스는 이 service들을 자동으로 찾아내고 서비스 내 컨테이너들에게 request를 load-bancing 할수 있다. 
- Automated rollouts and rollbacks
  - 다운타임 없이 설정값 혹은 새 버전으로 배포 혹은 롤백 가능
- Secrets and configuration management
  - 새로 이미지를 빌드하지않고도 secrets나 설정값을 변경할 수 있다. 
  - secret 을 이용하면 감춰야 하는 정보들을 Github과 같은 stck configuration에 보이지 않고 설정 할 수 있다. 
- Storage orchestration 
  - With Kubernetes and its plugins, we can automatically mount local, external, and storage solutions to the containers in a seamless manner, based on software-defined storage (SDS).
- Batch execution 
  - 배치성 잡 실행 가능

# Case studies
- Pearson, eBay, Huawei, … 
- [https://kubernetes.io/case-studies/](https://kubernetes.io/case-studies/)


# Kubernetes Architecture

<img src="/images/kubernetes/Kubernetes_Architecture1.png" />

## main components 

- master nodes
- worker nodes
- distributed key-value store : etcd 

###  master node

<img src="/images/kubernetes/Master_Node1.png" />

- 쿠버네티스 클러스터 관리
- 모든 administrative task의 시작점
- CLI, GUI(대시보드) 혹은 API를 통해 커뮤니케이션 할 수 있다. 
- fault tolerance를 위해서 한개 이상의 마스터 노드를 한 클러스터 안에 둘 수 있다. 
  - 한개 이상의 마스터 노드를 가진다면 HA(high availability) 모드라 하며 
  - 하나의 노드가 leader 모든 동작들을 관장하고 나머지는 follower 임. 
- 클러스터 상태값(state)을 관리하기 위해 etcd(https://coreos.com/etcd/) 를 사용.  

마스터 노드 아래에는 다음과 같은 컴포넌트들이 있다. 

- API server
  - 모든 administrative task들은 마스터 노드 내 API server를 통해 들어온다. 
  - 외부에서 REST로 명령어를 보내면 유효성 및 요청 작업을 처리 
  - 작업 처리 후 결과를 distributed key-value store에 저장 
- Scheduler
  - 다른 worker node 에서 일할 work들을 스케쥴링 
  - 각각 노드들의 리소스 사용량을 알고 있다. 
  - 그 밖에도 유저 혹은 작업자의 constraints 도 알고 있다. 
- Controller manager
  - 쿠버네티스 클러스터의 상태를 조절하는 control loops들을 관리.
  - 각각의 control loop들은 알맞는 상태(desired state)값을 알고 현재의 상태값을 API server를 통해 계속 모니터링 한다.  
  - 만약 올바른 상태값과 현재 상태값이 다르면 알맞는 단계를 거쳐 같도록 만든다. 
- etcd 
  - distributed key-value store
  - 마스터 노드의 일부. 
  - 외부에 의해 설정될수도 있다.  

###  Worker node 

<img src="/images/kubernetes/Worker_Node.png" />

- Pod을 통해 어플리케이션이 run되는 머신(VM, physical sever...)
- master node에 의해 컨트롤링 된다. 
- Pod : worker node에서 스케쥴링되며 run 하고 연결하기 위해 꼭 필요한 tool이다.  Scheduling unit in Kubernetes 

워커 노드 아래에는 다음과 같은 컴포넌트들이 있다. 
- Container runtime
  - 컨테이너의 lifecyle을 실행시키고 관리하기 위해 사용
  - [containerd](https://containerd.io/), [rkt](https://coreos.com/rkt/), [lxd](https://linuxcontainers.org/lxd/)
  - 간혹 Docker를 container runtime이라고도 하는데 정확히 따지자면 도커는 continer untime으로 containerd를 사용하는 플랫폼이다. 
- kubelet
  - 각 워커 노드들과 마스터 노드가 커뮤니케이션 할수 있도록 하는 agent.
  - Pod으로 부터 여러가지 정의를 받고 pod과 연결된 컨테이너들을 실행시킨다. 
  - Kuberlet은 Container runtime과 Container Runtime Interface(CRI를 통해 연결)
<img src="/images/kubernetes/CRI.png" />
  - kubelet <-> CRI shim : to perform container and image operations. 
    - CRI는 두개의 서비스를 구현 : `ImageService` 와 `RuntimeService`
    - `ImageService` : Image 와 관련된 동작들을 책임
    - `RuntimeService` : 모든 Pod과 container와 관련된 동작들을 책임. 

- CRI shims
  - ex) dockershims 
<img src="/images/kubernetes/dockershim.png" />
  - ex) cri-containerd     
  <img src="/images/kubernetes/cri-containerd.png" />
- kube-proxy
  - Pods가 어플리케이션과 직접 커넥션 맺는것보다 logical constuct인 `Service` 를 endpoint로 연결한다. 이 Service 그룹은 pod과 연결되어 로드발랜싱을 해준다. 
  - kube-proxy 는 각각의 워커 노드의 실행해주고, 각 Service endpoint를 위한 API server로 들어오는 network proxy. 
  - 각각의 Service endpoint마다 kube-proxy가 설정되어 route된다. 

 ### etcd를 통한 상태 관리 
- etcd는 [Raft Consensus Algorithm](https://web.stanford.edu/~ouster/cgi-bin/papers/raft-atc14) 을 기반으로한 key-value sotre이다. 
- 항상 그룹 내 하나는 master이며 나머지는 follower이다. 
- Go language
- Kubernaetes 에서는 cluster state 저장 뿐만 아니라 configuration detail도 저장한다. ex) subnets, ConfigMaps, Secrets 

## 네트워크 setup
- 각 Pod는 반드시 유니크한 IP를 할당해야한다
  - container networking을 위해 두가지 선택지가 있다. 
  - **Container Network Model(CNM)** proposed by Docker
  - **Container Network Interface(CNI)** proposed by CoreOS << Kubernetes uses this 
- Pod 내 Container들끼리 커뮤니케이션 가능하다
  - Linux에서는 모든 엔티티끼리 **network namespace**를 사용하는데, Pod 내 컨테이너들끼리 이 network namespace를 공유하여 서로 커뮤니케이션을 할 수 있다. 
- Pod 는 클러스터내 다른 Pod과 커뮤니케이션 가능하다 
  - Routable Pods and nodes, using the underlying physical infrastructure, like Google Kubernetes Engine
  - Using Software Defined Networking, like Flannel, Weave, Calico, etc. 
- 설정에 따라 pod 내 배포된 application는 외부와도 연결 가능하다. 
  - kube-proxy 를 이용해서. 

