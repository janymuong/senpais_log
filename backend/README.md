# Senpai's Log: API Backend
> **Note**  
> This directory features the backend/`API` part of the application.  
> This is a **fulls-tack** web app backend. Read through the backend documentation to install its dependencies.

## Setting up the Backend

### Install Dependencies

1. **Python 3.11+** and **PIP**- Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

2. **Working In a Virtual Environment** - It's recommended to leverage a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virual environment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

If you have pip virtualenv already installed; create a siloed python environment. Run in your backend directory:

```bash
python -m virtualenv venv
```

To activate virtual venv on ***Windows*** run:

```bash
venv\Scripts\activate
```

---
`NOTE`: You can create the virtual environment via make, a CLI utility. 
Create the virtaul environment like below, and activate it: this is a directive in [Makefile](./Makefile) 
```bash
cd backend
make setup
splog\Scripts\activate
```

The equivalent command on ***UNIX-based operating systems*** run:

```bash
source splog/bin/activate
```


- install the dependencies via Makefile: `make install`

3. **PIP Dependencies** - Once your virtual environment is setup and running, install the required dependencies by navigating to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

#### Key Pip Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use to handle the lightweight `PostgreSQL` database. We'll primarily work in `__init__.py`and can reference `models.py`.

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross-origin requests from our frontend server.

### Set up the Database

With `Postgres` running, create a `splog` database:

```bash
createdb splog
```

The analogous command for Windows environment:
```bash
# cmd login to postgres
psql -U postgres
```

```bash
create database splog;
```


### Run the Server

From within the root backend directory and with activated virtual environment...

To run the server, execute:

```bash
export FLASK_APP=flaskr && export FLASK_DEBUG=true && flask run --reload
```

>the `--reload` flag will detect file changes and restart the server automatically.

## Sample Implementations
> **Note**  
> For each endpoint, response data is expected from it, and to be returned in `json`.

1. Use Flask-CORS to enable cross-domain requests and set response headers.
2. Create an endpoint to handle `GET` requests for anime titles, including pagination (every 10 titles). This endpoint should return a list of titles, number of total titles.
3. Create an endpoint to handle `GET` requests for all available titles, anime, users.
4. Create an endpoint to `DELETE` a anime using a anime `ID`.
5. Create an endpoint to `POST` a new anime, titles etc which will require the descriptions and other attributes etc.
6. Create a `POST` endpoint to get anime based on a *`search term`*. It should return any anime for a match of the search term is a substring of the anime.
7. Create a `POST` endpoint to get anime for recommendations. This endpoint should  return a random anime for a user.
8. Create error handlers for all expected errors including 400, 404, 422, and 500.


## Documenting API Endpoints

Provided detailed documentation and reference of the API endpoints including the URL, request parameters, and the response body are in the API documentation reference README markdown file in the root directory of the Senpai's Log API app.

> View [Senpai's Log API Documentation and API Reference](../README.md) for sample requests and responses and endpoints behavior.