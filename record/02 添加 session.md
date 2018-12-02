[koa-session](https://www.npmjs.com/package/koa-session)

按照官网文档的示例，给 koa 添加 session 非常简单

```js
const Koa = require('koa')
const session = require('koa-session')
const session = require('./sessionStore.js')
const app = new Koa()
const CONFIG = {
    key: 'koa:sess',
    maxAge: 86400000,
    overwrite: true,
    httpOnly: true,
    signed: true,
    rolling: false,
}
app.keys = ['some secret key']
app.use(session(CONFIG, app))
app.use(ctx => {
     // 获取 session 对象
    const session = ctx.session
     // 给 session 赋值
    session.userInfo = { name:'123' }
})
```

但是我将 session 存在数据库里，因为文档没有说清，对应的示例也没有，在网上搜索了好一阵才弄明白，现在简要说一下怎么将 session 存在 mongo 数据库里

- 给 CONFIG 添加 store 属性

- 文档里说给 store 属性的键值是一个含有 get，set，destroy 的方法就好了

  - 在获取 session 的时候是这样调用的：`get(key, maxAge, { rolling })`
  - 在添加或者修改 session 的时候是这样调用的：`set(key, sess, maxAge, { rolling, changed })`
  - 在删除 session 的时候是这样调用的：`destroy(key)`

- 于是我们可以创建一个类 `sessionStore`，对应的 `CONFIG = { store: new sessionStore() }`

- ```js  
  const schema = {
      _id: String,
      data: Object,
      updatedAt: {
          default: new Date(),
          expires: 86400, // 1 day
          type: Date
      }
  };
  const mongoose = require('mongoose');
  
  class sessionStore {
      constructor({
          collection = 'sessions',
          connection = mongoose,
          expires = 86400,
          name = 'Session'
      } = {}) {
          const updatedAt = { ...schema.updatedAt, expires };
          const { Schema } = connection;
          this.session = connection.model(name, new Schema({ ...schema, updatedAt }), collection);
      }
  
      async destroy(id) {
          const { session } = this;
          return session.remove({ _id: id });
      }
  
      async get(id) {
          const { session } = this;
          const { data } = await session.findById(id) || {};
          return data;
      }
  
      async set(id, data, maxAge, { changed, rolling }) {
          if (changed || rolling) {
              const { session } = this;
              const record = { _id: id, data, updatedAt: new Date() };
              await session.findByIdAndUpdate(id, record, { upsert: true, safe: true });
          }
          return data;
      }
  
      static create(opts) {
          return new sessionStore(opts);
      }
  }
  
  module.exports = sessionStore;
  ```

- 然后我们就可以像之前那样愉快地给 context 获取、添加、删除 session 了。
  ```js
  app.use(ctx=>{
      const session = ctx.session // 获取
      ctx.session.user = {name: '123'} // 添加
      ctx.session = null //删除
  })
  ```

参考链接：

[koa-session-mongoose](https://gitlab.com/wondermonger/koa-session-mongoose/tree/master)

[koa-session2使用](https://blog.csdn.net/qq_33203555/article/details/81346420)

[koa-mysql-session](https://github.com/tb01923/koa-mysql-session/blob/master/index.js)