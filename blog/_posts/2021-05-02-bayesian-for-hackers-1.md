---
date: 2021-05-02
tags:
  - bayesian
  - python
---

# 프로그래머를 위한 베이지안 1. 베이지안 추론의 철학   

팀에서 [Do it! 딥러닝 입문](https://github.com/rickiepark/do-it-dl)으로 ML 스터디를 끝낸 뒤, 한껏 부푼 자신감을 갖고 [Kaggle](https://www.kaggle.com/) 몇 문제를 풀어보았다. 당연히 제대로 진행이 되지 않았다. 다른 사람이 푼 풀이를 보며 겨우겨우 따라가는 정도로 내 지식은 너무 부족했다. 그저 사이킷런을 사용하고, 요즘 많이들 사용한다는 LightGBM,  XGBoost를 그야말로 사용하기만 하는 것만으로는 내가 풀었다고 하기에는 아쉬움이 많이 남았다. 실제로 주어진 데이터를 이해하고 그 안에서 관계를 찾아내고, 데이터 속에서 문제를 읽고 해결해 나가고 싶어졌다. 그러던 중 팀원 분의 추천으로 [프로그래머를 위한 베이지안 with 파이썬](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791160503371) 책으로 스터디를 시작하게 되었다. 

[이 책의 원서는 인터넷에 이미 오픈되어있는 자료](http://camdavidsonpilon.github.io/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers/)로 사실 책을 사지 않고도 공부 할 수 있고, [깃헙에서 한국어로도 번역이 되고 있어](https://github.com/zedoul/Bayesian-for-Hackers-Korean)서 꼭 번역서를 구입할 필요는 없다.(하지만, 한국어 번역은 완벽하게 되어 있지 않고 업데이트가 안된지 오래 되어 읽기가 쉽지 않다) 또, [길벗에서 두 챕터는 온라인에 공개](https://thebook.io/006775/)해 두었으니 읽어보고 책을 구매해도 좋을 것 같다. 

모두 공개된 자료인 만큼 다양한 스터디 자료들을 쉽게 찾아 볼 수 있다. 
- [ExcelsiorCJH/Bayesian-with-Python](https://github.com/ExcelsiorCJH/Bayesian-with-Python)

위의 저장소가 정말 잘 정리되어있어 많이 도움 받았다.

어렵게 공부 했는데, 이렇게 정리하지 않으면 까먹을 것 같아서 앞으로 한 주 한 주 공부한 내용에 대해 정리하여 블로그에 올려보려 한다. 

---

> "코드 테스트가 통과할 수록 버그가 없다고 믿는다"

(이건 그냥 재밌어서 추가 ㅋㅋ)
![](https://user-images.githubusercontent.com/2231510/116806068-9385d400-ab65-11eb-834d-2c4cec9475b5.png)
출처 :  [https://twitter.com/hippothewild/status/1385439300993445890?s=21](https://twitter.com/hippothewild/status/1385439300993445890?s=21)

- 새로운 증거를 본 뒤 믿음을 업데이트 하는 것.
- 100% 확신 X → 자신감

# 1.1 베이지안 심리 상태

- 불확실성을 유지 한다. 사건에서 믿을 수 있는 정도를 계량한 척도!
- 빈도주의 : 오랫동안 사건 발생하고 그 **빈도**로 해석. 계속 관찰 하기 어렵기 때문에 대체 현실을 만들고, 그 전반에 걸쳐 발생하는 사건의 빈도가 확률을 규정
- 베이지안 : 확률이란 **의견이나 견해**를 요약. 0이라면 그 사건을 일어나지 않을 거라고 전적으로 확신. 1이라면 반드시 일어난다고 확신.
- 믿음 = 개인의 주관. 다른 믿음이 존재 한다는 것은 틀렸다는게 아님!
- 믿음의 양 = P(A) . **사전확률**. 사건 A에 대한 우리의 믿음의 양
- 업데이트 된 믿음 = P(A|X) . **사후확률**. 증거 X가 주어진 상황에서의 A의 확률

```python
P(A) : 코드에 버그가 있을 것 같다.
P(A|X) : 코드가 X 테스트를 전부 통과했다. 아직 버그가 있을 수는 있지만 지금 당장 버그가 있지는 않을 것 같다.
```

- 새로운 증거를 포함해 사전 확률을 재계산 → 덜 틀리게 될 것이고 점점 더 정확하게 될 것.

### 실제 베이지안 추론

- 더 많은 증거를 얻을수록 → 사전 믿음은 점점 **희석된다**.
- 증거의 개수를 N이라 했을 때,
    - 빈도주의자 : N이 작을 수록 추론은 불안정
    - 베이지안 : 사전 확률 + 확률을 업데이트 할 뿐. 불확실성을 유지. N이 작은 경우 데이터셋에 대한 불안정한 통계적 추론을 반영.
- 증거가 충분히 많으면 같은거 아닌가?
    - 충분히 증거가 많을 수 없다. 왜냐면 더 많은 증거가 필요한 다음 문제가 또 있을 테니까.
- 그럼 빈도주의자는 틀렸다는거?
    - 최소자승선형회귀, 라소회귀, EM 알고리즘 등 같은 방법에서는 잘 통함
    - 다만 베이지안 방법으로 해결하지 못한 문제를 풀거나 더 유연한 모델링으로 보완.

## 1.2 베이지안 프레임워크

사후 확률을 구하는 수식 = 창시자 토머스 베이즈 이름을 딴 "베이즈 정리"(Bayes' Theorem)

![IMG_0054](https://user-images.githubusercontent.com/2231510/116806123-fc6d4c00-ab65-11eb-8671-c4f636182e3d.jpg)

### 동전 던지기, 농부? 사서?

- [https://colab.research.google.com/drive/1CNfdt5ni2obbWFRU7FbIchidI1OCONql?usp=sharing](https://colab.research.google.com/drive/1CNfdt5ni2obbWFRU7FbIchidI1OCONql?usp=sharing)

## 1.3 확률분포 Probability Distributions

- Z : 확률 변수(random variable)
    - Z가 이산적인 경우  : 이산확률변수. 화폐, 영화 등급, 투표수. 비교 하는 값일 때 명확해짐.
    - Z가 연속적인 형태인 경우 : 연속확률변수. 기온, 속도, 시간. 연속 변수로 모델링. 점점 더 정확하게 값을 매길 수 있음.
    - Z가 혼합된 형태인 경우: 혼합확률변수. 이산확률변수+연속확률변수

### 이산확률변수

- 이 경우 분포를 **확률질량함수**
- Z가 특정값 k를 취할 때의 확률. P(Z=k)
    - 질량 함수를 안다면 Z가 어떻게 움직이는지 안다.
- 푸아송분포. 가장 유용한 확률질량함수.

$$P(Z = k) =\frac{ \lambda^k e^{-\lambda} }{k!}, \; \; k=0,1,2, \dots$$

- $\lambda$ = 분포의 모수, 양수. 값을 늘리면 더 많은 확률. 푸아송분포에서 **밀도**
- $k$ = 음수가 아닌 정수 (0,1,2...) 예를 들어 사람이 4.24명 안댐.


![](https://user-images.githubusercontent.com/2231510/116806140-1d35a180-ab66-11eb-88e3-a198fdf37c9f.png)

### 연속적인 경우 : 확률밀도함수

- not 질량, 밀도 함수!
- 비슷하게 양수에 대해서 하지만 4.25같은 값도 포함하여 음수 아닌 모든 수!
- 즉, 한개, 두개 갯수 세는 데에는 안좋음. 시간, 온도 데이터와 같은 **정밀한 양의 변수**

![](https://user-images.githubusercontent.com/2231510/116806214-7b628480-ab66-11eb-91b2-c888d3fef363.png)

우리는 $\lambda$ 를 알 수 음슴. 현실에서는 오직 Z만 보임.

베이지안 추론 =  $\lambda$ 란 무엇인가에 대한 믿음! 정확하게 뭐다! 라고 추측하는 것이 아니라 $\lambda$  확률 분포를 부여하여 $\lambda$ 가 무엇일 것 같다. 라고 이야기만 가능. (...?)

## 1.4 베이지안 추론하기

### 문자 메세지 데이터에서 행동 추론하기

![](https://user-images.githubusercontent.com/2231510/116806434-e82a4e80-ab67-11eb-856d-64e7a2f49fe1.png)

- 개수 데이터 : 푸아송 확률변수 에 적합!
- 특정 일자 i의 메세지 갯수를 $C_i$  라 하자 :  $C_i \sim \text{Poisson}(\lambda)$
- 어느날 $\tau$ 에 갑자기 값이 높게 튀는 변화 : **변환점**

![](https://render.githubusercontent.com/render/math?math=%5Clambda%20%3D%20%0A%5Cbegin%7Bcases%7D%0A%5Clambda_1%20%20%26amp%3B%20%5Ctext%7Bif%20%7D%20t%20%5Clt%20%5Ctau%20%5Ccr%0A%5Clambda_2%20%26amp%3B%20%5Ctext%7Bif%20%7D%20t%20%5Cge%20%5Ctau%0A%5Cend%7Bcases%7D&mode=display)

- 변화점 이전 과 이후로 나눠진다.
- 만약, 큰 변화가 일어나지 않는다면, $\lambda_1 = \lambda_2$

### 그럼 지수 분포는?

- 그 자체의 모수를 가지고 있음. 모델에 그 모수를 포함 시켜야함.

![https://render.githubusercontent.com/render/math?math=%5Cbegin%7Balign%7D%0A%26amp%3B%5Clambda_1%20%5Csim%20%5Ctext%7BExp%7D%28%20%5Calpha%20%29%20%5C%5C%5C%0A%26amp%3B%5Clambda_2%20%5Csim%20%5Ctext%7BExp%7D%28%20%5Calpha%20%29%0A%5Cend%7Balign%7D&mode=display](https://render.githubusercontent.com/render/math?math=%5Cbegin%7Balign%7D%0A%26amp%3B%5Clambda_1%20%5Csim%20%5Ctext%7BExp%7D%28%20%5Calpha%20%29%20%5C%5C%5C%0A%26amp%3B%5Clambda_2%20%5Csim%20%5Ctext%7BExp%7D%28%20%5Calpha%20%29%0A%5Cend%7Balign%7D&mode=display)

- $\alpha$는 **초모수** 또는 **부모변수**라 함.
- 다른 모수에 영향을 주는 모수. 초키 추측 모델에 크게 영향을 미치지 않아 유연하게 선택가능.
- $\alpha$ 를 개수 데이터 평균의 역수가 되도록 설정하는게 좋음. ⇒ 사전 확률을 너무 고집하지 않고 초모수의 영향력을 최소화 할 수 있다고 함.

### PyMC

- 베이지안 분석 프로그래밍을 위한 파이썬 라이브러리
- 확률적 프로그래밍(probabilistic programming) : 확률 모형이 프로그래밍 변수를 모델의 구성 요소로 사용하고 있다.
![](https://user-images.githubusercontent.com/2231510/116806464-2162be80-ab68-11eb-9100-7417af42dd96.png)

### 위의 결과를 해석해보자!

- 베이지안 방법론은 **분포**를 반환
- $\lambda$  와 $\tau$ 를 표현할 분포를 가지게 되었다! 하지만 여전히 불확실함. 왜? 분포가 넓자나. 사후 믿음 여전히 확실 노노해.
- $\lambda1$ 은 대충 18 $\lambda2$은 대충 23 . 명확하게 구분이 된다! ⇒ 문자 습관에 정말로 변화가 있었을 가능성이 크다!
- $\tau$  를 보았을 때는 45일 부근에 사용자의 행동이 바뀔 확률이 50%
    - 만약 아무런 변화가 없거나 점진적으로 변경됬다면 $\tau$  분포가 넓게 펼쳐져 있었을 것이고, $\tau$  의 후보가 많아졌을 것. 위를 보면 3~4일 정도 잠재적 변환점이 있음을 알수 있다.

이어서 다음 질문

"날짜 $\tau$  (0 ≤ $\tau$  ≤ 70)에서 문자 메세지 개수의 기대값은 얼마인가?" 

![](https://user-images.githubusercontent.com/2231510/116806481-393a4280-ab68-11eb-8a96-fa47a2552fbb.png)

- 변환점 (45일 부근)의 영향력을 볼 수 있다.
- 무엇인가 발생 해서 사용자의 행동이 갑작스럽게 변환되었음. → 이를 바탕으로 문자 메세지 비용, 날씨 정보 문자 알림 신청, 등 새로운 관계 등을 추측해볼수 있음.

## 결론

- 빈도주의자와 베이지안 간의 확률 해석의 차이점
- 확률 분포 두가지 : 푸아송 분포 / 지수 분포


--- 
# 관련 자료 

- 영어 원본 좌표 : [CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers]([https://github.com/CamDavidsonPilon/Probabilistic-Programming-and-Bayesian-Methods-for-Hackers]/blob/master/Chapter1_Introduction/Ch1_Introduction_PyMC2.ipynb)
- 한국어 번역 좌표 : [zedoul/Bayesian-for-Hackers-Korean](https://github.com/zedoul/Bayesian-for-Hackers-Korean/blob/Korean/Chapter1_Introduction/Chapter1.ipynb)
- 책 실습 좌표 : [gilbutITbook/006775](https://github.com/gilbutITbook/006775/blob/master/Ch01/1%EC%9E%A5%20%EC%BD%94%EB%93%9C_%EC%97%AD%EC%9E%90-Copy1.ipynb)
