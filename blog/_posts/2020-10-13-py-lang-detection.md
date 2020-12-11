---
date: 2020-10-13
tags:
  - etc
  - python
---

# 파이썬 언어 감지 라이브러리들 비교 

사용자 입력값을 보고 언어를 감지하고자 한다.

요구사항은... 

- 정확성이 높고.
- 이름과 같이 짧을 단어(한 글자, 두 글자)까지도 커버.
- (optional) 빠르고 다양한 언어를 지원할수록 좋다. 

## TL;DR
정확도가 높고 빠른것은 fastText, 단어가 몇개 없는데도 잘 인식된 것은 langid.py 였다. 

## 라이브러리들

### langdetect 
- https://github.com/Mimino666/langdetect 
- [language-detection](https://github.com/shuyo/language-detection) 을 파이썬으로 포팅한 라이브러리.
- [55개의 언어](https://github.com/Mimino666/langdetect#languages) 지원

`pip install langdetect` 

```py 
from langdetect import detect

detected = detect('안녕하세요') 
# ko
```

### TextBlob
- https://textblob.readthedocs.io/en/dev/ 
- Detect the blob’s language using the Google Translate API.
- 내부적으로 Google Translate API 사용. 즉, 꼭 인터넷 연결이 되어있어야 함.

`pip install textblob`

```py 
from textblob import TextBlob

detected = TextBlob('헬로 월드').detect_language() 
# u'ko'
```

### langid 
- https://github.com/saffsd/langid.py 

`pip install langid`

```py 
import langid
detected = langid.classify("언어를 맞춰봐라!") 
# ('ko', -54.41310358047485)
```

### fastText
- https://github.com/facebookresearch/fastText/ 
- https://fasttext.cc/
- 사용시 따로 모델을 추가 해서 사용해야 함. ([여기](https://fasttext.cc/docs/en/language-identification.html)서 lid.176.ftz 다운로드)
- [157개의 언어](https://github.com/facebookresearch/fastText/#models) 지원

`pip install fasttext`

```py 
import fasttext
model = fasttext.load_model('lid.176.ftz')
print(model.predict('안녕 여러분', k=2))  # top 2 matching languages

# (('__label__ko', '__label__en'), array([0.99338406, 0.00536941]))
```

- [Mac 환경에서 pip install시 아래와 같이 에러가 날 수 도 있다.](https://github.com/facebookresearch/fastText/issues/753) 
```
Collecting fasttext
  Using cached fasttext-0.9.2.tar.gz (68 kB)
Requirement already satisfied: pybind11>=2.2 in ./venv/lib/python3.7/site-packages (from fasttext) (2.5.0)
Requirement already satisfied: setuptools>=0.7.0 in ./venv/lib/python3.7/site-packages (from fasttext) (50.3.0)
Requirement already satisfied: numpy in ./venv/lib/python3.7/site-packages (from fasttext) (1.19.2)
Building wheels for collected packages: fasttext
  Building wheel for fasttext (setup.py) ... error
  ERROR: Command errored out with exit status 1:
   command: /Users/user/cheese/py-lang-detection/venv/bin/python -u -c 'import sys, setuptools, tokenize; sys.argv[0] = '"'"'/private/var/folders/01/xckt8bm1149ff7vcy6314dxm0000gn/T/pip-install-f60yifku/fasttext/setup.py'"'"'; __file__='"'"'/private/var/folders/01/xckt8bm1149ff7vcy6314dxm0000gn/T/pip-install-f60yifku/fasttext/setup.py'"'"';f=getattr(tokenize, '"'"'open'"'"', open)(__file__);code=f.read().replace('"'"'\r\n'"'"', '"'"'\n'"'"');f.close();exec(compile(code, __file__, '"'"'exec'"'"'))' bdist_wheel -d /private/var/folders/01/xckt8bm1149ff7vcy6314dxm0000gn/T/pip-wheel-art_vsfz
       cwd: /private/var/folders/01/xckt8bm1149ff7vcy6314dxm0000gn/T/pip-install-f60yifku/fasttext/
  Complete output (249 lines):
  ...
```
- 이 경우 `xcode-select --install` 를 하거나 xcode를 실행하여 software update를 해주면 된다. 
- 그래도 또 안된다면 [path가 잘못 되어있을수도 있다.](https://github.com/facebookresearch/fastText/issues/753#issuecomment-550390300) 다음과 같이 실행해 본다. 

```sh
xcode-select --install
sudo xcode-select -switch /Library/Developer/CommandLineTools/
``` 

이외에도 잘 안된다면 [requirements](https://github.com/facebookresearch/fastText#requirements)를 참고하여 환경을 맞춰주자. 


### pyCLD3
- https://github.com/bsolomon1124/pycld3
- 라이브러리 내에 inference code와 trained model이 같이 들어있음.

`pip install pycld3`

```py
import cld3

detected = cld3.get_language("블로그 글쓰기는 어렵다") 
# LanguagePrediction(language='ko', probability=1.0, is_reliable=True, proportion=1.0)
```
## 라이브러리 비교 

내가 확인하고자 하는 것만 담은 임의 데이터 세트(짧은 이름과 짧은 문장)이기에 정확한 비교가 아닐 수 있다.
자신의 니즈에 맞는 테스트 세트을 구하거나 만들어 테스트 해 보길 바란다. 이 비교에서는... 

- 한국, 중국, 일본, 영어 이름 (짧은 두 글자 부터)
- 한국, 중국, 일본, 영어, 프랑스 기초 회화.

로 이루어진 26개의 [데이터 세트](https://github.com/jiyeonseo/py-lang-detection/blob/master/lang_detect_test.csv)으로 준비했다. 

### 정확도 

- 이름과 짧은 문장으로 테스트 하였으므로 테스트 데이터 세트에 따라 달라질 수 있다.

| Idx  | lib | result | 
| ------ | ------ | ------- | 
| 1 | fastText | 92% |
| 2 | langid.py | 84% |
| 3 | TextBlob | 76% (3글자 아래는 제외) |
| 4 | pyCLD3 | 65% |
| 5 | langdetect | 61% |


내가 가진 테스트 세트 내 오답을 보면 아래와 같았다.  

- fasttext
```
吉童. expected = zh, result = ('__label__ja',).
认识你很高兴. expected = zh, result = ('__label__en',).
```

- langid
```
Jane Doe. expected = en, result = pl.
Michael J. Jackson. expected = en, result = de.
Bonjour. expected = fr, result = en.
Comment allez-vous?. expected = fr, result = en.
```

- TextBlob
```
Jane Doe. expected = en, result = nl. 
```
  
- pyCLD3
```
Jane Doe. expected = en, result = hi-Latn.
Michael J. Jackson. expected = en, result = ht.
早上好. expected = zh, result = ja.
Hello. expected = en, result = sr.
Bye. expected = en, result = kk.
Nice. expected = en, result = lt.
Bonjour. expected = fr, result = no.
Enchantée. expected = fr, result = hu.
```

- langdetect
```
吉童. expected = zh, result = ko.
洪吉童. expected = zh, result = ko.
JD. expected = en, result = id.
Jane Doe. expected = en, result = af.
Michael J. Jackson. expected = en, result = de.
你好. expected = zh, result = zh-cn.
认识你很高兴. expected = zh, result = zh-cn.
早上好. expected = zh, result = ko.
Hello. expected = en, result = fi.
Bye. expected = en, result = da.
Nice. expected = en, result = ro.
```


### 속도 

- 이름과 짧은 문장으로 테스트하였으므로 테스트 데이터 세트에 따라 달라질 수 있다.

| Idx  | lib | result | 
| ------ | ------ | ------- | 
| 1 | fastText | 0.0007698535919189453 |
| 2 | pyCLD3 | 0.0027840137481689453 |
| 3 | langdetect | 0.5143527984619141 |
| 4 | langid.py | 1.5746371746063232 |
| 5 | TextBlob | 2.360351085662842 (3글자 아래는 제외)  |

다들 꽤 빨랐고 TextBlob이 내부적으로 api를 치는 거라 그런지 테스트는 적게 했지만 가장 오래 걸렸다. 


### Github 스타수 (2020.10.13 기준) 

은근 중요한 스타 수!  

| Idx  | lib | result | 
| ------ | ------ | ------- | 
| 1 | fastText | [21.7k](https://github.com/facebookresearch/fastText) |
| 2 | TextBlob | [7.3k](https://github.com/sloria/textblob) |
| 3 | langid.py | [1.7k](https://github.com/saffsd/langid.py) |
| 4 | langdetect | [135](https://github.com/Mimino666/langdetect) |
| 5 | pyCLD3 | [45](https://github.com/bsolomon1124/pycld3) |


## 결론 

- TextBlob은 이름에 적합하지 않았다. 

```py
textblob.exceptions.TranslatorError: Must provide a string with at least 3 characters.
```

  - 거기다가 이제는 deprecated. [`Deprecated since version 0.16.0: Use the official Google Translate API instead.`](https://textblob.readthedocs.io/en/dev/api_reference.html?highlight=detect#textblob.blob.Word.detect_language)


- langdetect는 왠지 한자를 다 한국어로 인식.   
- pyCLD3는 정말 빠르지만 정확도 면이 아쉬움. 
- fastText는 가장 빠르고 정확도도 높았다. 내가 직접 모델을 넣어줘야 하는 점과 NumPy, SciPy, pybind11 등 맞춰 환경을 세팅해야 하는 점이 좀 귀찮았다. 
- langid는 속도는 빠르지 않았지만 정확도가 높고 한국어,중국어,일본어 구별이 잘 되는 것을 확인할 수 있었다. 

## 테스트 코드

https://github.com/jiyeonseo/py-lang-detection

## references
- [Python: How to determine the language?](https://stackoverflow.com/questions/39142778/python-how-to-determine-the-language)