import os
from flask import Flask, request, abort, jsonify, json
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import random

from models import setup_db, User, Anime, AnimeLog

# setup stuff if needed here eg pagination etc

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


    # endpoints here; 
    # -------------------


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