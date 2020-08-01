---
date: 2020-08-01
tags:
  - etc
---

# 전국에 맥도날드 주소가 어떻게 될까?  

친구에게 연락이 왔다. (선생님, 대표님 호칭은 장난이다)
![](@assets/20200801/kakaotalk.jpg)

상황은 간단했다. 각종 프랜차이즈 혹은 은행들의 오프라인 매장 주소가 정리된 엑셀 파일이 필요하다는 것이었다.
직접 해도 되긴 하는데 혹시 이런 거 가능한 건지, 혹시 시간이 된다면 도와줄 수 있는지였다.


원래 내가 더 도움을 많이 받은 분이라 한큐에 승낙했다. (이게 지옥의 크롤링인 줄도 모르고.)


![](@assets/20200801/jumpofhell.jpg)

## 요구사항 

- 맥도날드, 스타벅스, 농협 은행 등의 매장 이름과 주소가 정리된 파일
- `지점`, `주소`

## 1차 시도 : 화면 크롤링 

[맥도날드 페이지에 가면 오프라인 매장을 검색](https://m.mcdonalds.co.kr/kor/store/list.do )할 수 있는 페이지가 있다. 


문제는 1) 크롤링하기 쉬운 구조의 리스트 혹은 페이지 형태가 아니며, 2) 검색을 하더라도 검색 결과가 좋지 못했다. 

![](@assets/20200801/resultofseoul.png)

위는 "서울"로 쿼리 한 결과고 페이지당 5개씩 총 10건밖에 나오지 않는다. 결국 더 자세히 쿼리(방배동, 강남역 등)를 해야 하는데 전국을 어떻게 쿼리 해야 할지도 모르고, 만약 내가 쿼리 하지 못한 곳에 매장이 있다면 이빨이 빠진 정보가 될 것이다. 


그리고 가장 큰 문제는 위처럼 각 사이트의 화면을 직접 크롤링하려면 각 화면 구성에 맞도록 크롤링 커스터마이즈를 해야 하므로 확장성이 좋지 못했다. (첫 시작이 맥도날드 였을 뿐.... 아직 많이 남았다.)

## 2차 시도 : 로컬/장소 API

