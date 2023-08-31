import os
import sys
from sqlalchemy import (
    Column,
    String,
    Integer,
    ForeignKey,
    Boolean,
    DateTime,
    create_engine
)
from flask_sqlalchemy import SQLAlchemy
import json
from datetime import datetime
from dotenv import load_dotenv


# load .env file in backend dir using python-dotenv lib
path = os.path.dirname(os.path.dirname(__file__))
env_file = os.path.join(path, '.env')
load_dotenv(env_file)

# read variables from .env file with os.getenv()
db_name = os.getenv('DB_NAME')
db_host = os.getenv('DB_HOST')
db_user = os.getenv('DB_USER')
db_passwd = os.getenv('DB_PASS')


# connect to senpais_log db:
database_path = f'postgresql://{db_user}:{db_passwd}@{db_host}/{db_name}'

db = SQLAlchemy()


def setup_db(app, database_path=database_path):
    '''
    setup_db(app)
        binds a flask application and a SQLAlchemy service
    '''
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()


# database schema:
class User(db.Model):
    '''User - Senpai's Log
    This class represents the table for anime users
    '''
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String(255))
    password = Column(String)

    def __init__(self, id, username, email, password):
        '''constructor'''
        self.id = id
        self.username = username
        self.email = email
        self.password = password


# CRUD helper functions;
    def insert(self):
        '''INSERT SQLAlchemy session'''
        db.session.add(self)
        db.session.commit()

    def update(self):
        '''UPDATE SQLAlchemy session'''
        db.session.commit()

    def delete(self):
        '''DELETE/REMOVE SQLAlchemy session object'''
        db.session.delete(self)
        db.session.commit()

    def format(self):
        '''format and return JSON object'''
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password': self.password,
            }


class Anime(db.Model):
    '''Anime - Senpai's Log
    This class represents the table for anime titles
    '''
    __tablename__ = 'anime'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    description = Column(String)
    genre = Column(String)
    release_date = Column(DateTime, default=datetime.utcnow)
    image_url = Column(String)
    watched = Column(Boolean)

    def __init__(self, id, title, description, genre, release_date, image_url, watched):
        '''constructor'''
        self.id = id
        self.title = title
        self.description = description
        self.genre = genre
        self.release_date = release_date
        self.image_url = image_url
        self.watched = watched


    # CRUD helper functions;
    def insert(self):
        '''INSERT SQLAlchemy session'''
        db.session.add(self)
        db.session.commit()

    def update(self):
        '''UPDATE SQLAlchemy session'''
        db.session.commit()

    def delete(self):
        '''DELETE/REMOVE SQLAlchemy session object'''
        db.session.delete(self)
        db.session.commit()

    def format(self):
        '''format and return JSON object'''
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'genre': self.genre,
            'release_date': self.release_date,
            'image_url': self.image_url,
            'watched': self.watched,
            }


class AnimeLog(db.Model):
    '''AnimeLog - Senpai's Log
    This class represents the table for anime watchlists
    '''
    __tablename__ = 'anime_logs'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    anime_id = Column(Integer, ForeignKey('anime.id'), nullable=False)
    watched = Column(Boolean)

    def __init__(self, id, user_id, anime_id, watched):
        '''constructor'''
        self.id = id
        self.user_id = user_id
        self.anime_id = anime_id
        self.watched = watched


    # CRUD helper functions;
    def insert(self):
        '''INSERT SQLAlchemy session'''
        db.session.add(self)
        db.session.commit()

    def update(self):
        '''UPDATE SQLAlchemy session'''
        db.session.commit()

    def delete(self):
        '''DELETE/REMOVE SQLAlchemy session object'''
        db.session.delete(self)
        db.session.commit()

    def format(self):
        '''format and return JSON object'''
        return {
            'id': self.id,
            'user_id': self.user_id,
            'anime_id': self.anime_id,
            'watched': self.watched,
            }
