### 遇到的问题

> React Hook useEffect has a missing dependency: 'getTodos'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

```jsx
const Component = () => {
  /*...*/
  // keep function reference
  const getTodos = useCallback(() => {
    fetch('/api/businesses/').then(...)
  }, [/* additional dependencies */]) 
  useEffect(() => {
    getTodos();
  }, []);
  /*...*/
}
```

答案参考：

[Is it safe to omit functions from the list of dependencies?](https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies)

[How to fix missing dependency warning when using useEffect React Hook?](https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook) 

It's telling you that hook depends on function `getTodos`, so you should pass it as dependency.

解决办法：

```jsx
const Component = () => {
  const { getData } = props
  /*...*/
  // keep function reference
  const fetchBusinesses = useCallback(() => {
    getData()
  }, [getData]) 
  useEffect(() => {
    fetchBusinesses();
  }, [fetchBusinesses]);
  /*...*/
}
// or
const Component = props => {
  const { getData } = props
  useEffect(getData, [])
}                                     
```