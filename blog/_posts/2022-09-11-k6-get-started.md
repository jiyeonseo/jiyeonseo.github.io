---
date: 2022-09-11
tags: 
- k6
- test
---

# k6 부하 테스트 툴

![](https://raw.githubusercontent.com/grafana/k6/master/assets/k6-logo-with-grafana.svg)

[k6](https://k6.io/)는 Grafana Lab에서 만든 load testing 툴로 API endpoint에 대한 성능 테스트를 쉽게 할수 있도록 도와준다. 특히, 기존에 Grafana를 쓰고 있었다면 연결하여 시각화도 잘 보여주니 유용하게 사용 할 수 있을 것이다. 성능 테스트가 아니더라도 CI에서 지속적으로 API가 예상대로 잘 동작하고 있는지 테스트하는 용도로 사용 가능하다. 문서가 워낙 잘 되어있고, 자바스크립트에 대한 이해도가 어느정도 있다면 쉽게 시작할 수 있다. 

문서에서는 다음과 같은 상황에서 사용할 수 있다고 설명하고 있다.

- Load testing : [spike](https://k6.io/docs/test-types/stress-testing/#spike-testing), [stress](https://k6.io/docs/test-types/stress-testing/), [soak](https://k6.io/docs/test-types/soak-testing/) 테스트 등 다양한 load test를 최소한의 리소스로 

- Performance and synthetic monitoring: 지속적으로 prod 환경 성능 및 유효성 확인 

- Chaos and reliability testing : k6에서는 다양한 설계에 대해 extension들을 제공하고 있다. ([k6 extensions](https://k6.io/docs/extensions/getting-started/explore/))

간단한 HTTP API뿐만 아니라 websocket, web crawling 등 다양한 케이스에서도 사용하고 있으며, 기존에 [postman](https://k6.io/blog/load-testing-with-postman-collections/)이나 [swagger](https://k6.io/blog/load-testing-your-api-with-swagger-openapi-and-k6/)를 이용하고 있었다면 이를 k6용 script로 변환해주는 툴도 제공하고 있다. 

직접 설치하여 사용하는 ["k6 Open Source"](https://k6.io/open-source) 와 클라우드 SaaS로 제공하는 ["k6 Cloud"](https://k6.io/cloud/)가 있다. 이 글에서는 "k6 Open Source" 로컬 사용을 기준이다. 

## 설치

Mac을 기준 `brew`로 바로 설치 가능하며, [이외의 다른 OS에서도 쉽게 설치](https://k6.io/docs/getting-started/installation/)할 수 있는 방법을 제공하고 있다. 

```sh
brew install k6
```

## 테스트 코드

```javascript
// ./demo.js

import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

(k6는 맘껏 테스트 해볼수 있는 API [test.k6.io](https://test.k6.io/)를 제공하고 있다.) 

```sh
$ k6 run demo.js

# 만약 docker를 이용한다면 
$ docker run --rm -i grafana/k6 run - <script.js 
```

## 테스트 결과값

```sh
 execution: local
     script: demo.js
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

running (00m02.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m02.3s/10m0s  1/1 iters, 1 per VU

     data_received..................: 17 kB 7.3 kB/s
     data_sent......................: 438 B 188 B/s
     http_req_blocked...............: avg=996.96ms min=996.96ms med=996.96ms max=996.96ms p(90)=996.96ms p(95)=996.96ms
     http_req_connecting............: avg=559.5ms  min=559.5ms  med=559.5ms  max=559.5ms  p(90)=559.5ms  p(95)=559.5ms 
     http_req_duration..............: avg=328.97ms min=328.97ms med=328.97ms max=328.97ms p(90)=328.97ms p(95)=328.97ms
       { expected_response:true }...: avg=328.97ms min=328.97ms med=328.97ms max=328.97ms p(90)=328.97ms p(95)=328.97ms
     http_req_failed................: 0.00% ✓ 0        ✗ 1  
     http_req_receiving.............: avg=26.06ms  min=26.06ms  med=26.06ms  max=26.06ms  p(90)=26.06ms  p(95)=26.06ms 
     http_req_sending...............: avg=105µs    min=105µs    med=105µs    max=105µs    p(90)=105µs    p(95)=105µs   
     http_req_tls_handshaking.......: avg=315.93ms min=315.93ms med=315.93ms max=315.93ms p(90)=315.93ms p(95)=315.93ms
     http_req_waiting...............: avg=302.8ms  min=302.8ms  med=302.8ms  max=302.8ms  p(90)=302.8ms  p(95)=302.8ms 
     http_reqs......................: 1     0.428702/s
     iteration_duration.............: avg=2.32s    min=2.32s    med=2.32s    max=2.32s    p(90)=2.32s    p(95)=2.32s   
     iterations.....................: 1     0.428702/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1
```

- 테스트 세부 내용 : 테스트 내용 및 부하 옵션 ([options](#테스트-Options) 을 이용해 부하 상세 설정을 해줄 수 있다)
    ```sh
    execution: local
        script: demo.js
        output: -

    scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
            * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

    running (00m02.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
    ```
- 진행 바(Progress bar) : 테스트 상태 및 각 작업 걸린 시간 
    ```sh
    default ✓ [======================================] 1 VUs  00m02.3s/10m0s  1/1 iters, 1 per VU
    ```   
- 테스트 결과 내용 : 테스트 완료 후 결과 

- [result output 공식 문서](https://k6.io/docs/getting-started/results-output/) 
- 결과값을 datadog, grafana 등을 통해 시각화 할 수 있다. [result visualiazation 공식 문서](https://k6.io/docs/results-visualization/)


## `options` : 테스트 부하 설정

- vu(virtual user) : 병렬로 `while(true)`를 얼마나 돌릴것인지 
- duration : 이 테스트를 얼마나 돌릴 것인지 
- [thresholds](#thresholds): 테스트 성공/실패 기준 메트릭
	- ex. 95% of requests have a response time below 200ms.
 
- [k6 options 공식 문서](https://k6.io/docs/using-k6/k6-options/reference/)


예를 들어, "10 VUs로 30초동안 돌린다!" 를 하기 위해서는 "CLI", "코드로 설정" 두가지 방법이 있다.

```sh
  scenarios: (100.00%) 1 scenario, 10 max VUs, 1m0s max duration (incl. graceful stop):
           * default: 10 looping VUs for 30s (gracefulStop: 30s)
```

### CLI

```sh
k6 run --vus 10 --duration 30s demo.js
```

### 코드로 `options` 설정하기 

```javascript
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  http.get('http://test.k6.io');
  sleep(1);
}

```

- options가 적용되는 순서는 다음과 같다. CLI flag가 가장 마지막에 덮어씌워지니 여러 곳에 option을 설정한 경우 유의 해야 한다.

![](https://k6.io/docs/static/cd2ffc633dd58c67e276922851216ab9/0e253/order-of-precedence.png)

(ref: [https://k6.io/docs/using-k6/k6-options/how-to#order-of-precedence](https://k6.io/docs/using-k6/k6-options/how-to#order-of-precedence))

### `thresholds` 

결과 메트릭들의 성공/실패 척도 정의. 부하 테스트의 목표치 혹은 SLO(service level objective)를 정의하는데 자주 사용된다. 

```javascript
import http from 'k6/http';

export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http error가 1% 이하여야 한다.
    http_req_duration: ['p(95)<200'], // 95%의 요청이 200ms 아래여야 한다.
  },
};

```

```sh
   ✓ http_req_duration..............: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
       { expected_response:true }...: avg=151.06ms min=151.06ms med=151.06ms max=151.06ms p(90)=151.06ms p(95)=151.06ms
   ✓ http_req_failed................: 0.00%  ✓ 0 ✗ 1
```

```javascript
// `p90` `p95` `p99` 각각에 대해서도 정의할 수 있다. 
export const options = {
  thresholds: {
    // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
  },
};
```

- [threshold 공식 문서](https://k6.io/docs/using-k6/thresholds)

## Lifecycle

```javascript
// 1. init code (required)
// 파일 로딩, import 모듈, function 정의 등 
// called : Once per VU*

export function setup() {
  // 2. setup code (optional)
  // 테스트 환경 세팅 혹은 테스트를 위한 data 생성 등 
  // called : Once
}

export default function (data) {
  // 3. VU code (required)
  // `options` 에 설정된 만큼 구행되는 구간 
  // called : 각 iteration 마다 
}

export function teardown(data) {
  // 4. teardown code (optional)
  // 데이터 후처리 및 테스트 환경 정리 
  // called : Once per script
}

```

- [Redis 연동 테스트 with setup/teardown 예제](https://github.com/grafana/k6/blob/master/samples/experimental/redis.js)
- [Test life cycle 공식 문서](https://k6.io/docs/using-k6/test-life-cycle/)

## `check()` : 테스트 통과 조건

`200 OK` 상황 이외에도 체크되어야 하는 경우들이 있을 것이다. 이 경우 `check` 내부에서 시나리오를 알맞게 변경해볼 수 있다. 

### response code, body

```javascript
import { check } from 'k6';

export default function () {
  const res = http.get('http://does.not.make.sense/');
  check(res, {
    'is status 400': (r) => r.status === 400,
    'verify homepage text': (r) =>
      r.body.includes('Check your request.'),

  });
}
```

- [check 공식 문서](https://k6.io/docs/using-k6/checks/)

### Redirect 체크 테스트 

```javascript
export let options = {
    // Max redirects to follow (default is 10)
    maxRedirects: 5
};

export default function() {
    // 만약 options.maxRedirects 설정 값보다 리다이렉션이 더 일어나면, 마지막 응답값이 반환된다. 
    let res = http.get("https://httpbin.org/redirect/6");
    check(res, {
        "is status 302": (r) => r.status === 302
    });

    // 요청 별로도 리다이렉션 수를 정할 수도 있다.
    res = http.get("https://httpbin.org/redirect/1", {redirects: 1});
    check(res, {
        "is status 200": (r) => r.status === 200,
        "url is correct": (r) => r.url === "https://httpbin.org/get"
    });
}
```

- [https://github.com/grafana/k6/blob/master/samples/redirects.js](https://github.com/grafana/k6/blob/master/samples/redirects.js)


## `batch()` : 여러 요청 한꺼번에 처리하기 

병렬로 여러 요청을 테스트하고 싶을 때, `array` 혹은 `object` 로 넘겨 한번에 테스트 할수 있다. 

```javascript
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
  ]);
  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });
}

```

- [batch 공식 문서](https://k6.io/docs/javascript-api/k6-http/batch/)

## `group()` : 테스트 그룹핑

많은 테스트 케이스들을 한번에 돌려야 할때, 단계적으로 테스트 결과를 그룹화하여 볼 수 있어 테스트 시나리오를 이해하는데 유용하다. 

```javascript
import http from 'k6/http';
import { group, check } from 'k6';

export default function () {

    group('main', function () {
        const res1 = http.get('http://test.k6.io');
        check(res1, {
            '1. status is 200': (r) => r.status === 200,
        });

        group('sub', function () {
            const res2 = http.get('http://test.k6.io');
            check(res2, {
                '2. status is 200': (r) => r.status === 200,
            });
        });

    });
}
```

```sh
█ main

	✓ 1. status is 200

	█ sub

		✓ 2. status is 200
```

- [group 공식 문서](https://k6.io/docs/using-k6/tags-and-groups/#groups)


## k6chaijs 이용하여 BDD 적용하기 

테스트를 BDD 패턴으로 나타낼 수도 있다. ([Describe-context-it 패턴](https://johngrib.github.io/wiki/junit5-nested/#describe---context---it-%ED%8C%A8%ED%84%B4)에서 자세히 잘 설명이 되어있다.)


```javascript
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.1/index.js';
import http from 'k6/http';

export default function testSuite() {
  describe('Basic API test', () => {
    const response = http.get('https://test-api.k6.io/public/crocodiles');
    expect(response.status, 'API status code').to.equal(200);
  });
}
```

```sh
█ Basic API test
  ✓ expected API status code to equal 200
```

- 위에서 살펴본 `group()` 과 거의 동일하다. 공식문서 역시 " It's a more powerful alternative to the k6-native check() and group()." 설명하고 있다. 기존 `Chai` 나 `Jest`, `Jasmine` 을 써왔던 사람에게는 사용법이 좀 더 친숙할 것이다. 

- integration test에서 조건에 따른, 테스트 케이스를 체크할 경우에 알맞다. 
  - 예) 응답이 `200 OK` 인 경우에만! JSON body 체크를 한다. 

- Chain of assertions : `check()`와 다르게, `expect()`는 실패하게 되면 `describe()`안에 있는 모든 케이스에 대해서 멈추게 된다. 즉, 앞에 실패하게 되면 뒷 부분 테스트가 필요없는 테스트 시나리오의 경우에 사용하기에 좋다. 

- [k6chaijs 공식 문서](https://k6.io/docs/javascript-api/jslib/k6chaijs/)

## 참고하기 좋은 문서들 

k6는 정말 참고 할 만한 문서가 많다. 처음부터 모두 이해하지 않더라도, 필요 시나리오에 따라 일단 찾아가며 복붙 하다 보면 자연스럽게 익힐 수 있을 것 같다. 

- k6 examples : [https://k6.io/docs/examples](https://k6.io/docs/examples) 
- awesome k6 : [https://github.com/grafana/awesome-k6](https://github.com/grafana/awesome-k6)
- k6 learn : [https://github.com/grafana/k6-learn](https://github.com/grafana/k6-learn)