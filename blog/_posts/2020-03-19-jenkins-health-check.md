---
date: 2020-03-19
tags:
  - etc
---

# Jenkins를 이용하여 상태 모니터링하기 

매번하지만 항상 까먹는 젠킨스 설정. 

간단하게 젠킨스를 이용해 서비스가 잘 돌아가고 있는지 체크하는 잡을 정리한다.

--- 

환경: Jenkins 

## 매개 변수

- 매개변수로 꺼내놓으면 다른 서비스, 웹사이트 등 하나의 item을 카피해서 변경해주기 쉽다. 
- `URL` : 확인할 URL 
- `ATTEMPT` : 시도 할 숫자
- `TIMEOUT` : 실패 시, 다시 시도할때까지 기다릴 시간(초)

![](@assets/20200319/env_var.png)

## 빌드 유발 

- Build periodically 
  - 매 5분마다. 

```
H/5 * * * * 
```

## Build Script 

위의 매개 변수를 적용한 코드

```sh
#!/bin/bash
url=${URL}
attempts=${ATTEMPT}
timeout=${TIMEOUT}
online=false

echo "Checking status of $url."

for (( i=1; i<=$attempts; i++ ))
do
  code=`curl -sL --connect-timeout 20 --max-time 30 -w "%{http_code}\\n" "$url" -o /dev/null`

  if [ "$code" = "200" ]; then
    online=true
    break
  else
    sleep $timeout
  fi
done

if $online; then
  echo "Monitor finished, website is online."
  exit 0 # Build Success
else
  echo "Monitor failed, website seems to be down."
  exit 1 # Build Failed
fi
```

## 빌드 후 조치 

- 슬랙, 이메일 등 상황에 맞는 알림 시스템과 연결한다. 

## reference 
- [Website status monitor using Jenkins](https://www.wouterbulten.nl/blog/tech/website-status-monitor-using-jenkins/)