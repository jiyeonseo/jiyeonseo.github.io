---
date: 2018-05-16
tags: 
  - etc
---

# Introduction to Kubernetes - 2

refer to edX course ["Introduction to Kubernetes"](https://courses.edx.org/courses/course-v1:LinuxFoundationX+LFS158x+1T2018/)

***

# Kubernetes Configuration 
4가지 주요 설치 방법
1. All-in-One Single-Node Installation 
- 하나에 다. 
- 마스터/워커 컴포넌트를 하나의 노드
- 처음 배울때, 개발, 테스트 시에 좋음. 하지만 production 에서는 사용하지 말아야함. 
- ex) Minikube 
2. Single-Node etcd, Single-Master, and Multi-Worker Installation
- 하나의 마스터 노드/하나의 etcd instance 
- 여러 워커 노드가 마스터 노드에 연결
3. Single-Node etcd, Multi-Master, and Multi-Worker Installation
- 여러 마스터 노드/HA mode/하나의 etcd instance
- 여러 워커 노드가 마스터 노드에 연결
4. Multi-Node etcd, Multi-Master, and Multi-Worker Installation
- etcd가 clustered mode에서 설정, Kubernetes cluster 외부에 있으며 노드들과 연결됨. 
- 마스터 노드는 HA mode로 설정 
- 여러 워커 노드와 연결 
- production에 가장 추천하는 방법.

# Choosing the right solution 

[https://kubernetes.io/docs/setup/pick-right-solution/](https://kubernetes.io/docs/setup/pick-right-solution/) 

## Localhost 
- [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/) : all-in-one 쿠버네티스 셋업시 추천한다. 
- [Ubuntu on LXD](https://kubernetes.io/docs/getting-started-guides/ubuntu/local/) 

# Minikube

## requirements 
- kubectl : binaryused  to access any Kubernetes cluster.
- hypervisors
  - On Linux : Virtual Box or KVM
  - On MacOS : Hyperkit driver, xhyve driver, VirtualBox, or VMware Fusion
  - On Window : VirtualBox or Hyper-V

## Install  
- Mac OS에 대해서만 정리하겠다. 

1. Install Minikube : 가장 최신버전은 [Minikube release page](https://github.com/kubernetes/minikube/releases) 에서 확인.
```
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/v0.26.1/minikube-darwin-amd64 && chmod +x minikube && sudo mv minikube /usr/local/bin/
```

2. Start 
```
$ minikube start 
```

3. check the status 
```
$ minikube status
```

4. stop Minikube
```
$ minikube stop 
```

### Access to Minikube
1. CLI
  - [kubectl](https://kubernetes.io/docs/reference/generated/kubectl/kubectl/)
  - 쿠버네티스 클러스터 리소스와 어플리케이션을 운영
2. GUI
  - 쿠버네티스 대시보드 
3. API
