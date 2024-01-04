# SP-LOG: `API` Backend
> **Note**  
> This directory features the __backend/API__ part of the __full-stack__ web app.  
> Read through this documentation to install dependencies.

## Set-Up:

### Install Dependencies

1. **`Python 3.11+`** and **`PIP`** - follow instructions to install the latest version of Python for your platform in this [Python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

2. **Working In a Virtual Environment** - it is recommended to leverage a virtual environment whenever using __Python__ for projects. This keeps your dependencies for each project separate and organized. Instructions for setting up a virtual environment for your platform can be found in this [Python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)


`NOTE`: You can create the virtual environment via __GNU__ [`make`](https://www.gnu.org/software/make/), a __commandline__ language. For context, __GNU Make__ is a tool which controls the generation of executables and other non-source files of a program from the program's source files - in this case, we use it to create a virtual environment.  
Create a siloed **Python** environment, and activate it - using a a rule or directive in [Makefile](./Makefile). This will use your `pip virtualenv` or `pip venv` depending on which one is installed on your local machine.
```bash
# DO in a terminal/shell;
cd backend
make setup
# activate virtual environment;
source splog/bin/activate # GNU/Linux Bash
source splog/Scripts/activate # GitBash Windows
```

3. **Install `PIP` Dependencies** - once your virtual environment is setup/activated and running, install the required dependencies in `/backend` directory. This will use the dependencies listed out in the [`requirements.tx`](./requirements.txt) file:

```bash
# expands to 'pip install -r requirements.txt'
make install
```

#### Key **PIP** Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use to handle the lightweight `PostgreSQL` database. The API is in [`flaskr/__init__.py`](./flaskr/__init__.py) and it  references [`models.py`](./models.py).

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross-origin requests from our frontend server, which will communicate with the backend via HTTP.


### PostgreSQL

With `Postgres` running, create a `senpais_log` database:

```bash
# system termianl;
$ pg_isready 
$ sudo -u <username> -i
# PSQL shell;
$ createdb senpais_log;
```

The analogous command for Windows environment:
```bash
# system termianl; login to postgres
$ psql -U <username>
# PSQL shell;
$ create database senpais_log;
```

> **_TIP_**:  
> default `<username>` is `postgres`  
> IF **Postgres** is not running, then start it;  
```bash
# replace 'path/to/PostgreSQL/data' with the actual path;
$ pg_ctl -D 'C:/Program Files/PostgreSQL/16/data' start
```



### Run the Server

From within the root __backend__ directory and in an activated virtual environment, execute:

```bash
# the --reload flag will detect file changes and restart the server automatically.
export FLASK_APP=flaskr && export FLASK_DEBUG=true && flask run --reload
```

## Sample Implementations
> **Note**  
> For each `API` endpoint, response data is expected from it, and to be returned in `JSON`. This data is consumed by the REACT frontend via `CORS` based proxy.

1. Use Flask-CORS to enable cross-domain requests and set response headers.
2. Create an endpoint to handle `GET` requests for anime titles, including pagination (every 10 titles). This endpoint should return a list of titles, number of total titles.
3. Create an endpoint to handle `GET` requests for all available titles, anime, users.
4. Create an endpoint to `DELETE` a anime using a anime `ID`.
5. Create an endpoint to `POST` a new anime, titles etc which will require the descriptions and other attributes etc.
6. Create a `POST` endpoint to get anime based on a *`search term`*. It should return any anime for a match of the search term is a substring of the anime.
7. Create a `POST` endpoint to get anime for recommendations. This endpoint should  return a random anime for a user.
8. Create error handlers for all expected errors including 400, 404, 422, and 500.

<br/>

---
### `appendix a` - API Documentation

> View the [`API DOCS`](../README.md#api-reference) in the root README.md for sample API endpoints behavior, including each URL, request parameters, and the response body.

### `appendix b` - PostgreSQL dump

> You can use the [dump](./splog-anime.sql) file in this directory if you want to assess how the app works with prepoluted data.

```bash
$
git clone https://github.com/janymuong/senpais_log.git
cd backend
psql -U <username> -d senpais_log < splog-anime.sql
$
```
