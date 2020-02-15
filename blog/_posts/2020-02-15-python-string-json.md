---
date: 2020-02-15
tags:
  - python
---

# Python string이 valid json 형태인지 확인하기

```py
import json
def is_json(obj):
    try:
        json_object = json.loads(obj)
        # { } 가 포함된 string이 invalid json 인 경우 Exception
        iterator = iter(json_object)
        # { } 가 없는 경우는 string의 경우 Exception
    except Exception as e:
        return False
    return True
```

```py
print is_json("Just string")             #prints False
print is_json("{}")                          #prints True
print is_json("{asdf}")                      #prints False
print is_json('{ "age":100}')                #prints True
print is_json("{'age':100 }")                #prints False
print is_json("{\"age\":100 }")              #prints True
print is_json('{"age":100 }')                #prints True
print is_json('{"foo":[5,6.8],"foo":"bar"}') #prints True
```

## Reference

- [https://stackoverflow.com/questions/5508509/how-do-i-check-if-a-string-is-valid-json-in-python](https://stackoverflow.com/questions/5508509/how-do-i-check-if-a-string-is-valid-json-in-python)