우리에게는 자비로운 테크 기업들이 있다. 네이버와 카카오, 구글에서는 다양한 오픈 API들을 제공한다. 요즘 [걸그룹 API](https://www.notion.so/API-6c641706b97c4e19ad9e153ebc2038dc)도 있는데 당연히 장소 API도 있겠지?! 

- 카카오 : [https://developers.kakao.com/docs/latest/ko/local/dev-guide](https://developers.kakao.com/docs/latest/ko/local/dev-guide)
- 네이버 : [https://developers.naver.com/docs/search/local/](https://developers.naver.com/docs/search/local/)
- 구글 : [https://cloud.google.com/maps-platform/places](https://cloud.google.com/maps-platform/places)

우선, 카카오 API를 이용해서 간단하게 짜 보았다. 

```py
import requests
import sys

'''
$ python kakao_local_api.py {query}
'''

# curl -v -X GET "https://dapi.kakao.com/v2/local/search/keyword.json?category_group_code=BK9&page=2" \
# --data-urlencode "query=카카오" \
# -H "Authorization: KakaoAK kkkkk"


KAKAO_LOCAL_BASE_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json?'
 
def get_header():
    return {
        'Authorization': 'KakaoAK 2021b72320d4fc0703e42f05da63fd90'
    }

def main(query: str):
    assert query
    is_end  = False
    page = 1
    
    while is_end == False:
        query_url = f"{KAKAO_LOCAL_BASE_URL}&page={page}&query={query}" 
        print(query_url)
        res = requests.get(query_url, headers=get_header())
        
        meta = res.json().get("meta") 
        results = res.json().get("documents") 
        print("page ", page , " : ", len(results), "/", meta.get("total_count"))
        is_end = meta.get("is_end")
        page += 1
       
if __name__ == "__main__":
    argv = sys.argv
    q = argv[1]

    print(f'Query={q}')
    result = main(q)
    
```
[https://gist.github.com/jiyeonseo/bdd325425ed608e60782a453763bf7ad](https://gist.github.com/jiyeonseo/bdd325425ed608e60782a453763bf7ad)

잘 나온다! 친구에게 필요한 정보들을 물어보고 `address_name` 지번주소, `road_address` 도로명 주소 등을 받도록 하고 쫙 돌렸다. 
근데 3 번 돌다가 자꾸 멈춘다. 분명 total count는 큰데... 자꾸 `is_end=true` 라며 끝난다. 

### 장소 API의 쿼리당 Limit 

각각의 API들은 장소 정보를 모두 다 보여주지 않는다. (그럼 `total`은 왜 알려주시는 건가요..? 우린 알고 있지만 안 알랴줌..? )

쿼리당 limit은 아래와 같다.

- 카카오 : `pageable_count`	total_count 중 노출 가능 문서 수, **최대 45**
- 네이버 : `display` 1(기본값), **5(최대)**
- 구글 : each search can return as many as 60 results, split across three pages  페이지당 20개씩 * 3페이지 = **최대 60**

## 3차 시도 : 지도/맵 서비스 화면 크롤링 

아... 구글 API를 이용할 경우에 60개가 최대이다. 쿼리당 limit이기에 query를 지역단위로 잘 자르면 다 뽑는 게 더 가능하겠지만. 만약 "서울" 이런 식으로 크게 쿼리 하게 되면 60개로는 택도 없을 것 같다. 그렇다면 다시 화면 크롤링으로 돌아간다.

대신 지도 서비스 화면을 크롤링해본다. (`q=`만 바꾸면 확장하기 좋으니까)

- 카카오맵 ([https://map.kakao.com/](https://map.kakao.com/)) : 15 * 33pages + 5 (page 34)= 최대 500 
![](@assets/20200801/kakaomap.png)

- 네이버지도 ([https://map.naver.com/v5/](https://map.naver.com/v5/)) : 20 * 15pages  = 최대 300 
![](@assets/20200801/navermap.png)

- 구글맵 ([https://www.google.com/maps](https://www.google.com/maps))  : 쿼리에 따라 조금씩 다르게 나오지만 약 330정도가 최대인 것으로 보인다.


> 스타벅스 결과 

![](@assets/20200801/googlemap1.png) 

> GS25 결과

![](@assets/20200801/googlemap2.png) 

매장 수가 많은 편의점, 스타벅스로 검색해본 결과 카카오맵이 가장 많은 정보를 보여주고 있음을 확인했다. 
그래서 친구에게 타협을 봤다. 매장 수 500개 이하인 곳들은 자동화 할 수 있다. (일단, 검색 결과로 맥도날드는 439개 인 것 같다.)

![](@assets/20200801/mc_total.png) 

### Puppeteer 

화면을 핸들링할 수 있는 다양한 도구들이 오픈 되어 있다. 그 중 [puppeteer](https://github.com/puppeteer/puppeteer)를 이용했다. 

>  검색 > 맥도날드 > 장소 더보기 > 검색 리스트 > 페이지 1,2,3 ...

를 하려고 했는데 지도 검색 결과를 공유하는 기능이 있다! 

![](@assets/20200801/share_url.png)

짧은 url을 풀어보면 `https://map.kakao.com/?map_type=TYPE_MAP&q={검색어}&tab=place&page={페이지}&urlLevel=9` 이러한 모양으로 바로 넘어갈 수 있었다. 각각의 페이지에서 정보를 담고 있는 element 의 클래스들을 확인하고 다음과 같이 간단히 작성해 보았다. 

```js
const puppeteer = require("puppeteer");
var fs = require("fs");

(async () => {
  console.log("START");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let total = 0

  for (let idxx = 1; idxx < 34; idxx++) { 
    console.log("page", idxx)
    const target_url =
    "https://map.kakao.com/?map_type=TYPE_MAP&q="+
    "맥도날드" // 롯데마트 대형마트
    +"&tab=place&page=" +
    idxx +
    "&urlLevel=9";
    await page.goto(target_url);

    await page.waitForSelector('.addr') // 주소 있는 element class

    const stores = await page.evaluate(() => {
      return [...document.body.querySelectorAll(".link_name")].map( // 장소 이름
        (element) => element.innerText
      );
    });
    const values = await page.evaluate(() => {
      return [...document.body.querySelectorAll(".addr")].map( // 장소 주소
        (element) => element.innerText
      );
    });
    for (let i = 0; i < stores.length; i++) {
      let location = values[i];
      if (values[i].indexOf("\n") > -1) {
        location = values[i].slice(0, values[i].indexOf("\n")); // 지번주소와 신주소가 함께 있는 경우 \n\n과 같이 나오길래 뒤에는 날려버림.
      }
      fs.appendFile("mcdonald.csv", `${stores[i]},${location}\n`, function (err) { // csv 파일에 한줄씩 append
        if (err) throw err;
      });
      console.log(`${stores[i]},${location}`);
    }
    
    await page.screenshot({ path: "example.png" });
    await page.waitFor(2000)
    total += stores.length
    console.log("total : ", total)
  }

  await browser.close();
})();
```

### tips 
- '롯데마트' 와 같은 쿼리는 "CU 롯데마트점" 이런 곳까지 검색이 되니 "롯데마트 대형마트" 와 같이 좀 더 상세히 찾아봐야 한다.
- 카카오 맵, 네이버 지도 같은 경우에는 내가 좀 더 엉성하게 쿼리를 해도 찰떡같이 알아보니 "서울 스타벅스", "경기 스타벅스" 이런 식으로 쿼리를 하면 500건이 넘는 매장도 찾아볼 수 있을 것 같다.


## 정리 
### 장소 API limit
- 카카오 : [https://developers.kakao.com/docs/latest/ko/local/dev-guide](https://developers.kakao.com/docs/latest/ko/local/dev-guide) (**최대 45**)
- 네이버 : [https://developers.naver.com/docs/search/local/](https://developers.naver.com/docs/search/local/) (**최대 5**)
- 구글 : [https://cloud.google.com/maps-platform/places](https://cloud.google.com/maps-platform/places) (**최대 60**)

### 지도 화면 limit
- 카카오맵 ([https://map.kakao.com/](https://map.kakao.com/)) (**최대 500**)
- 네이버지도 ([https://map.naver.com/v5/](https://map.naver.com/v5/)) (**최대 300**)
- 구글맵 ([https://www.google.com/maps](https://www.google.com/maps))  (**약 최대 330**)




위에 작성한 코드는 현시점에 맞춰 작성된 것임으로 서비스 UI가 바뀌거나 class명이 바뀌면 제대로 동작하지 않을 수 있다. 또, API 정책 역시 더 보수적으로 변할 수도 있으니 그때그때 다시 확인하고 사용하자. 위의 작업들을 하며 오프라인 장소 데이터가 얼마나 구하기 어려운지, 그리고 이러한 데이터가 필요한 스타트업들이 얼마나 힘들지를 간접적으로 느낄 수 있었다. 내 친구 파이팅!

![](@assets/20200801/neverseemeagain.jpeg)




