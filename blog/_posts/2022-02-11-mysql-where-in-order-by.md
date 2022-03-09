---
date: 2022-02-11
tags:
- mysql
---
# (MySQL) IN 조건 순서 그대로 가져오기 (ORDER BY FIELD, FIND_IN_SET)

# tl;dr
- `ORDER BY FIELD()`와 `ORDER BY FIND_IN_SET()`을 이용하여 원하는 순서대로 정렬된 값을 받을 수 있다.
```sql
SELECT * FROM foo where id in (2,3,1) ORDER BY FIELD(id,2,3,1);  
SELECT * FROM foo where id in (2,3,1) ORDER BY FIND_IN_SET(id,"2,3,1");  
```
- `ORDER BY`를 따로 써주지 않으면 기본적으로 해당 쿼리에서 사용되고 있는 `index ASC`로 정렬된다. 
- `SELECT` 하는 필드에 따라서 index 타는게 달라질 수 있으니 순서 정렬이 중요한 경우 명시적으로 `ORDER BY`를 추가하는 것이 좋다. 

--- 

 조건에 맞는 여러 레코드를 뽑을때 `IN` 절을 자주 사용하게 된다. 그리고 `order by ID` 와 같이 특정 필드의 오름차순(ASC)나 내림차순(DESC)로 정렬하여 select 하는 경우가 많다. 

그렇다면 `IN`절로 넘어간 순서대로 뽑고 싶은 경우는 어떻게 할 수 있을까? 

다음과 같은 `foo` 테이블이 있을 때, `id` 가 `[2,3,1]`인 사람을 뽑고 이 순서대로 가져오고자 한다.  

```sql
+----+---------+------+
| id |  name   |  age | 
+----+---------+------+
|  1 | Bob     |  40  |
|  2 | Angel   |  30  |
|  3 | Daniel  |  20  |
|  4 | Chris   |  10  |
+----+---------+------+
```

```sql
mysql> SELECT * FROM foo where id in (2,3,1);
+----+---------+------+
| id |  name   |  age | 
+----+---------+------+
|  1 | Bob     |  40  |
|  2 | Angel   |  30  |
|  3 | Daniel  |  20  |
+----+---------+------+
```
그냥 뽑으면 PK `id`로 오름차순(ACS) 정렬로 결과값이 나온다.

## ORDER BY FIELD()

`ORDER BY FIELD( field, id1, id2, id3)` 로 순서대로 넣어주면 

```sql
mysql> SELECT * FROM foo where id in (2,3,1) ORDER BY FIELD(id,2,3,1);
+----+---------+------+
| id |  name   |  age | 
+----+---------+------+
|  2 | Angel   |  30  |
|  3 | Daniel  |  20  |
|  1 | Bob     |  40  |
+----+---------+------+
```

원하는 순서로 나오게 된다. 

### `FIELD` 
`FIELD(str,str1,str2,str3,...)` 에서 `str`이 `str1,str2,str3,...` 리스트에서 몇번째에 있는지 위치값을 리턴한다. 만약, 리스트안에 `str`이 없으면 0을 리턴한다. 

```
mysql> SELECT FIELD('Bb', 'Aa', 'Bb', 'Cc', 'Dd', 'Ff');
        -> 2
mysql> SELECT FIELD('Gg', 'Aa', 'Bb', 'Cc', 'Dd', 'Ff');
        -> 0
```

(좀 더 자세한 스펙은 [function_field](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_field)를 참고해 볼 수 있다.)

위에서 사용한 `ORDER BY FIELD` 안에서의 원리를 살펴보면... 

```sql
SELECT * FROM foo where id in (2,3,1) ORDER BY FIELD(id,2,3,1);
```

- `id = 1` 이면 `ORDER BY FIELD(id,2,3,1)` => 3 리턴
- `id = 2` 이면 `ORDER BY FIELD(id,2,3,1)` => 1 리턴
- `id = 3` 이면 `ORDER BY FIELD(id,2,3,1)` => 2 리턴  
- 위 리턴된 값들로 `ORDER BY`  정렬됨 


이렇게 되었을 때 혹시 퍼포먼스에는 이슈가 없나 싶어서 explain 때려봤다. 

