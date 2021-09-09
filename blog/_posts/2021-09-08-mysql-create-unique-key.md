---
date: 2021-09-08
tags:
  - til
  - mysql
---

# Duplicate entry '' for key 오류

사실 알고 보면 명확한 하고 심플한 에러인데 "뭐지?" 하며 구글링을 했던 이슈라 짧게 노트 남겨둔다.

- 환경 : mysql
- 작업 내용 : 기존 있는 field를 unique로 해주어야 함.

간단한 내용이기 때문에 다음과 같은 SQL문을 준비했다.

```sql
ALTER TABLE `My_Tables`
ADD UNIQUE INDEX `my_field_UNIQUE` (`my_field`)
```

실행하자 다음과 같은 에러가 났다.
```
Duplicate entry '' for key 'my_field_UNIQUE'
```

그야말로 `my_field_UNIQUE` 키에 대해 중복된 입력이 있다는 것인데, "나는 필드 alter 치는데 무슨 entry?" 라면서 헛집었다.

해당 키는 아래와 같은 모양이 였는데,
```
  `my_field` varchar(100) DEFAULT NULL,
```
다른 작업을 하면서 `''` 빈 문자열로 들어간 값들이 있었고, 이미 `''` 빈 값으로 들어간 것들도 중복값으로 보고 에러를 뱉은 상황이었다.

위 에러를 본다면 다음과 같이 간단히 확인해 볼 수 있다.

```
SELECT my_field,COUNT(my_field)
FROM My_Tables
GROUP BY my_field
HAVING COUNT(my_field) >1
```

결과에 나온 값을 가지고 있는 데이터들을 고쳐주면 된다.

진짜 별거 아닌데 30분 요걸로 까먹었다. 다음에는 1분만에 알아채자.

ref : [https://stackoverflow.com/questions/17823322/1062-duplicate-entry-for-key-unique-id-when-trying-to-add-unique-key-my](https://stackoverflow.com/questions/17823322/1062-duplicate-entry-for-key-unique-id-when-trying-to-add-unique-key-my)