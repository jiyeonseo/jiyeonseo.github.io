---
date: 2022-10-15
tags: 
- github-action
---

# GitHub Action - Release-Drafter

![release-drafter](https://github.com/release-drafter/release-drafter/raw/master/design/logo.svg)

내가 지금 사용하고 있는 배포 방식은 Tag가 따지면 자동으로 Docker build 및 배포가 되는 깃헙 액션을 만들어 사용하고 있다. 이 때, Tag와 함께 Release도 함께 만들어 사용하고 있다.

![](https://docs.github.com/assets/cb-20284/images/help/releases/release-link.png)

깃헙 릴리즈를 사용하면, Repo에 들어왔을 때 가장 최근 배포된 릴리즈 버전 및 내용을 한번에 확인 할 수 있다. 또, compare 기능도 있어 웹 에서 바로 기존 릴리즈와 무엇이 바뀌었는지 확인이 편하다. 

다만!!! 여기서 릴리즈 노트를 작성하는 것이 매우 귀찮다. 변경 Changes를 내가 일일이 찾는 것도 귀찮고. 

릴리즈 노트를 자동으로 생성해주는 Release-Drafter를 사용해보자. 짧게 설명하자면, 

- 브랜치 혹은 title 규칙에 따라 PR내 자동 label 추가
- label 규칙에 따라 릴리즈 노트 draft로 작성 및 업데이트

바로 이렇게!

![](https://user-images.githubusercontent.com/2231510/195991614-807d4c3b-68d8-4910-ba59-b3d4f29e4ed1.png)


## [Release Drafter](https://github.com/release-drafter/release-drafter)

### 설정 방법

`.github/workflows/release-drafter.yml` 파일을 다음과 같이 설정한다. 

```yaml
name: Release Drafter

on:
  push:
    # 어느 브랜치에 push가 되었을 때 작동할지 설정
    branches:
      - main
  # autolabeler 를 실행시킬 pull_request 이벤트를 설정
  pull_request:
    types: [opened, reopened, synchronize]

permissions:
  contents: read

jobs:
  update_release_draft:
    permissions:
      # write permission is required to create a github release
      contents: write
      # write permission is required for autolabeler
      # otherwise, read permission is required at least
      pull-requests: write
    runs-on: ubuntu-latest
    steps:
      - uses: release-drafter/release-drafter@v5
        # (Optional) specify config name to use, relative to .github/. Default: release-drafter.yml
        # with:
        #   config-name: my-config.yml
        #   disable-autolabeler: true
        env:
          GITHUB_TOKEN: ${{ secrets.GH_TOKEN }}
```

위 파일에서 보면 `GITHUB_TOKEN` 설정이 필요하다. 이는 release draft를 생성하기 위한 깃헙 토큰으로, 리파지토리 > settings > security > secrets > actions 에 깃헙 토큰을 등록해주어야 한다. 

![](https://user-images.githubusercontent.com/2231510/195991274-f58b8df7-c438-4165-8042-93e1003c219f.png)

깃헙 토큰 만드는 방법은 [공식 문서](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)에서 참고 할 수 있다. expire와 scope는 아래와 같이 설정하면 된다.

- expire : no expiration
- scope : repo

다음은 실제 위 action이 run 할때 필요한 설정 파일을 만들어준다. 기본 path는 `.github/release-drafter.yml` 그대로 따르면 된다. 

```yaml
name-template: 'v$RESOLVED_VERSION 🌈' ## 릴리즈 제목 
tag-template: 'v$RESOLVED_VERSION' ## 태그 
categories:
  - title: '🚀 Features'
    labels:
      - 'feature'
      - 'enhancement'
  - title: '🐛 Bug Fixes'
    labels:
      - 'fix'
      - 'bugfix'
      - 'bug'
  - title: '🧰 Maintenance'
    label: 'chore'
change-template: '- $TITLE @$AUTHOR (#$NUMBER)'
change-title-escapes: '\<*_&' # You can add # and @ to disable mentions, and add ` to disable code blocks.
version-resolver:
  major:
    labels:
      - 'major'
  minor:
    labels:
      - 'minor'
  patch:
    labels:
      - 'patch'
  default: patch
template: | # 릴리즈 내용 
  ## Changes (v$RESOLVED_VERSION)

  $CHANGES
autolabeler: # PR에 자동으로 label 붙혀주는 규칙 
  - label: 'chore'
    files:
      - '*.md'
    branch:
      - '/docs{0,1}\/.+/'
    title:
      - '/chore/i'
  - label: 'bug'
    branch:
      - '/fix\/.+/'
    title:
      - '/fix/i'
      - '/hotfix/i'
      - '/bug/i'
  - label: 'feature'
    title:
      - '/feat/i'
    branch:
      - '/feature\/.+/'
      - '/feat\/.+/'
```

여기까지 하고 나면 설정은 끝. 이제 규칙에 따라 작업하면 릴리즈 노트가 자동으로 생성된다.

### 사용 방법 

![](https://user-images.githubusercontent.com/2231510/195990914-e1a3e370-0877-460f-8e15-cb5fed66be2b.png)

정해진 branch 명이나 PR 제목을 이용하게 되면 자동으로 label이 붙는다. (위 `.github/release-drafter.yml` 내 autolabeler 설정 참고)

PR이 `main` 브랜치로 머지되면 다음과 같이 릴리즈 노트가 생성된다.

![](https://user-images.githubusercontent.com/2231510/195991614-807d4c3b-68d8-4910-ba59-b3d4f29e4ed1.png)

릴리즈가 배포되고 나면 그 다음 release draft에서는 그 다음 버전으로 tag가 생성된다.

![](https://user-images.githubusercontent.com/2231510/195991819-82b6e3ba-fafe-42c5-bd68-321fffcaea5e.png)

만약, major 버전을 올리고 싶다면 다음과 같이 PR에 `major` tag를 붙여주면 된다.

![](https://user-images.githubusercontent.com/2231510/195991989-6ca783d6-4f7c-4525-a105-f082fc86f264.png)

![](https://user-images.githubusercontent.com/2231510/195992056-84122c1d-d387-489e-a12e-f0020153f56a.png)

이 역시도 `.github/release-drafter.yml` 내 설정된 값으로 조정이 된다. 

더 자세한 설정은 [Release Drafter](https://github.com/release-drafter/release-drafter)를 참고하면 된다.

## 예제 깃헙 
- [gh-action-ci-cd-sample](https://github.com/jiyeonseo/gh-action-ci-cd-sample)