---
date: 2016-07-27
tags: 
  - python
---

# python 개발 환경을 위한 pyenv 설치하기 

## pyenv?

- Simple Python version management
- 프로젝트 별로 각각 맞는 다양한 python 버전으로 실행해 볼 수 있도록 환경 제공.
- 이 프로젝트에서는 python 2, 저 프로젝트에서는 python 3 일때!
- github : [https://github.com/yyuu/pyenv](https://github.com/yyuu/pyenv)

### 환경
- OSX El Capitan (10.11)
- Homebrew 0.9.9

### 설치 ( OSX 기준으로 작성 )

```
$ brew install pyenv
```

### pyenv 업그레이드
```
$ brew upgrade pyenv
```

### path 설정
- [https://github.com/yyuu/pyenv#basic-github-checkout](https://github.com/yyuu/pyenv#basic-github-checkout)

```
$ echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bash_profile
$ echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bash_profile
$ echo 'eval "$(pyenv init -)"' >> ~/.bash_profile
$ source ~/.bash_profile
```

- 각자 환경에 맞게 .bash_profile 대신 .bashrc 혹은 .zshrc 로 적용한다.

### 설치할 수 있는 목록 확인
```
$ pyenv install --list
Available versions:
  2.1.3
  2.2.3
  2.3.7
  2.4
  2.4.1
  2.4.2
  2.4.3
  2.4.4
  2.4.5
  2.4.6
...
```

### 원하는 python 버전 설치

```
$ pyenv install 3.6.0
python-build: use openssl from homebrew
python-build: use readline from homebrew
Downloading Python-3.6.0.tar.xz...
-> https://www.python.org/ftp/python/3.6.0/Python-3.6.0.tar.xz
Installing Python-3.6.0...
```

- 에러가 났다.. 힝

### zipimport.ZipImportError: can't decompress data; zlib not available

- Mac OS 
  1. xcode command line tools 설치 (참고 : https://github.com/yyuu/pyenv/issues/454)
      ```
      $ xcode-select --install
      ```
  2. zlib 설치
      ```
      $ brew install homebrew/dupes/zlib
      ```

- Cent OS
  1. zlib-devel
  ```sh
  $ yum -y install zlib-devel
  ```
  https://slowcode.tistory.com/84

### ModuleNotFoundError: No module named '_ctypes'

- CentOS 
  ```sh
  $ yum install libffi-devel
  ```

### ERROR: The Python ssl extension was not compiled. Missing the OpenSSL lib?

  1. 만약 homebrew openssl과 pyenv를 함께 쓴다면, 아래와 같이 openssl package 위치를 알려주어야 한다. (환경에 따라 설정 방법이 다를 수 있으므로 아래의 방법이 안될 경우 [링크](https://github.com/pyenv/pyenv/wiki/Common-build-problems#error-the-python-ssl-extension-was-not-compiled-missing-the-openssl-lib)를 참고해 주세요. )
      ```
      $ CFLAGS="-I$(brew --prefix openssl)/include" \
      LDFLAGS="-L$(brew --prefix openssl)/lib" \
      pyenv install -v 3.6.0
      ```

  - Mac OS가 아닌 다른 Linux 계열의 경우, 
  

    ```sh
    $ CFLAGS=-I/usr/include/openssl 
    $ LDFLAGS=-L/usr/lib64 
    $ pyenv install -v 3.6.0
    ```

설치 성공하면 다음과 같이 나온다.

```
Installed Python-3.6.0 to /Users/jiyeonseo/.pyenv/versions/3.6.0
```

### 설치된 pyenv 확인
```
$ pyenv versions
* system (set by /root/.pyenv/version)
  2.7.11
  3.6.0
```

## 둘러보기

```
$ pyenv help
Usage: pyenv <command> [<args>]

Some useful pyenv commands are:
   commands    List all available pyenv commands
   local       Set or show the local application-specific Python version
   global      Set or show the global Python version
   shell       Set or show the shell-specific Python version
   install     Install a Python version using python-build
   uninstall   Uninstall a specific Python version
   rehash      Rehash pyenv shims (run this after installing executables)
   version     Show the current Python version and its origin
   versions    List all Python versions available to pyenv
   which       Display the full path to an executable
   whence      List all Python versions that contain the given executable

See `pyenv help <command>' for information on a specific command.
For full documentation, see: https://github.com/yyuu/pyenv#readme
```

### 바로 써보자

```
$ python -V
Python 2.7.11 ## 원래 버전
$ pyenv shell 3.6.0 ## 바꿔보자
$ python3.6 --version
Python 3.6.2+ ## 바뀐 버전
```

더 다양한 commend이 이 [링크](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md#pyenv-commands) 에서 확인 가능하다. 

# virtualenv
- 이번엔 python 프로젝트마다 각각의 가상환경을 만들어 줄 수 있는 virtualenv를 설치해 보겠다.

### 설치하기
```
$ brew install pyenv-virtualenv
$ echo 'eval "$(pyenv virtualenv-init -)"' >> ~/.bash_profile
```

### 가상환경 만들기, 시작하기(activate), 끝내기(deactivate)
```
$ pyenv virtualenv 2.7.11 {환경명} ## 만들기
$ pyenv activate ## 시작하기
...
(test_env) $ python -V
Python 2.7.11
(test_env) $ pyenv deactivate ## 끝내기
pyenv-virtualenv: deactivate {환경명}
```

### 가상환경 목록보기
```
$ pyenv virtualenvs
```

### 가상환경 삭제하기
```
$ pyenv uninstall {환경명}
```

# autoenv
- Python 프로젝트 진입시점시에 자동으로 virtualenv 환경을 로딩.

### autoenv 설치
```
$ brew install autoenv
To finish the installation, source activate.sh in your shell:
  source /usr/local/opt/autoenv/activate.sh
...
...

$ echo 'source /usr/local/opt/autoenv/activate.sh' >> ~/.bash_profile ## 위에 나온 shell
```

### 프로젝트에 맞게 env 설정
```
$ vi .env
pyenv activate {환경명}
```

- 설정 후 프로젝트로 들어오면

```
autoenv:
autoenv: WARNING:
autoenv: This is the first time you are about to source {local path}/.env:
autoenv:
autoenv:     --- (begin contents) ---------------------------------------
autoenv:     pyenv activate {환경명}
autoenv:     --- (end contents) -----------------------------------------
autoenv:
autoenv: Are you sure you want to allow this? (y/N) y
```

위와 같이 바로 적용된다.