```sql
mysql> explain SELECT * FROM foo where id in (2,3,1) ORDER BY FIELD(id, 2,3,1);
+------+-------------+-------+-------+---------------+---------+---------+------+------+-----------------------------+
| id   | select_type | table | type  | possible_keys | key     | key_len | ref  | rows | Extra                       |
+------+-------------+-------+-------+---------------+---------+---------+------+------+-----------------------------+
|    1 | SIMPLE      | foo   | range | PRIMARY       | PRIMARY | 4       | NULL | 3    | Using where; Using filesort |
+------+-------------+-------+-------+---------------+---------+---------+------+------+-----------------------------+
```

`Using filesort`로 **결과값이 많아지면 느려질 것 같긴 하다.** 이 부분을 주의 해야 할 것 같다. 
(참고. [Use of filesort to Satisfy ORDER BY](https://dev.mysql.com/doc/refman/8.0/en/order-by-optimization.html#order-by-filesort))

## `ORDER BY`가 명시되지 않았을 때 순서 

위 예제로 사용한 테이블 DDL은 다음과 같다. 검색을 위하여 `name`에 index를 걸어두었다. 

```sql
CREATE TABLE `foo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_name` (`name`)
) 
```

`index` 걸린 `name`로 위와 동일하게 `IN`절 `ORDER BY` 없이 쿼리를 해보았다. 

```sql
mysql> SELECT * FROM foo WHERE name in ('Angel', 'Bob', 'Christine', 'Daniel')
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  1 | Bob       |   40 |
|  2 | Angel     |   30 |
|  3 | Daniel    |   20 |
|  4 | Christine |   10 |
+----+-----------+------+

mysql> explain SELECT * FROM foo WHERE name in ('Angel', 'Bob', 'Christine', 'Daniel');
+------+-------------+-------+------+---------------+------+---------+------+------+-------------+
| id   | select_type | table | type | possible_keys | key  | key_len | ref  | rows | Extra       |
+------+-------------+-------+------+---------------+------+---------+------+------+-------------+
|    1 | SIMPLE      | foo   | ALL  | idx_name      | NULL | NULL    | NULL | 4    | Using where |
+------+-------------+-------+------+---------------+------+---------+------+------+-------------+
```

`PK` 로 정렬된 결과 값이 나온다. 근데 위처럼 전체(`*`)가 아닌 쿼리할 필드를 직접 넣어주면 `ORDER BY`를 추가 하지 않았는데도 결과가 달라진다. 

```sql 
mysql> SELECT id, name FROM foo WHERE name in ('Angel', 'Bob', 'Christine', 'Daniel');
+----+-----------+
| id | name      |
+----+-----------+
|  2 | Angel     |
|  1 | Bob       |
|  4 | Christine |
|  3 | Daniel    |
+----+-----------+

mysql> explain SELECT id, name FROM foo WHERE name in ('Angel', 'Bob', 'Christine', 'Daniel');
+------+-------------+-------+-------+---------------+----------+---------+------+------+--------------------------+
| id   | select_type | table | type  | possible_keys | key      | key_len | ref  | rows | Extra                    |
+------+-------------+-------+-------+---------------+----------+---------+------+------+--------------------------+
|    1 | SIMPLE      | foo   | index | idx_name      | idx_name | 183     | NULL | 4    | Using where; Using index |
+------+-------------+-------+-------+---------------+----------+---------+------+------+--------------------------+

```

동일한 `WHERE` 절이지만 쿼리하는 필드가 전체가 아닐 때는 기본 `ORDER BY` 가 지금 타고있는 `index`의 정렬로 된다. 즉, 위 쿼리에서는 `ORDER BY name ASC`가 된다. 

(참고. `SELECT id, name, age ...` 처럼 모든 필드를 다 써주게 되면 `*`과 동일하게 동작한다.)

그렇다면 `index`가 걸려있지 않은 `age`를 조건으로 넣게되면?

```sql
mysql> SELECT id, age FROM foo where age in (10,20,30);
+----+------+
| id | age  |
+----+------+
|  2 |   30 |
|  3 |   20 |
|  4 |   10 |
+----+------+

MariaDB [(none)]> explain SELECT id, age FROM foo where age in (10,20,30);
+------+-------------+-------+------+---------------+------+---------+------+------+-------------+
| id   | select_type | table | type | possible_keys | key  | key_len | ref  | rows | Extra       |
+------+-------------+-------+------+---------------+------+---------+------+------+-------------+
|    1 | SIMPLE      | foo   | ALL  | NULL          | NULL | NULL    | NULL | 4    | Using where |
+------+-------------+-------+------+---------------+------+---------+------+------+-------------+
```

index가 없으므로 처음에 확인 했던 `ORDER BY NULL`(PK `ASC`)과 동일하다. 

## ORDER BY FIND_IN_SET()

비슷한 기능을 하는 다른 함수도 있다. 

```sql
mysql> SELECT * FROM foo where id in (2,3,1) ORDER BY FIND_IN_SET(id,"2,3,1");
+----+--------+------+
| id | name   | age  |
+----+--------+------+
|  2 | Angel  |   30 |
|  3 | Daniel |   20 |
|  1 | Bob    |   40 |
+----+--------+------+

mysql> explain SELECT * FROM foo where id in (2,3,1) ORDER BY FIND_IN_SET(id,"2,3,1");
+------+-------------+-------+-------+---------------+---------+---------+------+------+-----------------------------+
| id   | select_type | table | type  | possible_keys | key     | key_len | ref  | rows | Extra                       |
+------+-------------+-------+-------+---------------+---------+---------+------+------+-----------------------------+
|    1 | SIMPLE      | foo   | range | PRIMARY       | PRIMARY | 4       | NULL | 3    | Using where; Using filesort |
+------+-------------+-------+-------+---------------+---------+---------+------+------+-----------------------------+
```

먼저 살펴본 `FIELD`와는 문법이 살짝 다르다. 첫번째 param으로는 동일하게 '필드명'을 두번째 param은 String이나 [Set](https://dev.mysql.com/doc/refman/8.0/en/set.html)으로 넣어주어야 한다. (ex. `"2,3,1"`)

동작 방식은 동일하다. String일 경우 `,`로 이루어진 문자 리스트에서 몇 번째에 있는지 리턴해준다. String을 `,`로 파싱을해야하기 때문에, 만약 첫번째 argument, 즉, 해당 필드 레코드 중에 `,`이 들어가 있으면 원하는대로 동작하지 않을 수 있다.  예시는 아래와 같다. 

```sql
mysql> SELECT * FROM foo;
+----+-----------+------+
| id | name      | age  |
+----+-----------+------+
|  1 | Bob       |   40 |
|  2 | Angel     |   30 |
|  3 | Dan,iel   |   20 |
|  4 | Christine |   10 |
+----+-----------+------+

mysql> SELECT * FROM foo where name in ('Angel', 'Bob', 'Dan,iel') order by field(name, 'Angel', 'Bob', 'Dan,iel');
+----+---------+------+
| id | name    | age  |
+----+---------+------+
|  2 | Angel   |   30 |
|  1 | Bob     |   40 |
|  3 | Dan,iel |   20 |
+----+---------+------+

mysql> SELECT * FROM foo where name in ('Angel', 'Bob', 'Dan,iel') order by FIND_IN_SET(name, 'Angel,Bob,Dan,iel');
+----+---------+------+
| id | name    | age  |
+----+---------+------+
|  3 | Dan,iel |   20 |
|  2 | Angel   |   30 |
|  1 | Bob     |   40 |
+----+---------+------+
```


(좀 더 자세한 스펙은 [function_find-in-set](https://dev.mysql.com/doc/refman/8.0/en/string-functions.html#function_find-in-set)를 참고해 볼 수 있다.)

## Performance 

이 둘의 퍼포먼스 차이는 [stackoverflow에 올라온 답변](https://stackoverflow.com/a/1631749)를 참고해보았다. 

```sql
SELECT * FROM Votes ORDER BY FIND_IN_SET(VoteTypeId, '13,1,12,2,11,3,10,4,9,5,8,6,7');

3618992 rows in set (31.26 sec)
3618992 rows in set (29.67 sec)
3618992 rows in set (28.52 sec)

SELECT * FROM Votes ORDER BY FIELD(VoteTypeId, 13,1,12,2,11,3,10,4,9,5,8,6,7);

3618992 rows in set (37.30 sec)
3618992 rows in set (49.65 sec)
3618992 rows in set (41.69 sec)
```

**별 차이 없다.**

# References
- [How does ORDER BY FIELD() in MySQL work internally](https://dba.stackexchange.com/questions/109120/how-does-order-by-field-in-mysql-work-internally)

- [Maintaining order in MySQL "IN" query](https://stackoverflow.com/questions/1631723/maintaining-order-in-mysql-in-query)

- [[MYSQL]order by field 와 union, 원하는 대로 정렬 하기
](http://b1ix.net/93)

- [MSQL ORDER BY 정렬 빼도 될까? 2](https://dung-beetle.tistory.com/63?category=801427)

- [ORDER BY Optimization](https://dev.mysql.com/doc/refman/8.0/en/order-by-optimization.html)