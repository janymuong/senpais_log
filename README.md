# Senpai's Log

<p align="left">
  <img align="center" src="./senpais-log-frontend/public/anime-emot.svg" title="Senpai's LOG" height="200" width="320" style="padding-right:100px;" />
  <span><i>It’s for the weebs :)</i></span>
</p>


## Premise
Everyone Knows Binge-watching Anime is Amazing, Ey?  
And `YOU` know the trouble of juggling multiple anime shows on your watch-list, never-ending recommendations from your otaku buddies, and the persistent feeling of missing out on genuinely epic anime. The Senpai's Log project aims to solve the problem of anime fans, and weebs struggling to manage their anime watch-lists or ToDos effectively. With an ever-expanding universe of anime series and countless recommendations, anime nerds often find it difficult to keep track of what they've watched and what they plan to watch next.  

Basically, this app will help anime enthusiasts, from casual fans to hardcore weebs, stay organized and updated with their favorite anime titles. It will provide a centralized platform to keep track of their watch-list, discover new anime, and possibly receive real-time notifications about episode releases. 


## Built with:  
This is the tech stack used for the project development.
- Front-end: [React.js](https://react.dev/)
- Back-end: [Python](https://www.python.org/) with Flask, and SQLAlchemy
```bash
Python is a programming language that lets you work quickly and integrate systems more effectively.
```
- Database: [PostgreSQL](https://www.postgresql.org/)
- Deployment: possibly [Amazon Web Services - AWS](https://aws.amazon.com/what-is-cloud-computing/?gclid=Cj0KCQiA1rSsBhDHARIsANB4EJYm0qS8ZQP6ZRYweY4War6FbE67JEP8BUaZgpEACOL-fjOZDxx9qacaAtdmEALw_wcB&trk=2d3e6bee-b4a1-42e0-8600-6f2bb4fcb10c&sc_channel=ps&ef_id=Cj0KCQiA1rSsBhDHARIsANB4EJYm0qS8ZQP6ZRYweY4War6FbE67JEP8BUaZgpEACOL-fjOZDxx9qacaAtdmEALw_wcB:G:s&s_kwcid=AL!4422!3!645125273264!e!!g!!amazon%20web%20services!19574556887!145779846872)

Our [back-end](./backend/README.md/#key-pip-dependencies) ninjas wield **Flask** and **SQLAlchemy**. We will leverage the Flask framework, a simple wrapper around Werkzeug, which offers suggestions, but doesn't enforce any dependencies or project layout. Also, a `Flask-SQLAlchemy` setup is a good combination for defining routes for our API endpoints and extending functionality effortlessly. And we could potentially deploy our app to Amazon Web Services which offers a relatively straightforward and seamless CI/CD pipeline via AWS-CLI, Elastic Container Registry, AWS CodeBuild, CodePipeline etc.

---
## API Reference:
> **Note**  
> In the Senpai's Log application, the web client communicates with the web server through various API routes. These routes facilitate the interaction between the user interface and the backend functionality.
Below are sample API endpoints that will serve out responses to HTTP API requests/calls. This is a CRUD simulated behavior of the endpoints. However, there might be slight variations in the actual implementations.  

- Methods [GET, POST] `/api/anime`:
    Retrieves a list of anime titles in the user's watch-logs.
    Adds a new anime title to the user's watch-list.
- Methods [GET, PUT] `/api/anime/:id`:
    Retrieves detailed information about a specific anime by its unique ID.
    Updates the status of an anime (watched or not watched) based on the user's preference.
- Methods [GET, POST] `/api/user`:
    Retrieves the user's information based on their session ID.
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
$ curl -X POST http://127.0.0.1:5000/anime -H "Content-Type: application/json" -d '{"title":"Shingeki no Kyojin", "description":"Paradis Island, the story goes humanity has to survive againsts...", "genre":"Miliatry", "release_date":"2023-08-01", "image_url":"https://example.com/image.jpg", "watched": true}'
```

3. `POST` search for a resource; returns a match of the search term;
```bash
merou@HP MINGW64 ~
$ curl -X POST http://127.0.0.1:5000/search -H "Content-Type: application/json" -d '{"search_in": "kyojin"}'
{
  "anime_results": [
    {
      "description": "Paradis Island, the story goes humanity has to survive againsts...",
      "genre": "Miliatry",
      "id": 2,
      "image_url": "https://example.com/image.jpg",
      "release_date": "Tue, 01 Aug 2023 00:00:00 GMT",
      "title": "Shingeki no Kyojin",
      "watched": true
    },
  "success": true
}

merou@HP MINGW64 ~
```

4. `DELETE` a resource;
```bash
merou@HP MINGW64 ~
$ curl -X DELETE http://127.0.0.1:5000/anime/3
{
  "deleted_anime": 3,
  "success": true
}

merou@HP MINGW64 ~
```

5. `GET` retrieve (a) resource(s):
```bash
$ curl -X GET http://127.0.0.1:5000/users
{
  "success": true,
  "users": [
    {
      "email": "xkcd@gmail.com",
      "id": 2,
      "password": "passwotwey",
      "username": "sp-log"
    },
    {
      "email": "mu-o@gmail.com",
      "id": 3,
      "password": "passwotwe7",
      "username": "SU"
    },
    {
      "email": "mu-0xkcd@gmail.com",
      "id": 1,
      "password": "f1help,stuff=null",
      "username": "World Wide Weeb"
    }
  ]
}
```
---
Created By: [Jany Muong](./AUTHORS) [MIT License](./LICENSE)
