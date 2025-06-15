## Overview
This server is built on top of the [jsonplaceholder.typicode.com](jsonplaceholder.typicode.com) for testing different clients with fake data. The idea is to provide ability for mutating the data as a real API would be used for.
## Installation
Install the dependencies and devDependencies and start the server.
```js
npm i
npm start
```
This will serve on [https://localhost:5000](https://localhost:5000)
## Endpoints
All endpoints consume or mutate data from local files retrieved from [jsonplaceholder.typicode.com](jsonplaceholder.typicode.com).
* GET / - Welcome message
* GET [/users](https://jsonplaceholder.typicode.com/users)
* GET [/users:/id](https://jsonplaceholder.typicode.com/users/1)
* PUT [/users:/id](https://jsonplaceholder.typicode.com/users/1) - will edit file in data/users.json
* GET [/posts?userId=id](https://jsonplaceholder.typicode.com/posts?userId=1) - will get user's post by given id from data/posts.json
* DELETE [/posts/:id](https://jsonplaceholder.typicode.com/) - remove a post by id from data/posts.json
* PUT [/posts/:id](https://jsonplaceholder.typicode.com/) - update a post by id in data/posts.json
* GET [/todos](https://jsonplaceholder.typicode.com/todos) - get todos list from data/todos.json
* PUT [/todos/:id](https://jsonplaceholder.typicode.com/todos) - update a todo by id in data/todos.json
* GET [/reset](https://localhost:5000/reset) - this route will download users, posts and todos from [jsonplaceholder.typicode.com](jsonplaceholder.typicode.com) and store the data in the local files
