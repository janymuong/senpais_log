# Senpai's LOG

<p align="center">
  <img align="center" src="./senpais-log-frontend/public/anime-emot.svg" title="Senpai's LOG" height="200" width="320" style="padding-right:100px;" />
</p>

&ensp;[<kbd> <br> `API` <br> </kbd>](./backend/flaskr/__init__.py)&ensp;
&ensp;[<kbd> <br> Themes <br> </kbd>](./backend/)&ensp;
&ensp;[<kbd> <br> Frontend <br> </kbd>](./senpais-log-frontend/)&ensp;

## Premise

> It’s for the weebs :)  

Everyone Knows Binge-watching Anime is Amazing, Ey?  
And `YOU` know the trouble of juggling multiple anime shows on your watch-list, never-ending recommendations from your otaku buddies, and the persistent feeling of missing out on genuinely epic anime. The Senpai's Log project aims to solve the problem of anime fans, and weebs struggling to manage their anime watch-lists or ToDos effectively. With an ever-expanding universe of anime series and countless recommendations, anime nerds often find it difficult to keep track of what they've watched and what they plan to watch next.  

Basically, this app will help anime enthusiasts, from casual fans to hardcore weebs, stay organized and updated with their favorite anime titles. It will provide a centralized platform to keep track of their watch-list, discover new anime, and possibly receive real-time notifications about episode releases. 


### Built With:  
This is the tech stack used for the project development.
- Front-end: [React.js](https://react.dev/)
- Back-end: [Python](https://www.python.org/) with Flask, and SQLAlchemy
```bash
Python is a programming language that lets you work quickly
and integrate systems more effectively.
```
- Database: [PostgreSQL](https://www.postgresql.org/)
- Deployment: possibly [Amazon Web Services - AWS](https://aws.amazon.com/what-is-cloud-computing/)

Our [back-end](./backend/README.md/#key-pip-dependencies) ninjas wield **Flask** and **SQLAlchemy**. We will leverage the Flask framework, a simple wrapper around Werkzeug, which offers suggestions, but doesn't enforce any dependencies or project layout. Also, a `Flask-SQLAlchemy` setup is a good combination for defining routes for our API endpoints and extending functionality effortlessly. And we could potentially deploy our app to Amazon Web Services which offers a relatively straightforward and seamless CI/CD pipeline via AWS-CLI, Elastic Container Registry, AWS CodeBuild, CodePipeline etc.
<br><br>

---
## API Reference:
> [!Note]  
> In the Senpai's Log application, the web client communicates with the server through various API routes. These routes facilitate the interaction between the user interface and the backend functionality.
Below are sample API endpoints that will serve out responses to HTTP requests/calls. This is a __`CRUD`__ simulated behavior of the endpoints. However, there might be slight variations in the actual implementations.  

- Methods [GET, POST] `/api/anime`:  
    Retrieves a list of anime titles in Senpai's Log db.  
    Adds a new anime title to the database and the user's watch-list.  
- Methods [GET, PATCH] `/api/anime/:id`:  
    Retrieves detailed information about a specific anime by its unique ID.  
    Updates the status of an anime (watched or not watched) and other fields if necessary based on the user's preference.  
- Methods [GET, POST] `/api/users`:  
    Retrieves the user's information.  
    Creates a new user account with provided details.  

### Resource Endpoints
1. check `API` status;
```bash
$ curl -X GET http://127.0.0.1:5000/api/status
{
  "status": "OK",
  "success": true
}

$
```
2. `POST` create a resource;

```bash
$ curl -X POST http://127.0.0.1:5000/anime -H "Content-Type: application/json"
-d '{
      "title":"Attack On Titan",
      "description":"In Paradis Island, the story goes humanity has to survive againsts...",
      "genre":"Military, Shounen",
      "release_date":"2023-08-01",
      "image_url":"https://example.com/image.jpg",
      "watched": true
  }'
# API response data here
$
```

3. `POST` search for a resource; returns a `match` of the `search term` which is a substring in db data - ie a title record;
```bash
$ curl -X POST http://127.0.0.1:5000/search -H "Content-Type: application/json" -d '{"search_in": "titan"}'
{
  "anime_results": [
    {
      "description": "In Paradis Island, the story goes humanity has to survive againsts...",
      "genre": "Military, Shounen",
      "id": 2,
      "image_url": "https://example.com/image.jpg",
      "release_date": "Tue, 01 Aug 2023 00:00:00 GMT",
      "title": "Attack On Titan",
      "watched": true
    }
  ],
  "success": true
}

$
```

4. `PATCH` update a resource;

```bash
$ curl -X PATCH http://127.0.0.1:5000/anime/1 -H "Content-Type: application/json" 
-d '{
      "title":"Shingeki no Kyojin",
      "description":"In Paradis Island, the story goes humanity has to survive againsts...",
      "genre":"Military, Shounen",
      "release_date":"2023-08-01",
      "image_url":"https://example.com/image.jpg",
      "watched": false
    }'
# API response data here
$
```

5. `DELETE` a resource;
```bash
$ curl -X DELETE http://127.0.0.1:5000/anime/3
{
  "deleted_anime": 3,
  "success": true
}

$
```

6. `GET` retrieve (a) resource(s):
```bash
$ curl -X GET http://127.0.0.1:5000/users
{
  "success": true,
  "users": [
    {
      "email": "mu-0xkcd@gmail.com",
      "id": 1,
      "password": "f1help,stuff=null",
      "username": "weeb"
    }
  ]
}

$
```

<br/>
<!-- <br/> -->

---
Developer: [`view-authors-FILE`](./AUTHORS)  
License: [MIT](./LICENSE)

<div align = right> <br><br>
[<kbd> <br> 🔝 <br> </kbd>](#senpais-log)
</div>
