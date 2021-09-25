---
date: 2021-09-24
tags:
  - orm
  - peewee
---

# ORM 잘못 쓰지 않기

나는 ORM 쓰는 것을 좋아한다. 개발자의 실수를 컴파일 단계에서 많이 걸러줄 수 있고, IDE를 쓸 경우 자동 완성 기능이나 코드 트래킹, 또 추상화를 통해 특정 데이터베이스에 의존하지 않는 등 많은 장점들이 있다. 

또 다른 큰 장점은 테이블 안 데이터를 객체로 사용할 수 있다는 것이다. 코드를 더 자주 보는 개발자에게는 훨씬 더 직관적이고, 가독성이 좋고, 비지니스 로직에 집중할 수 있다. 

이 부분을 잘못 이해하는 경우가 종종 있다. DB에서는 객체를 가져오기만 하고 코드에서 모든 로직을 처리하는, 그야말로 코드로 그대로 풀어내는 경우가 있는데, 이는 RDB를 제대로 사용하지 않는 방법이며, 코드 가독성 역시 떨어뜨릴 수 있는 방법이기도 하다.

예를 들어, 아래와 같은 조건으로 쿼리를 해본다고 가정해보자.

> `2021년에 결석한 적 있는 Class A 반에 있는 학생의 이름을 구해보자.` 

DB에는 `Student`, `Class`, `History` 라는 테이블가 존재하고 각각은 학생 정보, 반 정보, 학생들의 출결 기록 정보를 가지고 있다. 

잘못 사용한 사례를 먼저.

아래는 python ORM 라이브러리 중 하나인 [peewee](http://docs.peewee-orm.com/en/latest/) 문법을 이용하여 간단하게 표현해보았다. (문법은 살짝 틀릴수 있다.)

```py
  students = Student.select()

  class_a = Class.select().where(Class.name == "Class A")
  
  class_a_students_id = []
  
  for student in students:
  	if student.class_id == class_a.id:
  	  class_a_students.append(student.id)  

  students_absent_2021 = History.select(Student.name).join(Student).where( \
                            (History.event == "absence") & \
                            (History.created_at > "2021-01-01") & \
                            (History.student_id.in_(class_a_students_id)) \
                         )
```

마치 긴 소설을 읽듯 처음부터 끝까지 여러 줄을 읽어야 코드가 이해가 된다. 마지막에 `join` 이 들어갔지만 RDB의 특징인 테이블간의 관계를 잘 이용하지 못하였고, 조건 안에 들지 않는 모든 student를 통째로 들고와 메모리에 올리고 있다. 

위 조건을 우선 쌩쿼리로 짜 본다. 

```sql
SELECT DISTINCT(student.name)
FROM Student as student
JOIN Class as class on class.id == student.class_id
JOIN History as history on history.student_id == student.id
WHERE class.name = "Class A" 
  AND history.event = "absence" 
  AND history.created_at > "2021-01-01"
```

이를 위에서 사용해보았던 peewee 문법으로 다시 옮겨보겠다. 

```py
 students_absent_2021 = Student.select(DISTINCT(Student.name)) \
                        .join(Class, on=(Class.id == Student.class_id)) \
                        .join(History, on=(History.student_id == Student.id)) \
                        .where( \
                          (Class.name == "Class A") & \
                          (History.event == "absence") & \ 
                          (History.created_at > "2021-01-01") \
                        )
```

peewee 모델 클래스 객체를 사용하고 있으며, 조건문 역시 python 코드를 그대로 사용중이다. `where` 절 안에 조건들이 잘 녹아있으며 쿼리 한번으로 필요한 데이터에 대해서만 가지고 왔다. 

위 예제는 아주 기본적인 케이스라 크게 와닿지 않을 수도 있지만, 입문자 분들에게서 쉽게 실수 할 수 있는 부분이다. 저 코드 상태에서 리팩토링을 위해 `select` 해오는 부분을 공통으로 뽑아 `get_students` `get_class` 이렇게 나누다보면 쿼리 요청수는 많아지고, 정작 어떤 것들을 `select` 하려고 이해하려면 이곳저곳 흩뿌려진 코드들을 모두 따라가야 하는 불상사까지 일어난다.

코드도 언어다. 주저리주저리 길게 이야기하면 집중도가 떨어지게 되고 코드도 지루해진다. 간단 명료한 코드가 읽는데도 재미있다. 

모든 원쿼리가 최고라는 의미는 아니다. 어느 정도의 적당한 레벨에서 타협하는 것이 좋다. 하지만, 어쨌든 데이터를 가져올 때는 데이터만! 가져오는 것에 집중하는 것이 좋다. 잘 짜인 쿼리는 코드보다 더 짧고 좋은 가독성을 가질 수 있다. 

매우 꼰대 같은 말이긴 하지만 ORM을 잘 쓰려면 먼저 쿼리 잘 짜는 방법부터 공부해야 한다. 
