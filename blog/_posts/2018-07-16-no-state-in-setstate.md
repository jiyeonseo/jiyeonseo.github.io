---
date: 2018-07-16
tags: 
  - react
---

# setState() 함수 안에서  this.state 사용하지 않기

오늘 ESLint에서 걸린 warning. 

간단한 state 값 변경시 자주 사용하는 방법이다. 

```
<button 
  onClick={()=>{
    this.setState({value : this.state.value + 1});
  }}
/>
```

하지만,
만약 한 function에서 `this.setState()` 한번에 두개가 있고 this.state를 공유한다면, 

```
function increment() {
  this.setState({value: this.state.value + 1});
  this.setState({value: this.state.value + 1});
}
```
value가 1일 경우, 
```
setState({value: 1 + 1}) 
setState({value: 1 + 1})
```
위처럼 문제가 될 수도 있다. 

이를 피하기 위해서 이전 State 값을 인자로 받는 Callback으로 처리해주는 것이 좋다.  

```
this.setState(prevState => 
	({value: prevState.value + 1}));
```
위와 같이 value가 1일 경우,
```
setState({value: 1 + 1})
setState({value: 2 + 1})
```


ref : [https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-access-state-in-setstate.md ) 