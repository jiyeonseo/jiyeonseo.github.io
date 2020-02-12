---
date: 2016-11-15
tags: 
  - etc
---

# github 컨트리뷰션, 이슈, 풀리퀘스트 템플릿 만들기

깃헙의 이슈와 풀리퀘스트는 일종의 커뮤니케이션 도구로 자주 사용된다.

프로젝트가 커지게 되고, 커미터가 많아지게 되면 커뮤니케이션이 중구난방으로 이루어질 수 있는데,
이때 깃헙에서 제공하는 이슈, 풀리퀘스트 템플릿을 사용하면 좋다.

![](@assets/20161115/1.png)

정형화를 시켜 꼭 기입해야할 내용, 체크사항 등을 더 잘 챙길 수 있다.


### 1. root directory에 ```.github/``` 을 만들고 template들을 readme 파일로 추가해준다.

```

.github/
  - CONTRIBUTING.md
  - ISSUE_TEMPLATE.md
  - PULL_REQUEST_TEMPLATE.md

```

### 2. 파일에 마크다운 형식으로 형식을 채워 넣는다.

```

Fixes # issue_number

Changes proposed in this pull request:
-
-
-

@jiyeonseo

```

예제 : [.github](https://github.com/jiyeonseo/napucon-cheese-demo/tree/master/.github)


참고 : [Issue and Pull Request templates](https://github.com/blog/2111-issue-and-pull-request-templates)

***



```#지프넓얕``` , ```#지적프로그래밍을위한넓고얕은습관```
