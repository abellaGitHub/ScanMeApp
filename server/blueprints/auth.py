from flask import (
    Blueprint, request, jsonify
)

from flask_jwt_extended import (
    create_access_token, jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity, set_access_cookies, set_refresh_cookies,
    unset_jwt_cookies
)

from flask_cors import cross_origin

from werkzeug.security import check_password_hash, generate_password_hash

from ..models import User, UserData, UserContacts
from ..api import response

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=['POST'])
def register():
    body = request.get_json()
    try:
        email = body['email']
        password = body['password']
    except KeyError:
        return response('error', 'Email and password are required')

    if User.find_by_email(email):
        return response('warning', 'User with this email already exist')
    else:
        user = User(email=email, password=generate_password_hash(password))
        user.save()
        user = User.find_by_email(user.email)

        user_data = UserData(user_id=user._id)
        user_data.save()

        user_contacts = UserContacts(user_id=user._id, contacts=[])
        user_contacts.save()

        return response('success', 'User created successfully'), 200


@bp.route('/token/get', methods=['POST'])
@cross_origin(headers=['Content-Type', 'Authorization'])
def login():
    print(request.headers)
    print(request.data)
    body = request.get_json()
    try:
        email = body['email']
        password = body['password']
    except KeyError:
        return response('error', 'Email and password are required')

    user = User.find_by_email(email)
    if user:
        if check_password_hash(user.password, password):
            return response(
                'success',
                'User logged successfully',
                {
                    'access_token': create_access_token(identity=str(user._id)),
                    'refresh_token': create_refresh_token(identity=str(user._id))
                }
            )
        else:
            return response('error', 'Wrong password')
    else:
        return response('error', 'No user with this email')


@bp.route('/token/refresh', methods=['GET'])
@jwt_refresh_token_required
def refresh():
    return response(
        'success',
        'Token refreshed successfully',
        {'access_token': create_access_token(identity=get_jwt_identity())}
    )


@bp.route('/token/remove', methods=['GET'])
def logout():
    resp = response('success', 'Token removed successfully')
    unset_jwt_cookies(resp)
    return resp, 200
