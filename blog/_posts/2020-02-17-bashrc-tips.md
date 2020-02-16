---
date: 2020-02-16
tags:
  - etc
---

# .bashrc tips

사실 나는 [Oh My Zsh](https://ohmyz.sh/)을 써서 주로 `~/.zshrc` 를 쓰지만, 더 일반적인 경우에도 쓸 수 있음으로 제목은 `~/.bashrc`로. 자기가 원하는 곳에 잘 넣어주기만 하면 된다.

## 터미널에서 지금 경로 VS Code로 바로 열기

설정 방법

```sh
# .bashrc or .zshrc
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```

사용 방법

```sh
$ code my-project-path
```

## python virtualenv 사용하는 프로젝트 들어갈 때 자동으로 activate 시키기

설정 방법

```sh
function cd() {
  if [[ -d ./venv ]] ; then
    deactivate
  fi

  builtin cd $1

  if [[ -d ./venv ]] ; then
    . ./venv/bin/activate
  fi
}
```

사용방법

```sh
$ cd my-project-path
```
