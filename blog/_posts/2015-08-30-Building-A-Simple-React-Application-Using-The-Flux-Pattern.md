---
date: 2015-08-30
tag: 
  - react
---

# [번역]Flux 패턴을 이용한 간단한 React 어플리케이션 만들어보기

공부하기 위해 막 번역한 문서입니다. 매끄럽지 못한 번역 양해 부탁드리며, 오역이나 다른 의견이 있으시다면 편히 댓글 달아주세요~

[Tony Spiro의 Building A Simple React Application Using The Flux Pattern: A Step-By-Step Guide](http://tonyspiro.com/building-a-simple-react-application-using-the-flux-pattern/)를 번역 글입니다.


리액트는 인터렉티브한 자바스크립트 어플리케이션을 만들기 좋은 강력한 라이브러리다. 가장 강력한 한가지를 꼽으라면 단방향 데이터 흐름을 만들 수 있다는 것이다. 이는 다른 프레임 워크에서의 양방향 데이터 바인딩과 큰 다른점이다. 리액트를 이용한다면 모든 어플리케이션의 부분 부분들지 자기 자신 하나의(single) 소스에 의해 컨트롤 된다. 이 자신은 컴포넌트라 정의 되고 이것은 “props”를 통해 자신이 가진 컴포넌트에게 다시 전해진다.

컴포넌트가 더 더해질 수록, 로직은 더 복잡해져가고 컴포넌트에서 컴포넌트로 이어지는 이벤트들을 따라가기 힘들어진다. 바로 이러한 점 때문에 Flux가 단계적으로 이벤트를 실행시키고 데이터를 바꾸는 outlet을 제공하는 이유이다.

Flux의 그래프와 모델들을 설명하기에 앞서 쉬운 Flux 예제 어플리케션을 만들어보자. 여기서 우리는 ES6와 babel의 도움을 받아 볼 것이다. 만약 위의 것들과 친숙하지 않다면 [이 글](https://babeljs.io/) 을 참고하길 바란다. 바벨은 es6와 jsx()를 동시에 사용 할 수 있게 해주며 ES5로 컴파일 시켜준다. 이를 통해 최신 그리고 오래된 브라우저 모두 호환될 수 있다. 그럼 이제 시작해보자.

### 간략하게

이번 튜토리얼의 전체 소스는 [깃허브](https://github.com/tonyspiro/easy-flux-example)에서 다운받아 볼 수 있다. 만약 스텝 바이 스텝으로 알아보고 싶다면 계속 읽어 보도록 하자.

### 시작하기
먼저, 실습해 볼 위치에서 아래의 명령어를 실행 시켜보자.

```sh
mkdir easy-flux-example
cd easy-flux-example
```

이제 dependency들을 추가해 보자. 보통 package.json 파일과 함께 npm install 을 실행시키겠지만,
우리는 공부하고 있으니 어떤 것들이 추가되고 왜 필요한지 알아보기 위해 아래와 같이 명령어를 실행시켜보겠다:
(아래 명령어를 한번에 실행시켜야 한다)

```sh
npm install react babelify browserify flux lodash vinyl-source-stream events gulp gulp-uglify gulp-rename run-sequence
```

(혹은 다음과 같이 한번에 하나씩 도 해볼수 있다.)

```sh
npm install react // 리액트(react)
npm install babelify // 바벨(babel) 컴파일러
npm install browserify // 노드 모듈 로더
npm install flux // 플럭스(flux)
npm install lodash // 멋진 JS 유틸
npm install vinyl-source-stream // 쉬운 걸프 이용을 위한
npm install events // 노드 이벤트 emmiiter
npm install gulp // 컴파일과 빌드를 할 테스크 러너
npm install gulp-uglify //
// bundle.js(2.7MB)를 bundle.min.js(251K)로 압축
npm install gulp-rename //  bundle.js를 bundle.min.js로 이름 변경
npm install run-sequence // gulp 프로세스를 순서대로 실행하도록
```

이제 필요한 모든 것들을 준비했다. 이제 테스크 러너부터 만들어보자. 나는 Gulp를 선호하지만, 원한다면 [Grunt](http://gruntjs.com/)를 사용해도 좋다.(나를 포함해, [다수의 개발자들이 Gulp가 더 낫다고 주장하고 있지만](http://sixrevisions.com/web-development/grunt-vs-gulp/))

다음 코드를 더해보자 :
```
// gulpfile.js
var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var runSequence = require('run-sequence');

gulp.task('build', function () {
  return browserify({
    entries: 'app.js',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  return gulp.src('./dist/bundle.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function(cb) {
  runSequence('build','compress', cb);
});
```

파일을 한번 살펴보자. default build는 Browserify로 모든 모듈들을 묶고, Babel을 이용해 bundle.js로 변환시켜본다. 그리고 dist 폴더에 넣음으로써 끝난다. 정말 간단하고 명료하다.

자, 이제 모든 준비를 마쳤다. 이제 (드디어!) 우리의 어플리케이션을 만들어보자.

먼저, `index.html`을 만든다.

```
vim index.html
```

다음과 같이 index.html에 추가해 보자:

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Easy Flux Example</title>
</head>
<body>
  <h1>Easy Flux Example</h1>
  <div id="app-root"></div>
  <script src="dist/bundle.min.js"></script>
</body>
</html>
```

프론트앤드를 위한 것은 이게 전부다. 모든 다른 것들은 React와 Flux로 제어된다.

이제 메인 app 파일로 어플리케이션 만들기를 시작하자.

```sh
vim app.js
```

아래 코드를  app.js에 더해보자.

```js
// app.js
import React from 'react';
import AppRoot from './components/AppRoot'; // 이후에 이 파일을 만들 것이다.

React.render(<AppRoot />,
  document.getElementById('app-root')
);
```

ES6 문법은 바벨(Babel)을 통해 ES5와 호환될 수 있음을 명심하자. 노드 모듈 importing 역시 Browserify에 의해 제어 된다.

다음으로는 AppRoot 컴포넌트를 만들어보자 .

```ah
mkdir components
cd components
vim AppRoot.jsx
```

파일에 다음과 같이 입력해보자.

```js
// AppRoot.jsx
import React from 'react';
class AppRoot extends React.Component {
    render(){
        // 후에 이 곳에 list를 넣을 것이다.
        let itemHtml = <li>Hello React</li> ;
        return <div>
            <ul>
                { itemHtml }
            </ul>
         </div>;
    }
  };

export default AppRoot;
```

이제 돌아가 모든 것들이 잘 돌아가는지 확인해 보자.

```sh
cd ../
```

gulp 명령어를 실행시켜 ES6와 JSX를 ES5로 변환하고(Bebelify), 모든 파일을 bundle.js로 로드시키자(Browserify). 만약 처음 gulp를 실행 시키는 것이라면, 먼저 CLI를 이용해 gulp를 글로벌로 설치하자.

```sh
sudo npm install gulp -g
```

이제 빌드해보자.

```sh
gulp
```

지금까지 우리가 한 것들을 체크해보자. 그저 쉽게 브라우저에서 index.html을 볼 수 있다. 하지만 localhost에서 보는게 더 좋을 것 같다. 만약 http-server 가 설치되어 있지 않다면, 아래와 같이 실행시켜보자.

```sh
sudo npm install http-server -g
http-server
```

자, 이제  <a href="http://localhost:8080">http://localhost:8080</a> 으로 가보자. React 어플리케이션이 잘 실행 되었음을 알 수 있는 메세지를 볼 수 있을 것이다.

React가 잘 작동됨을 확인했다. 이제 Flux를 이용해 좀 더 인터랙티브한 것들을 더해보자.


### Flux 적용하기

Flux 아키텍쳐에서 주요 부분은 컴포넌트(Components), 스토어(Store), 그리고 디스패쳐(Dispatcher)이다. 우리는 이미 하나의 컴포넌트가 있으니, 이제 스토어를 만들어보자. 스토어는 다음 3가지 역할을 할 것이다.

1. 어플리케이션의 data를 초기화
2. 어플리케이션 실행 과정에 필요한 함수를 저장
3. 어플리케이션 re-render를 위한 event들을 등록(emit)

### 스토어(Store)로 부터 데이터 읽기

스토어를 만들기 위해 다음과 같은 명령어를 실행 시켜 보자:

```
mkdir stores
cd stores
vim ListStore.js
```
ListStore.js에 다음과 같이 추가해 보자.

```
// ListStore.js
import {EventEmitter} from 'events';
import _ from 'lodash';

let ListStore = _.extend({}, EventEmitter.prototype, {

  // 가짜 기본 데이터
  items: [
    {
      name: 'Item 1',
      id: 0
    },
    {
      name: 'Item 2',
      id: 1
    }
  ],

  getItems: function(){
    return this.items;
  },

});

export default ListStore;
```

이 코드에서 우리는 노드의 EventEmmiter 를 추가하였다. 이를 통해 스토어에 컴포넌트의 UI 렌더링을 트리거 시킬 수 있는  이벤트를 등록 할 수 있다. Lodash는 EventEmmiter을 ListStore 객체에 바인딩 되도록 돕는다.(다른 메소드를 사용할 수도 있다) 그리고 보여줄 가짜 기본 데이터도 생성하였다. `getItems` 함수는 스토어의 items를 가져올 수 있다.

이제 AppRoot 컴포넌트에 ListStore를 추가하여 기본 스토어 데이터(default Store data)를 뿌려줄 수 있도록 해보자. 아래의 명령어를 실행하자:

```
cd ../
cd components
vim AppRoot.jsx
```
AppRoot.jsx 를 아래와 같이 바꿔보자:

```js
// AppRoot.jsx
import React from 'react';
import ListStore from '../stores/ListStore';

// Store로 부터 데이터를 가져오는 메소드
let getListState = () => {
  return {
    items: ListStore.getItems()
  };
}

class AppRoot extends React.Component {

  constructor() {
    super();
    this.state = getListState();
  }

  render(){

    let items = ListStore.getItems();

    let itemHtml = items.map(( listItem ) => {

      return <li key={ listItem.id }>
          { listItem.name }
        </li>;

    });

    return <div>
        <ul>
            { itemHtml }
        </ul>

    </div>;
  }

}

export default AppRoot;
```

아래와 같이 명령어를 실행시켜 bundle.js를 다시 빌드하자:

```
cd ../
gulp
```
다음 명령어를 실행 시키자:

```
http-server
```
이제 <a href="http://localhost:8080">http://localhost:8080</a>에서 달라진 모습을 확인해보자.

### Store에서 아이템 추가/삭제하기

Store에서 새로운 아이템을 추가해보도록 하자. 먼저, 이 기능을 수행할 새로운 컴포넌트 부터 만들어 보겠다. 다음과 같은 명령어를 실행시켜보자.

```
cd components
vim NewItemForm.jsx
```
NewItemForm.jsx에 다음과 같은 코드를 더해 본다:

```js
// NewItemForm.jsx
import React from 'react';
import AppDispatcher from '../dispatcher/AppDispatcher';

class NewItemForm extends React.Component {

  createItem(e){

    // 페이지를 리로드하지 않겠다.
    e.preventDefault();

    // ID를 만든다
    let id = guid();

     // 입력창으로 부터 값을 가져온다.
    let item_title = React.findDOMNode(this.refs.item_title).value.trim();

    // 입력창의 값을 삭제한다.
    React.findDOMNode(this.refs.item_title).value = '';

    // 여기에서 바로 마술이 일어난다.
     // state를 수정하기위해 이곳에서 action을 부를 필요가 없다.
     // AppDispatcher가 다 해줄 것이다.
    AppDispatcher.dispatch({
      action: 'add-item',
      new_item: {
        id: id,
        name: item_title
      }
    });

  }

  render(){

    return <form onSubmit={ this.createItem.bind(this) }>
        <input type="text" ref="item_title"/>
        <button>Add new item</button>
      </form>;
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export default NewItemForm;
```

이 부분에서 어떤 일이 있는지 짧게 설명해 보겠다. `createItem` 함수가 연결된 텍스트 입력창(input box)이 나타난다. 폼 완료후 submit 버튼을 누르게 되면, `createItem` 함수는 새로운 ID를 만들고, 입력창을 초기화 시키고, ‘add-item’ 액션을 통과하여 `new_item` 데이터는 AppDispatcher로 가게된다.


이제, 데이터를 받을 AppDispatcher를 만들어보겠다. 다음 명령어를 실행해보자:
```
cd ../
mkdir dispatcher
cd dispatcher
vim AppDispatcher.js
```
그리고 다음과 같이 AppDispatcher.js를 작성해준다.

```js
import {Dispatcher} from 'flux';
let AppDispatcher = new Dispatcher();

import ListStore from '../stores/ListStore';

// AppDispatcher에 콜백 등록AppDispatcher.register((payload) => {

  let action = payload.action;
  let new_item = payload.new_item;
  let id = payload.id;

  switch(action) {

    // add-item 액션 시 실행.    case 'add-item':
      ListStore.addItem(new_item);
      break;

     // remove-item 액션 시 실행.
    case 'remove-item':
      ListStore.removeItem(id);
      break;

    default:
      return true;
  }

  // 액션이 모두 완료된 이후 change 이벤트를 emit
  ListStore.emitChange();

  return true;

});

export default AppDispatcher;
```

이부분이 Flux를 이해하기 어려운 부분이다. 하지만 이 간단한 예제를 통해, AppDispatcher 호출 시, 어떤 액션이 실행되고 어떤 데이터가 전달되는지 결정하는 payload의 로직이 어떻게 실행되는지 훨씬 명료하게 이해할 수 있을거라 생각한다.
‘add-item’ 액션은 `ListStore.addItem`을 트리거 시키고, ‘remove-item’ 액션은 `ListStore.removeItem`를 트리거 시킨다. 아직 이 함수들이 우리 스토어에 작성되어 있지 않다. ListStore에 추가해 보자.

다음 명령어를 실행해 보자:

```
cd ../stores
vim ListStore.js
```
다음과 같이 ListStore.js를 다시 작성해보자:

```
// ListStore.js
import {EventEmitter} from 'events';
import _ from 'lodash';

let ListStore = _.extend({}, EventEmitter.prototype, {

  // 기본 데이터
  items: [
    {
      name: 'Item 1',
      id: 0
    },
    {
      name: 'Item 2',
      id: 1
    }
  ],

  // 모든 아이템 가져오기
  getItems: function(){
    return this.items;
  },

  // 아이템 더하기
  addItem: function(new_item){
    this.items.push(new_item);
  },

  // 아이템 삭제하기
  removeItem: function(item_id){

    let items = this.items;

    _.remove(items,(item) => {
      return item_id == item.id;
    });

    this.items = items;

  },

  // change 이벤트 emit
  emitChange: function(){
    this.emit('change');
  },

  // change listener 등록
  addChangeListener: function(callback){
    this.on('change', callback);
  },

  // change listener 삭제
  removeChangeListener: function(callback){
    this.removeListener('change', callback);
  }

});

export default ListStore;
```

우리가 추가한 `addItem`과 `deleteItem` 함수는 `this.items`에서 아이템이 추가하거나 삭제한다. `emitChange`는 AppRoot 컴포넌트의 `_onChange`를 실행 시켜 ListStore에서 새로운 state를 받아 다시 렌더링하도록 한다.

AppRoot 컴포넌트에 ListStore의 새로운 이벤트를 트리거를 받을 수(listen) 있도록 수정해보겠다.

다음 명령어를 실행 시켜 보자:

```
cd ../components
vim AppRoot.jsx
```

다음과 같이 AppRoot 를 수정해 보자:

```
// AppRoot.jsx
import React from 'react';
import ListStore from '../stores/ListStore';
import AppDispatcher from '../dispatcher/AppDispatcher';

// Sub components
import NewItemForm from './NewItemForm';

// Store로 부터 state를 받아옴.
let getListState = () => {
  return {
    items: ListStore.getItems()
  };
}

class AppRoot extends React.Component {

  // Store에서 바꾼 값을 토대로 setState를 해준다.
  _onChange() {
    this.setState(getListState());
  }

  constructor() {
    super();
    this.state = getListState();
  }

  // 스토어(store)에 change listener를 더한다.
  componentDidMount() {
    ListStore.addChangeListener(this._onChange.bind(this));
  }

  // 스로어(store)로부터 change listener를 삭제한다.
  componentWillUnmount() {
    ListStore.removeChangeListener(this._onChange.bind(this));
  }

  removeItem(e){

    let id = e.target.dataset.id;

    AppDispatcher.dispatch({
      action: 'remove-item',
      id: id
    });

  }

  render(){

    let _this = this;
    let items = ListStore.getItems();
    let itemHtml = items.map(( listItem ) => {
      return <li key={ listItem.id }>
          { listItem.name } <button onClick={ _this.removeItem } data-id={ listItem.id }>×</button>
        </li>;
    });

    return <div>
        <ul>
            { itemHtml }
        </ul>
        <NewItemForm />
    </div>;
  }

}

export default AppRoot;
```

새로 추가된 `_onChange` 를 통해 Flux app에서 state가 바뀔 때 마다 불려질 것이다. 또 removeItem 함수에서는 AppDispatcher에 등록된 `remove-item` 액션을 부를 것 이다.

자, 이제 우리의 예상대로 실행되는지 확인해보자. 아래의 명령어를 통해 bundle.js를 다시 빌드해보도록 하겠다.

```
cd ../
gulp
```

gulp가 완료되면 실행 시켜보자:

```sh
http-server
```

이제 <a href="http://localhost:8080">http://localhost:8080</a> 에서 아이템이 추가/삭제가 되는지 확인해 볼 수 있다.

이 튜토리얼을 통해 React와 Flux의 강력한 장점을 이해하는데 도움이 되었기를 바란다. 전체 소스를 원한다면 <a href="https://github.com/tonyspiro/easy-flux-example">이 링크</a>를 통해 Flux 예제 어플리케이션을 다운 받아 볼 수 있다.

질문이나 코멘트, 의견이 있다면 아래 코멘트를 달아주거나 <a href="https://twitter.com/tonyspiro">트위터</a>를 통해 이야기 해주길 바란다.

– Tony Spiro
