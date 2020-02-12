---
date: 2016-07-11
tags: 
  - react
---

# React/Redux를 위한 더 나은 파일 구조

[A Better File Structure For React/Redux Applications](http://marmelab.com/blog/2015/12/17/react-directory-structure.html) 를 번역한 글입니다. 
매끄럽지 못한 번역 양해 부탁드리며, 오역이나 다른 의견이 있으시다면 편히 댓글 달아주세요.

---

대부분의 React/Redux 예제들은 클라이언트 사이드나, 유니버셜이든 매우 간단한 모습이다. 대부분 action, component, container, reducer끼리 모아놓은 모습이다. 다음과 같은 구조를 많이 봤을 것이다.

```
actions/
    CommandActions.js
    UserActions.js
components/
    Header.js
    Sidebar.js
    Command.js
    CommandList.js
    CommandItem.js
    CommandHelper.js
    User.js
    UserProfile.js
    UserAvatar.js
containers/
    App.js
    Command.js
    User.js
reducers/
    index.js
    command.js
    user.js
routes.js
```

[Redux Book](http://redux.js.org/docs/advanced/ExampleRedditAPI.html)에서도 이와 같은 모습을 보이고 있고  Redux boilerplate 인 [3ree](https://github.com/GordyD/3ree)와 [react-redux-universal-hot-example](https://github.com/erikras/react-redux-universal-hot-example) 역시 같은 구조를 가지고 있다.

좋은 방법이다. 하지만 새로운 도메인에 대한 action과 component 그리고 reducer가 추가될 땐 어떨까? 그 예로,상품의 카달로그를 다루기 위한 파일들을 다음과 같이 각각의 경로에 추가해 보자.

```
actions/
    CommandActions.js
    ProductActions.js   <= 여기
    UserActions.js
components/
    Header.js
    Sidebar.js
    Command.js
    CommandList.js
    CommandItem.js
    CommandHelper.js
    Product.js          <= 여기
    ProductList.js      <= 여기
    ProductItem.js      <= 여기
    ProductImage.js     <= 여기
    User.js
    UserProfile.js
    UserAvatar.js
containers/
    App.js
    Command.js
    Product.js          <= 여기
    User.js
reducers/
    index.js
    foo.js
    bar.js
    product.js          <= 여기
routes.js
```
위와 같이 될 것이다. 지금으로부터 두 달 후를 생각해보자. `components/` 경로에는 열댓개의 파일들이 있을 것이고 한 기능에 대해 작업할때마다 각각 다른 4경로에 있는 4개의 파일들을 열어야 한다.

위와 같은 방법 대신, 파일 구조를 도메인 기준으로 하면 어떨까? 액션, 컴포넌트, 리듀스를 분리시키기 위해 다음과 같이 파일명에 접미사를 쓸 수도 있다.

```
app/
    Header.js
    Sidebar.js
    App.js
    reducers.js
    routes.js
command/
    Command.js
    CommandContainer.js
    CommandActions.js
    CommandList.js
    CommandItem.js
    CommandHelper.js
    commandReducer.js
product/
    Product.js
    ProductContainer.js
    ProductActions.js
    ProductList.js
    ProductItem.js
    ProductImage.js
    productReducer.js
user/
    User.js
    UserContainer.js
    UserActions.js
    UserProfile.js
    UserAvatar.js
    userReducer.js
```

더 나아가, 컨테이너와 관련된 컴포넌트를 합치면 좀 더 보기 편해진다.

Redux에서는 상태값(state) 를 관리하는 *컨테이너*와 상태값이 없는(stateless) *컴포넌트*를 구분한다. 그리고 대부분의 튜토리얼에서는 다음과 같이 두개의 파일을 나눈다.

```js
// in Product.js
export default function Product({ name, description }) {
    return <div>
        <h1>{ name }</h1>
        <div className="description">
            {description}
        </div>
    </div>
}

// in ProductContainer.js
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProductActions from './ProductActions';
import Product from './Product';

function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ProductActions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
```

컴포넌트와 컨테이너를 구분하는 이유는 컴포넌트를 (Redux를 전혀 사용하지 않고) 유닛 테스트를 용이하게 하기 위해서다. 하지만 대부분의 경우, 컴포넌트는 컨테이너 밖에서 사용되지 않는다.

ES6를 이용해보자. ES6에서는 한개 이상의 element에게 `export`를 허용한다. 그러므로 두개의 파일을 하나로 합치고 `export default` 는 컨테이너로 `export product`는 컴포넌트로 나타낼 수 있다.

```js
// in Product.js
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ProductActions from './ProductActions';

// component part
export function Product({ name, description }) {
    return <div>
        <h1>{ name }</h1>
        <div className="description">
            {description}
        </div>
    </div>
}

// container part
function mapStateToProps(state) {
    return {...state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        ...ProductActions,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
```

컴포넌트 유닛 테스트에서는 간단히 `import { Product }  from ‘./Product.js’` 로 할 수 있다. 이제 각 경로마다 파일이 한개씩 줄어들었다.

```
app/
    Header.js
    Sidebar.js
    App.js
    reducers.js
    routes.js
command/
    Command.js         // component & container
    CommandActions.js
    CommandList.js
    CommandItem.js
    CommandHelper.js
    commandReducer.js
product/
    Product.js         // component & container
    ProductActions.js
    ProductList.js
    ProductItem.js
    ProductImage.js
    productReducer.js
user/
    User.js            // component & container
    UserActions.js
    UserProfile.js
    UserAvatar.js
    userReducer.js
```

계속해서 테스트에 대해 이야기 해보자. 대체로 테스트 파일들은 `test/` 경로에 있고, 런타임 코드에서 멀리 떨어져 있다.

```
src/
    app/
        Header.js
        Sidebar.js
        App.js
        reducers.js
        routes.js
    command/
        Command.js
        CommandActions.js
        CommandList.js
        CommandItem.js
        CommandHelper.js
        commandReducer.js
    product/
        Product.js
        ProductActions.js
        ProductList.js
        ProductItem.js
        ProductImage.js
        productReducer.js
    user/
        User.js
        UserActions.js
        UserProfile.js
        UserAvatar.js
        userReducer.js
test/
    app/
        Header.js
        Sidebar.js
        App.js
        reducers.js
        routes.js
    command/
        Command.js
        CommandActions.js
        CommandList.js
        CommandItem.js
        CommandHelper.js
        commandReducer.js
    product/
        Product.js
        ProductActions.js
        ProductList.js
        ProductItem.js
        ProductImage.js
        productReducer.js
    user/
        User.js
        UserActions.js
        UserProfile.js
        UserAvatar.js
        userReducer.js
```

컴포넌트 테스트를 빠뜨린 것들을 찾기 어렵고, 도메인이 추가됨에 따라 파일 구조를 찾기 어려워 짐을 알 수 있다.
모든 테스트 파일에 `-spec.js` 라는 접미사를 써서 같은 경로로 옮겨보자.

이로써 테스트까지 포함한 모든 스크립트가 연관된 context별로 각각의 경로로 그룹지어졌다.

```
src/
    app/
        Header.js
        Header-spec.js
        Sidebar.js
        Sidebar-spec.js
        App.js
        App-spec.js
        reducers.js
        reducers-spec.js
        routes.js
        routes-spec.js
    command/
        Command.js
        Commands-spec.js
        CommandActions.js
        CommandActions-spec.js
        CommandList.js
        CommandList-spec.js
        CommandItem.js
        CommandItem-spec.js
        CommandHelper.js
        CommandHelper-spec.js
        commandReducer.js
        commandReducer-spec.js
    product/
        Product.js
        Product-spec.js
        ProductActions.js
        ProductActions-spec.js
        ProductList.js
        ProductList-spec.js
        ProductItem.js
        ProductItem-spec.js
        ProductImage.js
        ProductImage-spec.js
        productReducer.js
        productReducer-spec.js
    user/
        User.js
        User-spec.js
        UserActions.js
        UserActions-spec.js
        UserProfile.js
        UserProfile-spec.js
        UserAvatar.js
        UserAvatar-spec.js
        userReducer.js
        userReducer-spec.js
```

Jest 혹은 Mocha와 같은 테스트 프레임워크 설정 역시 아주 간단하다. 다음의 경로를 테스트 하면 된다.
`./src/**/*-spec.js`

이러한 구조 역시 프로젝트 크기에 따라 함께 커진다. 이 후에, 재활용성이 높은 컴포넌트가 다른 프로젝트에서도 쓰이기 위해 독립된 다른 리파지토리로 분리될 때, 이 구조에서 리팩토링은 아주 간편할 것이다. 강력 추천한다!


추가. 레딧 커뮤니티에서도 이 포스트에 대해서 이야기 되고 있다. 이에 대한 이야기는 다음 링크에서 계속 되고 있다.

[https://www.reddit.com/r/reactjs/comments/47mwdd/a_better_file_structure_for_reactredux/](https://www.reddit.com/r/reactjs/comments/47mwdd/a_better_file_structure_for_reactredux/)
