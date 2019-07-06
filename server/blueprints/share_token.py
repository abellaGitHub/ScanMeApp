from datetime import datetime, timedelta
import uuid, hashlib

from flask import (
    Blueprint, request
)

from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)

from ..models import ShareToken
from ..api import response

bp = Blueprint('share_token', __name__, url_prefix='/api/share_token')


@bp.route('/create', methods=['GET'])
@jwt_required
def get_share_token():
    user_id = get_jwt_identity()

    # share_token = ShareToken.find_by_user_id(user_id=user_id)

    # if share_token:
    #     share_token.expire_time = datetime.utcnow() + timedelta(days=1)
    #     share_token.save()
    # else:
    create_time = datetime.utcnow()
    share_token = ShareToken(
        user_id=user_id,
        create_time=create_time,
        expire_time=create_time + timedelta(days=1),
        token=hashlib.sha256(
            uuid.uuid4().bytes + user_id.encode() + create_time.strftime('%d.%m.%Y %H:%M:%S').encode()
        ).hexdigest()
    )
    share_token.save()

    return response('success', data={'shareToken': share_token.token}), 200
