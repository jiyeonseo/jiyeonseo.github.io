---
date: 2022-11-20
title: '분산 데이터베이스란'
tags: 
- distributed-database
---

[CockroachDB 블로그 글 "What is a distributed database and how do they work?"](https://www.cockroachlabs.com/blog/what-is-a-distributed-database/#what-is-a-distributed-database) 을 보며 요약한 내용입니다. 

--- 

## 분산 데이터베이스란
- 단일 시스템이 아닌 여러 시스템에 걸쳐 실행되고 저장되는 데이터베이스. 
- 일반적으로, 두개 이상의 서버에서 작동하며 각각을 "인스턴스" 혹은 "노드"라 한다.

## 용도

### 1) 복원력(**resilience**) 향상과 위험 줄이기

- 장애, 시스템 점검 등으로 인해 한 인스턴스가 오프라인으로 가더라도 **다른 인스턴스를 이용하여 서비스가 중단되지 않을 수 있다.**  
- 무중단이 중요한 비지니스에서 자주 사용됨

### 2) 확장 용이성
- 단일 인스턴스인 경우, 갑자기 스토리지나 컴퓨팅 파워 확장이 필요한 경우, 하드웨어 업그레이드 방법을 써야하는데 이때 비용이 매우 비싸다. 
- 분산 데이터베이스는 **인스턴스 혹은 노드 추가만으로도 확장이 가능.**
	- 분산 서버리스 데이터베이스에서는 완전 자동화까지도 가능 

### 3) 더 나은 성능
- 단일 머신의 경우, read/write가 몰릴 경우 병목 현상이 나타날 수 있지만, 분산 데이터베이스 같은 경우 **여러 인스턴스 간에 부하를 분산시킬 수 있음.**

### 4) 지리적 분산으로 레이턴시 단축 
- 물리적 위치 역시 분산하여 운영하는 경우, 데이터 요청와 가깝다면 더 빠르게 데이터를 사용할 수 있다. 

## NoSQL vs 분산 데이터베이스
- 관계형 데이터베이스(RDB) : 1970년대.  SQL 유행. ACID 트랜잭션 보장을 위한 관계형 데이터베이스.
- 하지만 인터넷의 폭팔적인 성장 -> 빠르게 확장이 필요했지만 확장의 불편함. 클라우드 환경에 적합하지 않았음 -> "샤딩" 으로 해결했지만 여전히 수동 작업과 같은 불편함이 남아있음 
- NoSQL : 클라우드 네이티브, 복원력, 확장성을 제공. 대신 기존 관계형의 엄격한 스키마 적용 및 ACID 보증을 희생. 덜 구조화된 형식으로 저장. 
	- 기존 관계형과 비교했을 때, 데이터 일관성과 정확성에 대한 타협이 필요.
- "분산 데이터베이스"는 기존 관계형 데이터베이스의 엄격한 스키마 및 ACID 보증과 함께 NoSQL과 같은 클라우드 네이티브 확장 및 복원력을 제공하는데 목표
- NoSQL은 주로 분석 및 빅데이터 부하가 많은 경우 사용
- 분산 데이터베이스는 **데이터 스키마 관리 및 관계형을 깰 수 없는 경우이며 가용성과 확장성이 많이 요구되는 경우** 사용 -> 분산 데이터베이스를 "분산 트랜잭션 데이터베이스"(distributed transactional database) 라고 부르기도 함.
    - 기존 RDB의 파티션닝과 달리 모든 인스턴스가 동일 데이터를 들고 있는 형태 

## DB 구성 
- 분산 데이터베이스의 주요 목표 중 하나는 "고가용성"
- 즉, 항상 모든 데이터를 사용할 수 있어야 한다. 여러 물리적 인스턴스에 모두 복제되어야한다. 
	- 복제본을 구성하는 방법 : `active-passive` , `active-active`, `multi-active`

### active - passive 구성
- 모든 트래픽을 "active" 먼저 저장 후, replica들로 복제 
- 간단한 동작 원리. 하지만 병목이 생길 수 있고, replica 복제 방법에 따라 문제가 발생할 수 있음.
	- 예) 노드 1 (active) - 노드 2 / 3 (passive replica) 상황에서 
	- 즉시 동기 방법 (replicated synchronously (immediately)): replica 하나에서 쓰기가 실패할 경우. 가용성(3개의 복제본이 모두 온라인 상태여야만 쓸 수 있음) OR 일관성(업데이트가 두개의 )
	- 비동기 복제 방법 (replicated asynchronously):  데이터 replica 복제를 보장할 수 없다.

