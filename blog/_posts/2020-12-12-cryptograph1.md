---
date: 2020-12-12
tags:
  - cryptograph
  - opentutorial 
---

# 생활코딩 암호학 1 정리

암호 관련해서 따로 공부해 본 적은 없었다. 민감한 정보를 저장할 때는 SHA로 hash 데이터로 저장해야 한다. 암호화와 복호화가 있고 대표적인 몇몇 알고리즘이 있다.라는 것 정도로 아주 얕게 알고 사용하고 있었다.
그러던 중 평소에도 항상 눈여겨보고 있는 생활코딩에서 암호학 1 기초 편이 올라와 이번 기회에 제대로 알고 가고자 공부한 내용을 정리해 두려 한다. 

암호학 1은 아무래도 입문에 초점이 맞추어져 있어서 짧고 가볍게 다뤄 주시지만 정말 중요한 포인트들에 대해서 정확하게 알려주고 계신다. 만약 암호화, 복호화에 대해서 제대로 설명할 수 없다면 꼭 시청해 보길 바란다.

- [생활코딩 암호학 1 유튜브](https://www.youtube.com/watch?v=NBrcJSkgYmA&list=PLuHgQVnccGMD-9lk4xmb6EG1XK1OmwC3u   
)

--- 

## 암호화 특징

- 기밀성 Confidentiality  : 암호화된 내용을 알 수 없어야 한다
- 무결성 Integrity : 내용이 원본과 같다고 확신 할수 있어야 한다.
- 인증 Authentication : 권한이 있는 사람만 정보에 접근 할 수 있어야 한다.

평문(plain text) ← 복호화 - 알고리즘 with key - 암호화 → 암호문 (cipher text)

## 암호화 방식

- 양방향 암호화 : 암호화, 복호화 모두 가능
- 단방향 암호화 : 암호화만 되고 복호화는 안됨
    - ex. md5, sha

## 양방향 암호화

- 대칭키: 암호화/복호화 모두 같은 키
    - ex. AES, Twofish
- 비대칭키: 암호화 키, 복호화 키
    - ex. RSA

## 단방향 암호화

- Hash. 원본을 알 수 없음.
- 무결성을 위해.
- 암호화 예:  CRC, MD5, RIPEMD160, SHA-1, SHA-256, SHA-512
- 사용 예: 무결성 체크, 전자서명, 파일 식별자, 사용자 비밀번호, 작업 증명

## 양방향 암호화

### 대칭키

- 같은 키로 암호화/복호화
- AES 로 구글링하면 온라인 툴 많이 있음.
- 한계 : 키가 하나이기 때문에 노출될 경우 해킹될 수 있음.

### 비대칭키 (공개키 방식)

- 두개의 키. public key / private key. key pair.
- public key 암호화 + private key 복호화 OR private key 암호화 + public key 복호화
- public key와 상관없이 private key를 사용하여 복호화.
- 공개되는 public key로는 암호화된 메세지를 풀 수 없음. 이 경우 plain text를 암호화 한 사람이라도 private key 없이는 복호화 할 수 없음.
- demo : [rsa 해볼 수 있는 online tool](https://www.devglan.com/online-tools/rsa-encryption-decryption) 

## 전자서명 (w/ 비대칭키)

- public key를 공개 + private key로 암호화한 값cipher message를 을 plain text뒤에 붙혀서 전달.
- 데이터를 확인하는 사람은 받은 값을 public key로 복호화 하여 값이 같은지를 비교. 같다면 받고자 한 메세지가 맞음. 이것이 전자서명.
    - plain text  + 전자서명 (private key로 암호화된 plain text)
- 만약, crakcer가 중간에서 다른 public/private key로 암호화한 message를 몰래 보낸다 하더라도 원래 처음에 가져온 public key로 복호화 했을때 message가 같지 않을 것이기 때문에 조작된 메세지 임을 알 수 있음.

## 보안

- 키를 잘 보관하는 것. 암호화에서 매우 중요함.
- 보안성을 높이는 방법
    - 키 값을 길게 하거나 해시값을 길게 → 자원을 많이 써야함.
    - 적절하게 사용해야함.
    - [kisa에서 권장하는 암호화 방법 및 이용 안내서](https://www.kisa.or.kr/public/laws/laws3_View.jsp?mode=view&p_No=259&b_No=259&d_No=82&ST=total&SV=) 
