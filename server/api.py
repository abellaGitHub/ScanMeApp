from flask import jsonify


def response(status, msg='', data=None):
    if data is None:
        data = {}
    return jsonify({'status': status, 'message': msg, 'data': data})