### active-active 구성
- 복수의 active replica. 트래픽이 모든 replica에 라우팅됨. 
- 구성이 어렵고, 운영 중 중단이 발생의 경우 일관성 문제가 발생 할 수 있음. (모두 쓰기가 가능함으로)
	- 예) 노드 1 (active) - 노드 2 (active) 상황에서 
	- 노드 1 이  unique key  `A` 와 값을 받고 바로 장애로 인해 오프라인됨. 
	- 노드 2에서 key `A` 에 대해  `null`  반환 -> `A` 에 다른 값을 저장 
	- 나중에 노드 1이 돌아왔을때 unique key `A` 에 대해 서로 다른 값을 가지고 있음 

### multi-active 구성
- 가용성을 위해 CockroachDB 에서 사용되는 구성
- `active-active`와 비슷하게 모든 인스턴스에서 읽기 및 쓰기 가능 
- consensus replication system을 이용하여 데이터 불일치 가능성을 없앰. 
	- 모두가 "쓰기" 수신 완료를 확인 한 경우에만 write commit을 함. 

## 장단점
- 장점 
	- 고가용성 (High availability) : 머신 하나가 내려가더라도 운영 가능 
	- 확장성 (High scalability) : 인스턴스/노드 추가로 쉽게 스케일 아웃 가능 
	- Improved performance : 작업 병목을 분산시켜 성능 향상 
	- Reduced latency : 멀티 지역 배포 지원하는 경우  
- CockroachDB 사용하는 경우, Application에서 CDC 변경 피드를 받아볼 수도 있다.

- 단점 
	- 운영 복잡성 증가 : 단일 인스턴스 DB보다 복잡. managed DBaaS 사용도 고려 가능
	 - 높은 학습 곡선 : 기존 DB와 다른 방식으로 동작하기 때문에 학습이 필요. 
    - 아마도 비용 : 꼭 비싸거나 꼭 싸다고 하기는 어렵다. 
	    - 인스턴스가 여러개이기 때문에 비쌀수도 있지만 
	    - 하드웨어 스케일업이 필요한 경우, 비지니스 로직상 추천건의 트랜잭션을 손실없이 잘 처리해야하는 경우 오히려 저렴할 수 있다.
- [When is CockroachDB a good choice?](https://www.cockroachlabs.com/docs/stable/frequently-asked-questions.html#when-is-cockroachdb-a-good-choice)

## CockroachDB 동작 원리 
 
- 어플리케이션 관점에서는 단일 PostresQL과 매우 유사하게 동작.
- (매우 간단 버전) 데이터가 오게되면 
	- 내부 Distribution/Transaction layer 에서 "Ranges"(Data chunk)를 매핑 
	- Data range는 각 replica들에게 쓰여지게 된다. 
	- 예를 들어, 3개의 노드가 있다고 했을때.  
		- 하나의 노드가 leaseholder가 되어 읽기 쓰기를 조정하고 나머지들은 요청을 수신한다. -> 'active-passiave' 방식과 달리 모두 쓰기를 할 수 있음. 
		- write commit 전 모든 노드가 정확성에 동의 해야함 : Raft 알고리즘 ([Raft consensus](http://thesecretlivesofdata.com/raft/)) 이용 -> 일관성 깨지지 않음.  ('active-active'에서의 일관성 문제 일어나지 않음)

![](https://user-images.githubusercontent.com/2231510/202879199-fef2a04a-ad1c-4f57-8f74-f563d3d71d45.jpeg)

- 동작 방식 설명 비디오 : [https://www.youtube.com/watch?v=RgREEOnSKTg](https://www.youtube.com/watch?v=RgREEOnSKTg)

--- 

Cockroach DB를 리서치 해보니 다음과 같이 설명되고 있다.

> "_A cloud-native SQL database for building global, scalable cloud services that survive disasters_". Cockroach Labs is the company building CockroachDB, an open source, survivable, strongly consistent, scale-out SQL database.

어떠한 상황에서도 살아남고, 일관성을 유지하며, 스케일 아웃하는 데이터베이스. 
이름 잘 지었네!

## 같이 읽기 좋은 글
- [내가 CockroachDB를 더 이상 사용하지 않는 이유
](https://velog.io/@velopert/goodbye-cockroachdb)