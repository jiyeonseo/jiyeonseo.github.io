---
date: 2016-11-15
tags: 
  - etc
---
# Intellij에 Google Style 적용하기

*코딩 컨벤션*은 예쁜 코드를 위해서도 필요하지만, 협업시, 장기로 프로젝트를 운영할 때 유용하다.

특히, 여러사람과 협업할 때, 코드가 흐트러지는 것을 방지하고, 코드리뷰시 쓸때없는 diff를 줄여줘
더 효과적인 코드 리뷰를 할수 있도록 도와준다.

다양한 스타일 가이드 라인이 있는데, 본 글에서는 [Google Style Guide](https://github.com/google/styleguide) 중 Java Style Guide를 Intellij에 적용해보고자 한다.

## 환경
- OSX 10.11
- [Intellij Comminity 2016.2](https://www.jetbrains.com/idea/)

## 설정 방법
1. [https://github.com/google/styleguide](https://github.com/google/styleguide)에서
```intellij-java-google-style.xml``` 를 다운받는다.

2. Intellij에서 환경설정(Preference) -> Editor -> Code Style을 선택.

![](@assets/20161115/int-google-1.png)

3. 상단 magage > import > ```intellij-java-google-style.xml``` >>> "GoogleStyle" 선택

![](@assets/20161115/int-google-2.png)


## 리포맷하는 방법

1. ```⌥⇧⌘L``` (shift + alt + cmd + L) : 키맵에 따라 차이가 있을 수 있음.

2. code > Refomat Code 클릭

참고 : [Installing the coding style settings in Intellij](https://github.com/HPI-Information-Systems/Metanome/wiki/Installing-the-google-styleguide-settings-in-intellij-and-eclipse)

***



```#지프넓얕``` , ```#지적프로그래밍을위한넓고얕은습관```
