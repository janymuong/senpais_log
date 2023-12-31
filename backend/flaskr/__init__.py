from flask import Flask, request, abort, jsonify
from flask_cors import CORS
import random
from models import setup_db, User, Anime, AnimeLog

ANIME_PER_PAGE = 5


def paginate_anime(request, selection):
    '''pagination function for 5 ANIME a page,
    and will be called on relevant endpoints:
    '''
    page = request.args.get('page', 1, type=int)
    start = (page - 1) * ANIME_PER_PAGE
    end = start + ANIME_PER_PAGE

    anime = [anime_title.format() for anime_title in selection]
    page_titles = anime[start:end]

    return page_titles


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

    @app.route('/api/status', methods=['GET'])
    def api_status():
        '''return Senpai's Log response from the API
        '''
        return jsonify({
            'status': 'OK',
            'success': True
        })

    # API endpoints here;

    # Senpai's Log user - CRUD operations;
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
        except Exception as e:
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

    # model: Anime endpoints;
    @app.route('/anime', methods=['GET'])
    def get_anime():
        '''retrieves anime titles from the database
        '''
        selection = Anime.query.order_by(Anime.id).all()
        if not selection:
            abort(404)

        anime_titles = paginate_anime(request, selection)
        return jsonify({
            'success': True,
            'anime': anime_titles,
            'total_anime': len(selection)
        })

    @app.route('/anime/<int:anime_id>', methods=['GET'])
    def get_anime_by_id(anime_id):
        '''retrieves a single anime title from the database
        based on the provided ID
        '''
        anime = Anime.query.get(anime_id)
        if anime is None:
            abort(404)

        return jsonify({
            'success': True,
            'anime': anime.format()
        })

    @app.route('/anime', methods=['POST'])
    def create_anime():
        '''CREATE - POST
        create a new anime title and persist to the database
        '''
        req_data = request.get_json()
        title = req_data.get('title')
        description = req_data.get('description')
        genre = req_data.get('genre')
        release_date = req_data.get('release_date')
        image_url = req_data.get('image_url')
        watched = req_data.get('watched')

        try:
            anime = Anime(
                title=title,
                description=description,
                genre=genre,
                release_date=release_date,
                image_url=image_url,
                watched=watched
            )
            anime.insert()

            return jsonify({
                'success': True,
                'anime': anime.format()
            })
        except Exception as e:
            print(f"Error creating anime: {e}")
            abort(405)

    @app.route('/anime/<int:anime_id>', methods=['PATCH'])
    def update_anime(anime_id):
        '''updates an existing anime title based on ID provided
        '''
        anime = Anime.query.get(anime_id)
        if anime is None:
            abort(404)

        req_data = request.get_json()
        if 'title' in req_data:
            anime.title = req_data['title']
        if 'description' in req_data:
            anime.description = req_data['description']
        if 'genre' in req_data:
            anime.genre = req_data['genre']
        if 'release_date' in req_data:
            anime.release_date = req_data['release_date']
        if 'image_url' in req_data:
            anime.image_url = req_data['image_url']
        if 'watched' in req_data:
            anime.watched = req_data['watched']

        anime.update()

        return jsonify({
            'success': True,
            'updated_anime': anime.format()
        })

    @app.route('/anime/<int:anime_id>', methods=['DELETE'])
    def delete_anime(anime_id):
        '''delete an anime title based on ID provided
        '''
        anime = Anime.query.get(anime_id)
        if not anime:
            abort(422)

        anime.delete()

        return jsonify({
            'success': True,
            'deleted_anime': anime_id
        })

    @app.route('/search', methods=['POST'])
    def search_anime():
        '''search for anime titles based on keyword - a search term
        '''
        req_data = request.get_json()
        search_in = req_data.get('search_in')

        if not search_in:
            abort(400)

        # case-insensitive search using ilike
        search_out = Anime.query.filter(
            Anime.title.ilike(f'%{search_in}%')).all()

        # formatted match
        f_out = [anime.format() for anime in search_out]

        return jsonify({
            'success': True,
            'anime_results': f_out,
            'total_results': len(search_out)
        })

    # AnimeLog endpoints;

    @app.route('/animelog', methods=['GET'])
    def get_logs():
        '''retrieves anime logs from the database
        '''
        anime_logs = AnimeLog.query.all()
        formatted_logs = [log.format() for log in anime_logs]
        return jsonify({
            'success': True,
            'anime_logs': formatted_logs
        })

    @app.route('/animelog/<int:log_id>', methods=['GET'])
    def get_anime_log(log_id):
        '''retrieves a single anime log from the database
        based on the provided ID
        '''
        log = AnimeLog.query.get(log_id)
        if not log:
            abort(404)

        return jsonify({
            'success': True,
            'anime_log': log.format()
        })

    @app.route('/animelog', methods=['POST'])
    def create_log():
        '''CREATE - POST
        create a new anime log and persist to the database
        '''
        req_data = request.get_json()
        user_id = req_data.get('user_id')
        anime_id = req_data.get('anime_id')
        watched = req_data.get('watched')

        try:
            log = AnimeLog(
                user_id=user_id,
                anime_id=anime_id,
                watched=watched
            )
            log.insert()

            return jsonify({
                'success': True,
                'anime_log': log.format()
            })
        except Exception as e:
            abort(405)

    @app.route('/animelog/<int:log_id>', methods=['PATCH'])
    def update_log(log_id):
        '''updates an existing anime log based on ID provided
        '''
        log = AnimeLog.query.get(log_id)
        if not log:
            abort(404)

        req_data = request.get_json()
        if 'user_id' in req_data:
            log.user_id = req_data['user_id']
        if 'anime_id' in req_data:
            log.anime_id = req_data['anime_id']
        if 'watched' in req_data:
            log.watched = req_data['watched']

        log.update()

        return jsonify({
            'success': True,
            'updated_anime_log': log.format()
        })

    @app.route('/animelog/<int:log_id>', methods=['DELETE'])
    def delete_log(log_id):
        '''delete an anime log based on ID provided
        '''
        log = AnimeLog.query.get(log_id)
        if not log:
            abort(422)

        log.delete()

        return jsonify({
            'success': True,
            'deleted_anime_log': log_id
        })

    @app.route('/recommend_anime/<int:user_id>', methods=['GET'])
    def get_recommendations(user_id):
        '''recommend splog application anime to watch'''
        user = User.query.get(user_id)
        if not user:
            return jsonify({
                'success': False,
                'error': 404,
                'message': 'user not found'
            })

        # get anime titles the user has watched
        watch_logs = AnimeLog.query.filter_by(
            user_id=user_id, watched=True).all()

        splog_anime = [log.anime_id for log in watch_logs]

        if not splog_anime:
            return jsonify({
                'success': True,
                'user_id': user_id,
                'recommendation': 'This user doesnt have recommendations'
            })

        random.shuffle(splog_anime)
        splog_watch = Anime.query.filter_by(id=splog_anime[0]).first()

        return jsonify({
            'success': True,
            'user_id': user_id,
            'recommendation': splog_watch.format() if splog_watch else None
        })

    # error handlers for expected app behavior
    @app.errorhandler(400)
    def bad_request(error):
        return (jsonify({
            'success': False,
            'error': 400,
            'message': 'bad request'}), 400
        )

    @app.errorhandler(404)
    def not_found(error):
        return (
            jsonify({
                'success': False,
                'error': 404,
                'message': 'resource not found'}),
            404
        )

    @app.errorhandler(405)
    def not_allowed(error):
        return (
            jsonify({
                'success': False,
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
                     'error': 500,
                     'message': 'Internal Server Error'}),
            500
        )

    return app
