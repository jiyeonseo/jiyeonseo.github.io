---
date: 2022-01-12
tags:
- python
- peewee
---

# peewee JSONField 업데이트 시 주의할 점

peewee에서 제공하는 옵션중 `only_save_dirty` 가 있다. 
[`.save()` 호출 시에, 변경된 필드에 대해서만 save 하는 설정이다. ](http://docs.peewee-orm.com/en/latest/peewee/models.html?highlight=save#model-options-and-table-metadata)

옵션 설정은 다음과 같이 `Meta` 클래스에 설정할 수 있다. 
```python
from peewee import *

contacts_db = SqliteDatabase('contacts.db')

class Person(Model):
    name = CharField()
	job = CharField()
	extra = JSONField()

    class Meta:
        database = contacts_db
		only_save_dirty = True
```

혹은 저장시에 아래와 같이 조건으로 넘겨 줄 수도 있다. 
```python
model.save(only=model.dirty_fields)
```

Model에서 설정하고 instance 내 필드를 변경하여 저장 하게되면 변경된 필드만 업데이트 된다. 

```python
person = Person(name="Wanda", job="engineer")
person.save() 

person.job = "hero" # 이렇게 변경된 것을 dirty 되었다고 한다. 
person.save() # UPDATE Person SET job="hero" ... 
```

여기서 한가지 주의할 점이 있다. 

**변경할 필드가 JSON 타입인 경우 내부 값만 변경해주면 `dirty_fields` 라고 취급하지 않아 업데이트할 필드로 들어가지 않는다.**

즉, 다음과 같은 경우는 변경값이 없다고 본다. 
```python
person = Person(name="Wanda", job="engineer", extra={"power":100})
person.save() 

person.extra["power"] = 1000 
person.save() # update nothing 
person.is_dirty() # False
```

왜 그런가 하고 코드를 살펴보니, `only_save_dirty` 인 경우 `self.dirty_fields` 로 업데이트 할 필드들을 가지고 오는데, 
```python
# peewee.py
def save(self, force_insert=False, only=None):
   ...
   elif self._meta.only_save_dirty and not force_insert:
       field_dict = self._prune_fields(field_dict, self.dirty_fields)
       if not field_dict:
            self._dirty.clear()
            return False
```
([https://github.com/coleifer/peewee/blob/master/peewee.py#L6601-L6605](https://github.com/coleifer/peewee/blob/master/peewee.py#L6601-L6605))

이 `self.dirty_field`는  `self._dirty` 의 값에서 가져오는 것이고,  
```python
# peewee.py
@property
def dirty_fields(self):
    return [f for f in self._meta.sorted_fields if f.name in self._dirty]
```
([https://github.com/coleifer/peewee/blob/master/peewee.py#L6638-L6640](https://github.com/coleifer/peewee/blob/master/peewee.py#L6638-L6640))

이 값이 추가 되는 곳은 Field class의 `__set__` 에서 추가 되고 있다. 
```python
# peewee.py
class FieldAccessor(object):

    def __set__(self, instance, value):
        ...
        instance._dirty.add(self.name)
```
([https://github.com/coleifer/peewee/blob/master/peewee.py#L4446-L4448](https://github.com/coleifer/peewee/blob/master/peewee.py#L4446-L4448))

**즉, field에 직접 set 한 경우에만 수정된 필드라고 취급한다.**

위 코드들을 읽어가며 왜 안되는건지 확인했고, 요게 버그인가, PR 날려야 하나 생각하고 있었는데... 

이 글 정리하다가 문서에 이미 warning으로 쓰여져 있는 걸 확인 했다.

> Peewee determines whether a field is “dirty” by observing when the field attribute is set on a model instance. If the field contains a value that is mutable, such as a dictionary instance, and that dictionary is then modified, Peewee will not notice the change.

([https://docs.peewee-orm.com/en/latest/peewee/api.html?highlight=dirty#Model.dirty_fields](https://docs.peewee-orm.com/en/latest/peewee/api.html?highlight=dirty#Model.dirty_fields))


### 결론
문서를 잘 읽자. 
