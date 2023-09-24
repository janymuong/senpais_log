import os
from flask import Flask, request, abort, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

from models import setup_db, User, Anime, AnimeLog

# setup stuff if needed here eg pagination etc
ANIME_PER_PAGE = 10

# pagination function for 10 ANIME a page,
# and will be called on relevant endpoints:
def paginate_logs(request, selection):
    page = request.args.get("page", 1, type=int)
    start = (page - 1) * ANIME_PER_PAGE
    end = start + ANIME_PER_PAGE

    anime = [anime_title.format() for anime_title in selection]
    current_logs = anime[start:end]

    return current_logs


def create_app(test_config=None):
    '''
    create and configure the app
    '''
    app = Flask(__name__)

    with app.app_context():
        setup_db(app)

    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    CORS(app)


    # after_request decorator
    @app.after_request
    def after_request(response):
        response.headers.add(
            'Access-Control-Allow-Headers', 'Content-Type,Authorization,true'
        )
        response.headers.add(
            'Access-Control-Allow-Methods', 'GET,POST,DELETE,PATCH,PUT'
        )
        return response


    # API endpoints here;

    # Senpai's Log user - CRUD ops;
    @app.route('/users', methods=['GET'])
    def get_users():
        '''retrieves users of Senpai's Log from the database
        '''
        users = User.query.all()
        formatted_users = [user.format() for user in users]
        return jsonify({
            'success': True,
            'users': formatted_users
        })


    @app.route('/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        '''retrieves a single user of Senpai's Log from the database
        based off ID prvided as arg
        '''
        user = User.query.get(user_id)
        if not user:
            abort(404)

        return jsonify({
            'success': True,
            'user': user.format()
        })


    @app.route('/users', methods=['POST'])
    def create_user():
        '''CREATE - POST
        create a new user and persist to the database
        '''
        req_data = request.get_json()
        username = req_data.get('username')
        email = req_data.get('email')
        password = req_data.get('password')

        try:
            user = User(username=username, email=email, password=password)
            user.insert()

            return jsonify({
                'success': True,
                'user': user.format()
            })
        except:
            abort(405)


    @app.route('/users/<int:user_id>', methods=['PATCH'])
    def update_user(user_id):
        '''updates a =n existing user of the anime app
        based off ID pased in to func as arg
        '''
        user = User.query.get(user_id)
        if not user:
            abort(404)

        req_data = request.get_json()
        if 'username' in req_data:
            user.username = req_data['username']
        if 'email' in req_data:
            user.email = req_data['email']
        if 'password' in req_data:
            user.password = req_data['password']

        user.update()

        return jsonify({
            'success': True,
            'updated_user': user.format()
        })


    @app.route('/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        '''get ID to pass in to DELETE func
        ID = User.query.filter(User.id == id).one_or_none()
        '''
        user = User.query.filter(User.id == user_id).one_or_none()
        if not user:
            abort(422)

        user.delete()

        return jsonify({
            'success': True,
            'deleted_user': user_id
        })



    # error handlers for expected app behavior
    @app.errorhandler(400)
    def bad_request(error):
        return (jsonify({'success': False,
                        'error': 400,
                        'message': 'bad request'}),
        400
        )


    @app.errorhandler(404)
    def not_found(error):
        return (
            jsonify({'success': False,
                     'error': 404,
                     'message': 'resource not found'}),
            404
        )


    @app.errorhandler(405)
    def not_allowed(error):
        return (
            jsonify({'success': False,
                     'error': 405,
                     'message': 'method not allowed'}),
            405
        )


    @app.errorhandler(422)
    def unprocessable(error):
        return (
            jsonify({'success': False,
                     'error': 422,
                     'message': 'request unprocessable'}),
            422
        )


    @app.errorhandler(500)
    def server_error(error):
        return (
            jsonify({'success': False,
                     'error': 405,
                     'message': 'Internal Server error'}),
            500
        )


    return app
