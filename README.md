todo-server
===========

todo REST server; uses mongodb for persistence

## setup

make sure you have [mongodb installed](http://docs.mongodb.org/manual/installation/) and `mongod` running, then

    npm install

## start it up

    npm start

## routes

### GET `/todos`

Returns all todos.

### POST `/todos/create`

Post JSON for a new todo. If succesful, returns `201 Created` response code and url of newly created resource in body (e.g. `/todos/3`)

### GET `/todos/<id>`

Returns todo at index `<id>` if it exists

### PATCH `/todos/<id>`

Update specified fields of `/todos/<id>`. If no resource is found at that url, returns `404 Not Found`; otherwise, `200 OK`

### DELETE `/todos/<id>`

Delete todo at `/todos/<id>`. If no resource is found, returns `404 Not Found`; otherwise, `200 OK`
