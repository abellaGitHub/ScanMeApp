from datetime import datetime

from flask import (
    Blueprint, request
)

from flask_jwt_extended import (
    jwt_required, get_jwt_identity
)

from ..models import UserContacts, Contact, ShareToken, UserData
from ..api import response

bp = Blueprint('user_contacts', __name__, url_prefix='/api/user_contacts')


@bp.route('/get', methods=['GET'])
@jwt_required
def get_user_contacts():
    user_id = get_jwt_identity()
    user_contacts = UserContacts.find_by_user_id(user_id)
    if user_contacts:
        contacts = []
        contacts_data = UserData.find_by_user_id_list([contact.user_id for contact in user_contacts.contacts])
        for user_contact in user_contacts.contacts:
            contact = user_contact.to_dict()
            for contact_data in contacts_data:
                if user_contact.user_id == contact_data.user_id:
                    contact['contact_data'] = contact_data.to_dict()
            contacts.append(contact)

        return response('success', data={'userContacts': contacts}), 200
    else:
        return response('error', 'No user contacts for user')


@bp.route('/update', methods=['POST'])
@jwt_required
def update_user_contacts():
    try:
        req_user_contacts = request.json['user_contacts']
    except KeyError:
        return response('error', 'User contacts is required')

    user_id = get_jwt_identity()
    user_contacts = UserContacts.find_by_user_id(user_id)
    for contacts in req_user_contacts:
        user_contacts.contacts.append(contacts)
    user_contacts.save()
    return response('success', 'User contacts updated successfully', data={'user_contacts': user_contacts.contacts}), 200


@bp.route('/contact/add', methods=['POST'])
@jwt_required
def add_contact():
    try:
        req_share_token = request.json['share_token']
    except KeyError:
        return response('error', 'Share token is required')

    user_id = get_jwt_identity()
    share_token = ShareToken.find_by_token(req_share_token)
    if share_token and datetime.utcnow() <= share_token.expire_time and user_id != str(share_token.user_id):
        user_contacts = UserContacts.find_by_user_id(user_id)

        new_contact = Contact(user_id=share_token.user_id)
        if new_contact not in user_contacts.contacts:
            user_contacts.contacts.append(new_contact)
        user_contacts.save()

        share_token.delete()
        # ShareToken.delete_by_id(share_token._id)
        return response('success', 'Contact added successfully')
    else:
        return response('error', 'Share token is invalid or expired')
