### Overview

![overview](https://github.com/wuzhenquan/thing/blob/master/record-images/overview.png?raw=true)

### Installation

```sh
yarn
```

### Getting Started

**mongoDB**

[Install MongoDB](https://docs.mongodb.com/manual/administration/install-community/) 

```sh
brew services start mongodb-community@4.2
```

**backend** 

```sh
cd backend
yarn start
```

**frontend** 

```sh
cd frontend/react-tsx
yarn start
```

### Deploy

[Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) 

**mongoDB** 

```sh
sudo service mongod start
```

**backend** 

[pm2 quick start](https://pm2.keymetrics.io/docs/usage/quick-start/) 

```sh
pm2 start npm -- run production
```

**frontend** 

```sh
yarn run build
node server.js
```

### Association

- [📋project trello](https://trello.com/b/8AHQFOhN/)
- [📝records](https://github.com/wuzhenquan/thing/tree/master/record)

### Reference

- [react-bulma](https://github.com/kulakowka/react-bulma)
- [bulma-extensions](https://github.com/wikiki/bulma-extensions)

- Style
  - [JavaScript Style](https://github.com/airbnb/javascript)(try my best 🙊)
  - [JSX Style](https://github.com/airbnb/javascript/tree/master/react#ismounted)(try my best 🙊)
- Structure
  - [How to Structure Your React Project](https://daveceddia.com/react-project-structure/)
  - [Structure your React-Redux project for scalability and maintainability](https://levelup.gitconnected.com/structure-your-react-redux-project-for-scalability-and-maintainability-618ad82e32b7)
      - container components (mostly) do not contain any React code.
  - [Fractal — A react app structure for infinite scale](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af)
