必须安装 16.6.1 以上的版本

## 基本用法

### create context

```react
// CommonContext.js
import React from 'react'
export const common = {
    isSignedIn: false
}

export const CommonContext = React.createContext(common)
```

### Context.Provider

将创建好的 context 包在子组件上，并传入 value

It’ll most likely be an object containing your data and any actions you want to be able to perform on the data.

The context’s Provider is just a conduit. It doesn’t retain any data. But that doesn’t stop you from making your *own* wrapper to hold the data.

```react
// App.js
import { CommonContext } from './CommonContext'

class App extends Component {
    render() {
        return (
          <CommonContext.Provider value={{ isSignedIn: this.state.isSignedIn }}>
            <div>
              {子组件}
            </div>
          </CommonContext.Provider>
        );
    }
}
```

### Class.contextType

使用 context 的数据

a little bit like React-Redux's `connect` function

```react
// component.jsx
import { CommonContext } from '../../CommonContext.js'
class component extends Component {
    render() {
        console.log(this.context,'this.context')
        return null 
    }
}
component.contextType  = CommonContext
export default BtnSignOut
```

### Context.Consumer



```react
<MyContext.Consumer>
  {value => /* render something based on the context value */}
</MyContext.Consumer>
```



## API

- React.Provider: 

  ```react 
  const MyContext = React.createContext(defaultValueObj);
  ```

- Context.Provider : 

  ```react
  class App extends React.Component {
    render() {
      return (
  			<MyContext.Provider value={/* some value */}>
            <Content />
        </MyContext.Provider>
      );
    }
  }
  ```

- ~~Class.contextType: `MyClass.contextType = MyContext`~~(不能同时使用多个 contexts)

- Context.Consumer: 

  ```react
  function Content(){
    return (
      <MyContext.Consumer>
        {value => /* render something based on the context value */}
      </MyContext.Consumer>
    )
  }
  ```



## 问题

### 多个 context 如何使用

> React will find the closest theme Provider above and use its value.

<https://reactjs.org/docs/context.html#consuming-multiple-contexts>

<https://stackoverflow.com/questions/53346462/react-multiple-contexts>

1. 最外层包多个 [Context.Provider](<https://reactjs.org/docs/context.html#contextprovider>)
2. 需要使用到多个 context 的组件外面包上多个 [Context.Consumer](<https://reactjs.org/docs/context.html#contextconsumer>)

关于第二点，更好的办法还是用 [HOC](<https://reactjs.org/docs/higher-order-components.html>)

```react
export const withThemeContext = Component => (
  props => (
    <ThemeContext.Consumer>
      {context => <Component themeContext={context} {...props} />}
    </ThemeContext.Consumer>
  )
)

const YourComponent = ({ themeContext, ...props }) => {
  themeContext.someFunction()
  return (<div>Hi Mom!</div>)
}

export default withThemeContext(YourComponent)
```

### Updating Context from a Nested Component

<https://reactjs.org/docs/context.html#updating-context-from-a-nested-component>

## Caveats

<https://reactjs.org/docs/context.html#caveats>