---
date: 2019-06-07
tags: 
  - vim
---

# Vim 공부하기 - Week 1
 
## 나는 왜 vim 공부를 시작했는가
Vim을 아예 사용할 줄 몰랐던 건 아닙니다. 일을 하다보면 바로 서버 붙어서 작업 할 때도 종종 있고, finder로 파일 찾기 귀찮을 때, 텍스트로 이루어 진 파일을 볼 땐 vim이 제일 편하니까요. 

트위터에서 핫했던 [Vim 교정학원](https://www.youtube.com/watch?v=lNWuf48vgV4) 을 보는데 모르는 기능들이 많기도 했고 

[몰라서 못쓰는 게 아니라 알고 안 쓰고 싶어서](https://twitter.com/seojeee/status/1131770160337915904)... 그리고 다들 그렇게 좋아하는 데는 더 이유가 많을 것 같다는 생각이 들었습니다. 


## 어떻게 공부할 것인가

트위터에서 공유받은 [Vim 정복하기: 4주 계획](https://medium.com/@jungseobshin/vim-배우는-법-4주-계획-77f3f7e263f7)를 기초로 먼저 큰 방향을 잡았습니다. 

그리고 스스로 공부를 체크하기 위해 [git repo](https://github.com/jiyeonseo-study/vim-study/blob/master/vim-four-week-plan.md)도 하나 만들었습니다. 그날 그날 알게된 정보들도 같이 메모도 하며 공부했습니다.


### 첫째 주: vimtutor 하루에 한 번, 매일 끝까지 실습하기

`vimtutor ko` 로 처음 시작했다가 `vimtutor` (영문) 으로 바꾸어 연습했습니다. 영어 공부의 목적도 있긴 했지만 version이 1.5로 구버전이라 최신 버전에서 다루고 있는 몇몇 lesson들이 빠져 있었습니다. 

## 어떻게 공부 하였는가

[트위터에서 좋은 정보를 많이 공유 받을 수 있었습니다. ](https://twitter.com/seojeee/status/1131737579911405568) 세상은 넓고 마음씨 착한 고수는 많습니다. 아래는 도움이 많이 된 자료들 입니다. 

- [초심자는 vim을 어떻게 공부하는 것이 좋을까?](https://johngrib.github.io/wiki/two-views-of-vim/#초심자는-vim을-어떻게-공부하는-것이-좋을까)
- [Vim game code break](https://github.com/johngrib/vim-game-code-break)
- [(책) 손이 먼저 반응하는 Practical Vim](http://mobile.kyobobook.co.kr/showcase/book/KOR/9788966262083)
- [VIM adventures](https://vim-adventures.com/)
- [Keycastr](https://github.com/keycastr/keycastr) - an open-source keystroke visualizer. 연습할때 누른 키 값이 큼지막히 보여서 좋습니다.
- [Chrome Extension Vimium](http://vimium.github.io/) - 평상시 웹 브라우징 할때도 계속 vim 명령어를 공부 할 수 있습니다.

### Pull Request

위에서 말 한 것처럼 `vimtutor ko` 버전 1.5 그리고 원래 영문 버전은 1.7로 꽤나 오랬동안 관리가 되지 못한 것 같았습니다. [최신 버전으로 번역하여 PR](https://github.com/vim/vim/pull/4503 ) 까지 보냈는데 한국어 리뷰를 해줄 수 있는 메인테이너가 있을지 모르겠네요. 이 글을 보시고 계시다면 한 번 가서 리뷰 부탁드려요! :) 

공부 하던 중에 알게된 [hjkl 역사(Here is why vim uses hjkl keys as arrow keys)](https://catonmat.net/why-vim-uses-hjkl-as-arrow-keys) 역시 재밌게 공부하는데 큰 도움이 되었습니다. 무엇을 공부하던 스토리가 있어야 재밌는 것 같습니다. 

## 정리 
1. `vimtutor`로 처음부터 끝까지 (외우지말고)
  - 1.1. hjkl 익숙해지기 
  - 1.2. 동사(삭제(d), 복사(y), 붙여넣기(p) 등) 와 명사(단어(w), 마지막($) 등) 익숙해지기 
2. 크롬 익스텐션 Vimium 이용해서 마우스 사용 빈도 줄이기  
3. vim cheat sheet 프린트 해서 모니터 아래에 붙히기
4. vimtutor ko 풀리퀘 날리기 

## 다음주에는 어떻게 공부할 것인가

이번 주는 `vimtutor` 를 통해 기본적인 명령어들은 많이 익숙해 진 것 같습니다.  에디터의 변화일 뿐이지만 익숙한 환경에서 벗어나 새로운 도구를 배우고 모르고 있던 세계가 확장 된 것 같아 즐거운 한 주였습니다. 다음 주는 위에서 말한 것과 같이 [Vim 정복하기: 4주 계획](https://medium.com/@jungseobshin/vim-배우는-법-4주-계획-77f3f7e263f7) 를 이어나가려 합니다. "둘째 주: 최소한의 설정, 플러그인 없이 Vim 사용하기" 이겠네요. 혹시 `vimrc` 관련해서 좋은 리소스가 있다면 알려주세요!  
 
