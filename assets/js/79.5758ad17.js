(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{483:function(e,t,r){"use strict";r.r(t);var i=r(5),n=Object(i.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"introduction-to-kubernetes-1"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduction-to-kubernetes-1"}},[e._v("#")]),e._v(" Introduction to Kubernetes - 1")]),e._v(" "),t("p",[e._v("refer to edX course "),t("a",{attrs:{href:"https://courses.edx.org/courses/course-v1:LinuxFoundationX+LFS158x+1T2018/",target:"_blank",rel:"noopener noreferrer"}},[e._v('"Introduction to Kubernetes"'),t("OutboundLink")],1)]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("Container Orchestrator 중 하나인 쿠버네티스.\nContainer는 무엇이며, Container Orchestration은 왜 필요한지\n그리고 쿠버네티스의 특징은 무엇이 있는지 공부하며 정리 하였습니다.")]),e._v(" "),t("h1",{attrs:{id:"containers"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#containers"}},[e._v("#")]),e._v(" Containers?")]),e._v(" "),t("ul",[t("li",[e._v("an application-centric way to deliver high-performing, scalable applications on the infrastructure of your choice")]),e._v(" "),t("li",[e._v("container image : bundle the application along with its runtime and dependencies.")]),e._v(" "),t("li",[e._v("이 이미지를 가지고 컨테이너 환경을 독립적으로 실행 가능")])]),e._v(" "),t("h1",{attrs:{id:"container-orchestration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#container-orchestration"}},[e._v("#")]),e._v(" Container Orchestration?")]),e._v(" "),t("ul",[t("li",[e._v("QA 단계에서는 하나의 호스트와 하나의 테스트 어플리케이션만으로도 테스트가 가능하다")]),e._v(" "),t("li",[e._v("하지만 실제 production 모드에서는\n"),t("ul",[t("li",[e._v("Fault-tolerant")]),e._v(" "),t("li",[e._v("확장 가능해야하며")]),e._v(" "),t("li",[e._v("리소스를 효율적으로 사용해야하며")]),e._v(" "),t("li",[e._v("각각의 어플리케이션들을 찾고 서로 커뮤니케이션 할 수 있어야 하며")]),e._v(" "),t("li",[e._v("외부 세계와도 연결가능하며")]),e._v(" "),t("li",[e._v("다운타임 없이 업데이트 혹은 롤백이 되어야 한다.")])])]),e._v(" "),t("li",[e._v("Container orchestrator : 위의 조건들을 모두 만족할수 있도록 도와주며, 클러스터로 모든 호스트들을 묶어주는 툴.")]),e._v(" "),t("li",[e._v("ex) Docker Swarm, Kubernetes, Mesos Marathon, Amazon ECS, Hashicorp Nomad.")])]),e._v(" "),t("h1",{attrs:{id:"why-use-container-orchestrators"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#why-use-container-orchestrators"}},[e._v("#")]),e._v(" Why use Container Orchestrators?")]),e._v(" "),t("ul",[t("li",[e._v("여러 호스트들을 묶고 클러스터로 만들어준다.")]),e._v(" "),t("li",[e._v("다른 호스트들에서 컨테이너들을 스케쥴링")]),e._v(" "),t("li",[e._v("같은 클러스터 내 다른 호스트에서 돌고있는 컨테이너들끼리 통신할수 있게 해준다.")]),e._v(" "),t("li",[e._v("컨테이너와 스토리지를 묶어준다.")]),e._v(" "),t("li",[e._v("서비스와 같이 higher-level construct와 비슷한 타입의 컨테이너로 묶어준다.")]),e._v(" "),t("li",[e._v("계속해서 리소스 사용을 확인하며 필요한 경우 optimize")]),e._v(" "),t("li",[e._v("컨테이너 내 application 의 접근을 보장해준다.")])]),e._v(" "),t("h1",{attrs:{id:"where-to-deploy-container-orchestrators"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#where-to-deploy-container-orchestrators"}},[e._v("#")]),e._v(" Where to deploy container orchestrators?")]),e._v(" "),t("ul",[t("li",[e._v("대부분의 오케스트레이터들은 원하는 인프라스트럭쳐 위에서 배포 가능하다")]),e._v(" "),t("li",[e._v("개인 로컬, AWS, OpenStack 도 가능하며")]),e._v(" "),t("li",[e._v("Google Could 내 Google Kubernetes Engine이나 Azure Container Service 의 경우원 클릭으로 설치 가능하다.")])]),e._v(" "),t("h1",{attrs:{id:"what-is-kubernetes"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#what-is-kubernetes"}},[e._v("#")]),e._v(" What is Kubernetes?")]),e._v(" "),t("p",[e._v('"Kubernetes is an open-source system for automating deployment, scaling, and management of containerized applications.”')]),e._v(" "),t("ul",[t("li",[e._v("이름의 어원은 그리스어 κυβερνήτης:")]),e._v(" "),t("li",[e._v("조타수, 키잡이 라는 뜻.")]),e._v(" "),t("li",[e._v("즉, 컨테이너를 운반하는 매니저 라고 생각하면 된다.")]),e._v(" "),t("li",[e._v("k8s 이라고 쓰이기도 한다.")]),e._v(" "),t("li",[e._v("Google Borg system에서 시작되었으며, Go language로 쓰여졌다.")]),e._v(" "),t("li",[e._v("Apache License Version 2.0.")])]),e._v(" "),t("p",[e._v("이 블로그는 2018년 2월, 1.9 stable version을 기준으로 하고 있습니다.")]),e._v(" "),t("h1",{attrs:{id:"kubernatetes-feature"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kubernatetes-feature"}},[e._v("#")]),e._v(" Kubernatetes Feature")]),e._v(" "),t("ul",[t("li",[e._v("Automatic binpacking\n"),t("ul",[t("li",[e._v("쿠버네티스는 자동으로 리소스 사용량과 제약조건에 따라서 커네이너들을 스케쥴링 한다.")])])]),e._v(" "),t("li",[e._v("Self-healing\n"),t("ul",[t("li",[e._v("만약 노드에서 실패가 일어나면 자동적으로 대체하고 재 스케쥴링을 한다.")]),e._v(" "),t("li",[e._v("만약 헬스체크에 응답이 제대로 오지않으면 컨테이너를 킬하고 재시작한다.")])])]),e._v(" "),t("li",[e._v("Horizontal scaling\n"),t("ul",[t("li",[e._v("CPU나 메모리와 같은 리소스 사용을 기반으로 자동적으로 확장 가능하다.")]),e._v(" "),t("li",[e._v("custom metrics에 따라 다이나믹하게 화장도 가능하다.")])])]),e._v(" "),t("li",[e._v("Service discovery and Load balancing\n"),t("ul",[t("li",[e._v("DNS를 이용하여 컨테이너 그룹을 세팅할수도 있다.")]),e._v(" "),t("li",[e._v("이 DNS를 Kunernetes service라고 부른다.")]),e._v(" "),t("li",[e._v("쿠버네티스는 이 service들을 자동으로 찾아내고 서비스 내 컨테이너들에게 request를 load-bancing 할수 있다.")])])]),e._v(" "),t("li",[e._v("Automated rollouts and rollbacks\n"),t("ul",[t("li",[e._v("다운타임 없이 설정값 혹은 새 버전으로 배포 혹은 롤백 가능")])])]),e._v(" "),t("li",[e._v("Secrets and configuration management\n"),t("ul",[t("li",[e._v("새로 이미지를 빌드하지않고도 secrets나 설정값을 변경할 수 있다.")]),e._v(" "),t("li",[e._v("secret 을 이용하면 감춰야 하는 정보들을 Github과 같은 stck configuration에 보이지 않고 설정 할 수 있다.")])])]),e._v(" "),t("li",[e._v("Storage orchestration\n"),t("ul",[t("li",[e._v("With Kubernetes and its plugins, we can automatically mount local, external, and storage solutions to the containers in a seamless manner, based on software-defined storage (SDS).")])])]),e._v(" "),t("li",[e._v("Batch execution\n"),t("ul",[t("li",[e._v("배치성 잡 실행 가능")])])])]),e._v(" "),t("h1",{attrs:{id:"case-studies"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#case-studies"}},[e._v("#")]),e._v(" Case studies")]),e._v(" "),t("ul",[t("li",[e._v("Pearson, eBay, Huawei, …")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://kubernetes.io/case-studies/",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://kubernetes.io/case-studies/"),t("OutboundLink")],1)])]),e._v(" "),t("h1",{attrs:{id:"kubernetes-architecture"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#kubernetes-architecture"}},[e._v("#")]),e._v(" Kubernetes Architecture")]),e._v(" "),t("img",{attrs:{src:"/images/kubernetes/Kubernetes_Architecture1.png"}}),e._v(" "),t("h2",{attrs:{id:"main-components"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#main-components"}},[e._v("#")]),e._v(" main components")]),e._v(" "),t("ul",[t("li",[e._v("master nodes")]),e._v(" "),t("li",[e._v("worker nodes")]),e._v(" "),t("li",[e._v("distributed key-value store : etcd")])]),e._v(" "),t("h3",{attrs:{id:"master-node"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#master-node"}},[e._v("#")]),e._v(" master node")]),e._v(" "),t("img",{attrs:{src:"/images/kubernetes/Master_Node1.png"}}),e._v(" "),t("ul",[t("li",[e._v("쿠버네티스 클러스터 관리")]),e._v(" "),t("li",[e._v("모든 administrative task의 시작점")]),e._v(" "),t("li",[e._v("CLI, GUI(대시보드) 혹은 API를 통해 커뮤니케이션 할 수 있다.")]),e._v(" "),t("li",[e._v("fault tolerance를 위해서 한개 이상의 마스터 노드를 한 클러스터 안에 둘 수 있다.\n"),t("ul",[t("li",[e._v("한개 이상의 마스터 노드를 가진다면 HA(high availability) 모드라 하며")]),e._v(" "),t("li",[e._v("하나의 노드가 leader 모든 동작들을 관장하고 나머지는 follower 임.")])])]),e._v(" "),t("li",[e._v("클러스터 상태값(state)을 관리하기 위해 etcd(https://coreos.com/etcd/) 를 사용.")])]),e._v(" "),t("p",[e._v("마스터 노드 아래에는 다음과 같은 컴포넌트들이 있다.")]),e._v(" "),t("ul",[t("li",[e._v("API server\n"),t("ul",[t("li",[e._v("모든 administrative task들은 마스터 노드 내 API server를 통해 들어온다.")]),e._v(" "),t("li",[e._v("외부에서 REST로 명령어를 보내면 유효성 및 요청 작업을 처리")]),e._v(" "),t("li",[e._v("작업 처리 후 결과를 distributed key-value store에 저장")])])]),e._v(" "),t("li",[e._v("Scheduler\n"),t("ul",[t("li",[e._v("다른 worker node 에서 일할 work들을 스케쥴링")]),e._v(" "),t("li",[e._v("각각 노드들의 리소스 사용량을 알고 있다.")]),e._v(" "),t("li",[e._v("그 밖에도 유저 혹은 작업자의 constraints 도 알고 있다.")])])]),e._v(" "),t("li",[e._v("Controller manager\n"),t("ul",[t("li",[e._v("쿠버네티스 클러스터의 상태를 조절하는 control loops들을 관리.")]),e._v(" "),t("li",[e._v("각각의 control loop들은 알맞는 상태(desired state)값을 알고 현재의 상태값을 API server를 통해 계속 모니터링 한다.")]),e._v(" "),t("li",[e._v("만약 올바른 상태값과 현재 상태값이 다르면 알맞는 단계를 거쳐 같도록 만든다.")])])]),e._v(" "),t("li",[e._v("etcd\n"),t("ul",[t("li",[e._v("distributed key-value store")]),e._v(" "),t("li",[e._v("마스터 노드의 일부.")]),e._v(" "),t("li",[e._v("외부에 의해 설정될수도 있다.")])])])]),e._v(" "),t("h3",{attrs:{id:"worker-node"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#worker-node"}},[e._v("#")]),e._v(" Worker node")]),e._v(" "),t("img",{attrs:{src:"/images/kubernetes/Worker_Node.png"}}),e._v(" "),t("ul",[t("li",[e._v("Pod을 통해 어플리케이션이 run되는 머신(VM, physical sever...)")]),e._v(" "),t("li",[e._v("master node에 의해 컨트롤링 된다.")]),e._v(" "),t("li",[e._v("Pod : worker node에서 스케쥴링되며 run 하고 연결하기 위해 꼭 필요한 tool이다.  Scheduling unit in Kubernetes")])]),e._v(" "),t("p",[e._v("워커 노드 아래에는 다음과 같은 컴포넌트들이 있다.")]),e._v(" "),t("ul",[t("li",[t("p",[e._v("Container runtime")]),e._v(" "),t("ul",[t("li",[e._v("컨테이너의 lifecyle을 실행시키고 관리하기 위해 사용")]),e._v(" "),t("li",[t("a",{attrs:{href:"https://containerd.io/",target:"_blank",rel:"noopener noreferrer"}},[e._v("containerd"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://coreos.com/rkt/",target:"_blank",rel:"noopener noreferrer"}},[e._v("rkt"),t("OutboundLink")],1),e._v(", "),t("a",{attrs:{href:"https://linuxcontainers.org/lxd/",target:"_blank",rel:"noopener noreferrer"}},[e._v("lxd"),t("OutboundLink")],1)]),e._v(" "),t("li",[e._v("간혹 Docker를 container runtime이라고도 하는데 정확히 따지자면 도커는 continer untime으로 containerd를 사용하는 플랫폼이다.")])])]),e._v(" "),t("li",[t("p",[e._v("kubelet")]),e._v(" "),t("ul",[t("li",[e._v("각 워커 노드들과 마스터 노드가 커뮤니케이션 할수 있도록 하는 agent.")]),e._v(" "),t("li",[e._v("Pod으로 부터 여러가지 정의를 받고 pod과 연결된 컨테이너들을 실행시킨다.")]),e._v(" "),t("li",[e._v("Kuberlet은 Container runtime과 Container Runtime Interface(CRI를 통해 연결)\n"),t("img",{attrs:{src:"/images/kubernetes/CRI.png"}})]),e._v(" "),t("li",[e._v("kubelet <-> CRI shim : to perform container and image operations.\n"),t("ul",[t("li",[e._v("CRI는 두개의 서비스를 구현 : "),t("code",[e._v("ImageService")]),e._v(" 와 "),t("code",[e._v("RuntimeService")])]),e._v(" "),t("li",[t("code",[e._v("ImageService")]),e._v(" : Image 와 관련된 동작들을 책임")]),e._v(" "),t("li",[t("code",[e._v("RuntimeService")]),e._v(" : 모든 Pod과 container와 관련된 동작들을 책임.")])])])])]),e._v(" "),t("li",[t("p",[e._v("CRI shims")]),e._v(" "),t("ul",[t("li",[e._v("ex) dockershims\n"),t("img",{attrs:{src:"/images/kubernetes/dockershim.png"}})]),e._v(" "),t("li",[e._v("ex) cri-containerd"),t("br"),e._v(" "),t("img",{attrs:{src:"/images/kubernetes/cri-containerd.png"}})])])]),e._v(" "),t("li",[t("p",[e._v("kube-proxy")]),e._v(" "),t("ul",[t("li",[e._v("Pods가 어플리케이션과 직접 커넥션 맺는것보다 logical constuct인 "),t("code",[e._v("Service")]),e._v(" 를 endpoint로 연결한다. 이 Service 그룹은 pod과 연결되어 로드발랜싱을 해준다.")]),e._v(" "),t("li",[e._v("kube-proxy 는 각각의 워커 노드의 실행해주고, 각 Service endpoint를 위한 API server로 들어오는 network proxy.")]),e._v(" "),t("li",[e._v("각각의 Service endpoint마다 kube-proxy가 설정되어 route된다.")])])])]),e._v(" "),t("h3",{attrs:{id:"etcd를-통한-상태-관리"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#etcd를-통한-상태-관리"}},[e._v("#")]),e._v(" etcd를 통한 상태 관리")]),e._v(" "),t("ul",[t("li",[e._v("etcd는 "),t("a",{attrs:{href:"https://web.stanford.edu/~ouster/cgi-bin/papers/raft-atc14",target:"_blank",rel:"noopener noreferrer"}},[e._v("Raft Consensus Algorithm"),t("OutboundLink")],1),e._v(" 을 기반으로한 key-value sotre이다.")]),e._v(" "),t("li",[e._v("항상 그룹 내 하나는 master이며 나머지는 follower이다.")]),e._v(" "),t("li",[e._v("Go language")]),e._v(" "),t("li",[e._v("Kubernaetes 에서는 cluster state 저장 뿐만 아니라 configuration detail도 저장한다. ex) subnets, ConfigMaps, Secrets")])]),e._v(" "),t("h2",{attrs:{id:"네트워크-setup"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#네트워크-setup"}},[e._v("#")]),e._v(" 네트워크 setup")]),e._v(" "),t("ul",[t("li",[e._v("각 Pod는 반드시 유니크한 IP를 할당해야한다\n"),t("ul",[t("li",[e._v("container networking을 위해 두가지 선택지가 있다.")]),e._v(" "),t("li",[t("strong",[e._v("Container Network Model(CNM)")]),e._v(" proposed by Docker")]),e._v(" "),t("li",[t("strong",[e._v("Container Network Interface(CNI)")]),e._v(" proposed by CoreOS << Kubernetes uses this")])])]),e._v(" "),t("li",[e._v("Pod 내 Container들끼리 커뮤니케이션 가능하다\n"),t("ul",[t("li",[e._v("Linux에서는 모든 엔티티끼리 "),t("strong",[e._v("network namespace")]),e._v("를 사용하는데, Pod 내 컨테이너들끼리 이 network namespace를 공유하여 서로 커뮤니케이션을 할 수 있다.")])])]),e._v(" "),t("li",[e._v("Pod 는 클러스터내 다른 Pod과 커뮤니케이션 가능하다\n"),t("ul",[t("li",[e._v("Routable Pods and nodes, using the underlying physical infrastructure, like Google Kubernetes Engine")]),e._v(" "),t("li",[e._v("Using Software Defined Networking, like Flannel, Weave, Calico, etc.")])])]),e._v(" "),t("li",[e._v("설정에 따라 pod 내 배포된 application는 외부와도 연결 가능하다.\n"),t("ul",[t("li",[e._v("kube-proxy 를 이용해서.")])])])])])}),[],!1,null,null,null);t.default=n.exports}}]);