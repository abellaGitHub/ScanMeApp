from flask import (
    Blueprint, request
)

from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)

from ..models import UserData
from ..api import response

bp = Blueprint('user_data', __name__, url_prefix='/api/user_data')


@bp.route('/get', methods=['GET'])
@jwt_required
def get_user_data():
    user_id = get_jwt_identity()
    user_data = UserData.find_by_user_id(user_id)
    print(user_data)
    if user_data:
        return response(
            'success',
            data={
                'user_data': user_data.to_dict()
            }
        ), 200
    else:
        return response('error', 'No user data for user')


@bp.route('/update', methods=['POST'])
@jwt_required
def update_user_data():
    try:
        req_user_data = request.json['user_data']
    except KeyError:
        return response('error', 'User data is required')

    user_id = get_jwt_identity()
    user_data = UserData.find_by_user_id(user_id)
    for rud_key in req_user_data.keys():
        user_data[rud_key] = req_user_data[rud_key]
    print(user_data)
    user_data.save()
    return response(
        'success',
        data={
            'user_data': {
                'first_name': user_data.first_name,
                'last_name': user_data.last_name,
                'fb': user_data.fb,
                'inst': user_data.inst,
                'twt': user_data.twt,
                'lin': user_data.lin
            }
        }
    ), 200
