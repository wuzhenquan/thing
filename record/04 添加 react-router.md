引入 react router 其实很简单，可以看[官网的示例代码](https://reacttraining.com/react-router/web/example/basic)
在写的过程中比较让想得比较多的是怎么规划路由。
首先这个路由组件叫 Routes.jsx , feature 有

- 接受一个 `isAuthenticated` 用来判断用户是否登录。

- 进入首页时，如果已经登录，跳转到工作台，未登录跳转到 `/public` 路由。

  ```jsx
  <Route exact path="/" render={
  	props =>
  		isAuthenticated
          ?
          <div>workbench</div>
          :
          <Redirect to={{pathname: '/public', state: { from: props.location}}}/>
  } />
  ```

- 进入工作台的其他路由时，如果已经登录跳转到工作台对应路由，未登录跳转到登录页面。

  ```jsx
  <Route path="/workbench/:name" render={
  	props =>
  		isAuthenticated
          ?
          <div>workbench</div>
          :
          <Redirect to={{pathname: '/signin', state: { from: props.location}}}/>
  } />
  ```

- 进入未定义的路由时，显示 404 页面。

简单标记一下 react router 比较常用 API

- [`<Link`](https://reacttraining.com/react-router/web/api/Link)

- [`<Route>`](https://reacttraining.com/react-router/web/api/Route)
  - [`path`](https://reacttraining.com/react-router/web/api/Route/path-string)
  - 注意属性 [`component`](https://reacttraining.com/react-router/web/api/Route/component) 和 [`render`](https://reacttraining.com/react-router/web/api/Route/render-func) 和 [`children`](https://reacttraining.com/react-router/web/api/Route/children-func) 的区别。
  - [`exact`](https://reacttraining.com/react-router/web/api/Route/exact-bool)
- [`Redirect`](https://reacttraining.com/react-router/web/api/Redirect)

参考链接：

- [react router 文档](https://reacttraining.com/react-router/web/guides/philosophy)



