# Project 3 Client: MMO & Co.
This app allows you to create, view, update, like, dislike and delete blog posts. 
You can also view and comment blog posts.


## User Stories 
* As a user, I want to be able to create an account
* As a user, I want to be able to log into my account
* As a user, I want to be able to log out of my account
* As a user, I want to be able to create/add a blog.
* As a user, I want to be able to update a blog.
* As a user, I want to be able to delete a blog.
* As a user, I want to be able to create/add a comment
* As a user, I want to be able to update a comment
* As a user, I want to be able to delete a comment
* As a user, I want to be able to like a blog
* As a user, I want to be able to dislike a blog

# Project 3 API: MMO & Co.

The back-end API for Blog App: MMO & Co. using an `express` auth template. This API is built off authentication and middlware boilerplates. This API along with AXIOS is used to service the client for MMO & Co.. MMO & Co. is a blogging app that allows users to create and log stories and share them with other users.

## Structure

Dependencies are stored in [`package.json`](package.json)
The express `app` is housed in `server.js`. Routefiles are registered within this file, additional middleware must be added to this file as well.

The `app` directory contains models and route files. Models are used to structure objects in Mongoose. Route files are used as controllers that handles the RESTful routes for the application.

Within `app/models` is seed.js which will add initial database objects. Objects will be cleared when the script for seed.js is run, so only use it to reset the DB.

Within `app/lib` are files used to service token authentication, error handling, custom classes for errors and methods to catch errors and set response status codes. The error messages and handlers can be changed within these files.

## Routes

### User Routes

#### Authentication

| Verb   | URI Pattern         | Controller#Action |
| ------ | ------------------- | ----------------- |
| POST   | `/sign-up`          | `users#signup`    |
| POST   | `/sign-in`          | `users#signin`    |
| PATCH  | `/change-password/` | `users#changepw`  |
| DELETE | `/sign-out/`        | `users#signout`   |

#### POST /sign-up

Request:

```
POST http://localhost:8000/sign-up
{
    "credentials": {
      "email": "an@example.email",
      "username": "User-man",
      "password": "an example password",
      "password_confirmation": "an example password"
    }
}
```

Response:

```
HTTP/1.1 201 Created
{
  "user": {
    "id": 1,
    "email": "an@example.email"
  }
}
```

#### POST /sign-in

Request:

```
  data {
    "credentials": {
      "email": "an@example.email",
      "password": "an example password"
    }
  }
```

Response:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "user": {
    "id": 1,
    "email": "an@example.email",
    "token": "33ad6372f795694b333ec5f329ebeaaa"
  }
}
```

#### PATCH /change-password/

Request:

```
PATCH http://localhost:8000/

--header "Authorization: Bearer $TOKEN"

{
    "passwords": {
        "old": "an example password",
        "new": "super sekrit"
    }
}
```

Response:

```
HTTP/1.1 204 No Content
```

#### DELETE /sign-out/

Request:

```
DELETE http://localhost:8000/sign-out/

--header "Authorization: Bearer $TOKEN"

```

Response:

```
HTTP/1.1 204 No Content
```

### Blog Routes

| Verb   | URI Pattern | Controller#Action |
| ------ | ----------- | ----------------- |
| GET    | `/blogs/`    | `blogs#index`      |
| GET    | `/blogs/:id` | `blogs#show`       |
| POST   | `/blogs/`    | `blogs#create`     |
| PATCH  | `/blogs/:id` | `blogs#update`     |
| DELETE | `/blogs/:id` | `blogs#delete`     |

#### GET / INDEX

Request:

```
GET http://localhost:8000/blogs
```

Response:

```
HTTP/1.1 200 OK
{
    "blog": {
        "title": "String",
        "body": "String",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "comment": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### GET / SHOW

Request:

```
GET http://localhost:8000/blogs/<blog_id>
```

```
HTTP/1.1 200 OK
{
    "blog": {
        "title": "String",
        "body": "String",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "comment": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### POST / CREATE

Request:

```
POST http://localhost:8000/blogs
```

Response:

```
HTTP/1.1 201 Created

--header "Authorization: Bearer $TOKEN"
{
    "blog": {
        "title": "String",
        "body": "String",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "comment": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

#### PATCH / UPDATE

Request:

```
PATCH http://localhost:8000/blogs/<blog_id>

--header "Authorization: Bearer $TOKEN"
{
    "blog": {
        "title": "String",
        "body": "String",
        "owner": "62e3c56c896160da1e143b8e",
        "_id": "62e3cb909228d164d8b697e2",
        "comment": [],
        "createdAt": "2022-07-29T11:59:12.599Z",
        "updatedAt": "2022-07-29T11:59:12.599Z",
        "__v": 0,
        "id": "62e3cb909228d164d8b697e2"
    }
}
```

Response:

```
HTTP/1.1 204 No Content
```

#### DELETE / DESTROY

Request:

```
DELETE http://localhost:8000/blogs/<blog_id>

--header "Authorization: Bearer $TOKEN"
```

Response:

```
HTTP/1.1 204 No Content
```

### Comment Routes

| Verb   | URI Pattern                   | Controller#Action |
| ------ | ----------------------------- | ----------------- |
| GET    | `/comments/:blogId`            | `comments#index`   |
| GET    | `/comments/:blogId`            | `comments#show`    |
| POST   | `/comments/:blogId`            | `comments#create`  |
| PATCH  | `/comments/:blogId/:commentId` | `comments#update`  |
| DELETE | `/comments/:blogId/:commentId` | `comments#delete`  |

#### POST / CREATE

Request:

```
POST http://localhost:8000/comments/<blog_id>

{
    "comment": {
        "body": String,
        "author": ID,
    }
}

```

Response:

```
HTTP/1.1 201 Created
```

#### PATCH / UPDATE

Request:

```
PATCH http://localhost:8000/comments/<blog_id>/<comment_id>

{
    "comment": {
        "body": String,
        "author": ID,
    }
}

--header "Authorization: Bearer $TOKEN"
```

Response:

```
HTTP/1.1 204 No Content
```

#### DELETE / DESTROY

Request:

```
DELETE http://localhost:8000/comments/<blog_id>/<comment_id>

--header "Authorization: Bearer $TOKEN"
```

Response:

```
HTTP/1.1 204 No Content
```


## Data/ Resources used
The blog data will be seeded.

## Entity Relationship Diagram (ERD)
![](/Planning_Docs/ERD_2.png)

## Wireframes
![](/Planning_Docs/project-3-wireframe.jpg)

## Collaborator Roles
- Kyle Moreno: Back End
- Lyndonna Munro: Front End 
- Zene Orr: Team Manager