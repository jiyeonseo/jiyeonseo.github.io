---
date: 2022-10-24
tags: 
- fastapi
- docker
---

# 가장 빠르게 FastAPI를 돌려보자 - uvicorn-gunicorn-fastapi-docker

FastAPI 관련 라이브러리나 예제 코드들을 살펴보다보면 실행 Dockerfile 파일이 아래와 같이 시작하는 파일들을 많이 만나볼 수 있다. 

```Dockerfile
FROM tiangolo/uvicorn-gunicorn-fastapi
```

FastAPI를 사용한다면 tiangolo 이름부터 아주 익숙할 것이다. 맞다. 바로 FastAPI를 만든 [Sebastián Ramírez](https://github.com/tiangolo)가 FastAPI용 base docker image다. Python 3.6 이상의 버전들을 모두 제공하고 있으며 `-slim` (ex. `python3.8-slim`) 과 같이 Alpine Linux 버전 역시 제공하고 있으니 뭘 좋아하든 골라 사용하기 좋다. 

- **GitHub repo**: [https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker](https://github.com/tiangolo/uvicorn-gunicorn-fastapi-docker)
- **Docker Hub image**: [https://hub.docker.com/r/tiangolo/uvicorn-gunicorn-fastapi/](https://hub.docker.com/r/tiangolo/uvicorn-gunicorn-fastapi/)


아마 FastAPI를 한번이라도 사용해 본 사람이라면 이미 `uvicorn main:app --reload` 시작이 아마 익숙할 것이다. 이 베이스 이미지에서는 여기서 하나 더 추가 되었다. 

- [Uvicorn](https://www.uvicorn.org/) : lightning-fast "ASGI" server. 비동기 파이썬 웹 서버. 단일 process.
- [Gunicorn](https://gunicorn.org/) : WSGI(Web Server Gateway Interface). 여기서는 여러 Uvicorn 워커 프로세스를 매니지하는 용도로 사용된다. 

Uvicorn + Gunicorn 로 서버 리소스(CPU 코어 갯수)에 적합한 워커 구성을 해주며 FastAPI가 바로 사용할 수 있는 Base Image가 바로 "uvicorn-gunicorn-fastapi-docker" 이다. 


## 쓰면 좋은 경우

- 프로세스 수 조정을 크게 신경 쓰지 않아도 되는 간단한 앱.
- 클러스터가 아닌 단일 서버에서 실행하는 경우.
- 단일 서버에 Docker Compose로 배포하여 컨테이너 내에서 Gunicorn + Uvicorn 조합으로 사용하는 경우. 
- 프로메테우스와 같은 모니터링 메트릭을 가져오는 경우, 하나의 컨테이너 + 여러 프로세스 조합으로 한번에 사용하는게 간단할 수 있음.  

## 안 써도 되는 경우 (Prod 배포의 경우)

위에서 언급한 바와 같이 편하게 사용하라고 만든 것임으로 꼭 써야하는 것은 아니다. 오히려, 해당 Repo REAME에서부터 **WARNING** 까지 붙혀가며, 꼭 써야하는 것은 아니니 유의 당부를 하고 있다. "그냥 직접 만들어 쓰는게 오히려 나을 수도 있다." 라고 말하고 있는데, 그 큰 이유중의 하나는 worker의 수 때문이다. 

`uvicorn-gunicorn-fastapi-docker` 는 [내부적으로 자동으로 process와 worker 수를 자동으로 조절해주고 있다.](https://github.com/tiangolo/uvicorn-gunicorn-docker/blob/master/docker-images/gunicorn_conf.py#L21-L30)  CPU 자원 상태를 체크하고 이에 알맞는 값을 계산해준다. 위에서 말한 "쓰면 좋은 경우"에서 반복되는 단일 서버나 단일 컨테이너로 띄울 때 좋은 이유가 여기에 있다. 떠 있는 환경에서 가장 적합한 갯수를 알아서 계산해 줄 테니 우리는 비지니스 로직에만 신경쓰면 된다. 

하지만 리얼 월드에서는 이 자동 튜닝 부분이 적합하지 않을 수도 있다. Docker를 사용하게 되면 단일로 띄우기 보다는 Kubernetes와 같은 컨테이너 오케스트레이션을 이용하여 클러스터에 여러개의 Pod으로 띄우는 경우가 대다수다. 즉, 클러스터 레벨에서 몇 개의 앱을 띄울 것인가가 관리된다. 이 때 각각의 컨테이너 내에서 Gunicorn + Uvicorn 으로 여러 워커 + 프로세스 매니저를 사용할 경우, 이 리소스 관리가 아주 복잡해 질 수 있다. 

따라서, 클러스터를 이용한 배포 및 운영을 하고 있다면 단일 Uvicorn process를 사용하는 것을 권장하고 있다. [더 자세한 내용은 공식 문서](https://fastapi.tiangolo.com/deployment/docker/#replication-number-of-processes)에서도 찾아 볼 수 있다. 

이 경우 아래와 같이 기본 python 이미지를 사용하고, `uvicorn` 만을 사용하여 서버를 띄우면 된다. 

```dockerfile
FROM python:3.9

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the main.py file to the /code directory directly (without any ./app directory).
COPY ./main.py /code/

# Run Uvicorn and tell it to import the app object from main (instead of importing from app.main).
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "80"]
```

## 사용 방법 

```dockerfile
FROM tiangolo/uvicorn-gunicorn:python3.9

COPY ./requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

COPY ./app /app
```

위 경우 `/app/app/main.py` 혹은 `/app/main.py` 에 있는 `app`을 실행하게 되니 파일 위치를 유의하자.
그 다음 docker build 그리고 run 해준다.

```bash
docker build -t myimage ./
docker run -d --name mycontainer -p 8080:80 myimage
```

제대로 잘 떳다면 [http://localhost:8080](http://localhost:8080) 에 접속될 것이다. 

만약 패키지 관리툴 Poetry를 사용한다면 아래와 같이 Poetry 설치 및 패키지 설치를 해주면 된다.

```Dockerfile
FROM tiangolo/uvicorn-gunicorn-fastapi:python3.8

WORKDIR /app

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
        ln -s /opt/poetry/bin/poetry && \
            poetry config virtualenvs.create false

COPY ./pyproject.toml ./poetry.lock* /app/

RUN bash -c "poetry install --no-root"

COPY ./app /app
```

### 다른 dependency들과 함께 Docker Compose로 실행하기 
```yaml
version: '3.8'
services:
    redis:
        image: redislabs/redismod
        ports:
          - "16379:6379"
        volumes:
          - $PWD/data:/data
        command: --dir /data --loadmodule /usr/lib/redis/modules/redistimeseries.so

    app:
        restart: always
        build: .
        ports:
            - "8080:80"
        volumes:
            - $PWD/app:/app
        depends_on:
            - redis
        command: /start-reload.sh
```

Default는 [start.sh](https://github.com/tiangolo/uvicorn-gunicorn-docker/blob/master/docker-images/start.sh)로 바로 run 되는 것으로 되어있으나, 개발 할때는  [`start-reload.sh`](https://github.com/tiangolo/uvicorn-gunicorn-docker/blob/master/docker-images/start-reload.sh)을 사용하여 코드 변경이 있을 때 마다 자동으로 리로드 될 수 있도록 하는 것이 편하다. 만약 위처럼 docker-compose가 아닌 그냥 `docker run` 사용시에는 아래와 같이 사용하면 된다. 

```sh
docker run -d -p 80:80 -v $(pwd):/app myimage /start-reload.sh
```

- (주의) reload에서는 Gunicorn으로 뜨지않기 때문에 만일 custom gunicorn 설정 파일을 사용한다면, reload에서는 반영되지 않는다. 

## 환경변수 

기본적인 것들을 많이 제공하면서도 커스텀하게 필요한 부분들도 환경변수로 적절히 넣어줄 수 있다. 코드 폴더 구성이 다르거나, 워커의 수만 변경하고 싶을때, 최대 워커 수를 고정 시키고 싶은 경우 등. 

- `APP_MODULE`
- `VARIABLE_NAME`
- `APP_MODULE`
- `GUNICORN_CONF`
- `WORKERS_PER_CORE`
- `MAX_WORKERS`
- `WEB_CONCURRENCY`
- `HOST`
- `PORT`
- `BIND`
- `LOG_LEVEL`
- `WORKER_CLASS`
- `TIMEOUT`
- `KEEP_ALIVE`
- `GRACEFUL_TIMEOUT`
- `ACCESS_LOG`
- `ERROR_LOG`
- `GUNICORN_CMD_ARGS`
- `PRE_START_PATH`

자세한 사용 방법은 [여기](https://github.com/tiangolo/uvicorn-gunicorn-docker#environment-variables)서 확인해 볼 수 있다. 

## Custom Gunicorn 설정 파일 

[기본으로 설정된 Gunicorn 파일이 있다.](https://github.com/tiangolo/uvicorn-gunicorn-docker/blob/master/docker-images/gunicorn_conf.py) 다음과 같은 path에 추가하면 override 되니 필요한 부분이 있으면 커스터마이즈도 가능하다. 

- `/app/gunicorn_conf.py`
- `/app/app/gunicorn_conf.py`
- `/gunicorn_conf.py`

## Custom  `/app/prestart.sh`

app 시작 전, 필요한 작업을 스크립트 처리할 수도 있다. 많이 사용 예로는 Alembic을 이용한 SQL migration 역시도 가능하다. 

예를 들어, 아래와 같은 스크립트를 `./app/prestart.sh` 에 만든다. (혹은 `PRE_START_PATH`로 위치를 변수로 넘겨 줄 수도 있다.)
```sh
#! /usr/bin/env bash

# Let the DB start
sleep 10;
# Run migrations
alembic upgrade head
```
(대략 DB 뜨는 시간)10초를 기다린 후, alembic 커맨드를 실행한다. 그 후 앱이 구동 된다. 


## References
- [https://github.com/tiangolo/uvicorn-gunicorn-docker](https://github.com/tiangolo/uvicorn-gunicorn-docker)
- [https://fastapi.tiangolo.com/deployment/docker/](https://fastapi.tiangolo.com/deployment/docker/)

