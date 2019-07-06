import os

from flask import Flask, jsonify
from flask_jwt_extended import (
    JWTManager, jwt_required, get_jwt_identity
)
from flask_cors import CORS

from .models import User


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'sma.sqlite'),
        JWT_SECRET_KEY='XSW@3edc'
    )

    if test_config is None:
        app.config.from_pyfile('config.py', silent=True)
    else:
        app.config.from_mapping(test_config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    JWTManager(app)
    CORS(app, resources={r"/*": {'origins': 'http://localhost', 'support_credentials': True}})

    @app.route('/api/hello')
    @jwt_required
    def hello():
        user_id = get_jwt_identity()
        user = User.find_by_id(user_id)
        if user:
            print(user)
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'error'}), 502

    @app.route('/api/test', methods=['GET'])
    def test():
        return jsonify({'status': 'success'})

    from .blueprints import auth, user_data, user_contacts, share_token
    app.register_blueprint(auth.bp)
    app.register_blueprint(user_data.bp)
    app.register_blueprint(user_contacts.bp)
    app.register_blueprint(share_token.bp)

    return app
