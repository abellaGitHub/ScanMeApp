import json
from mongoengine import *

connect(
    db='scan_me_app_db', host='localhost', port=27017
    # username='sma_tech_user', password='XSW@3edc', authentication_source='admin'
)


class User(Document):
    _id = ObjectIdField()
    email = EmailField(required=True, unique=True)
    password = StringField(max_length=300, required=True)

    @queryset_manager
    def find_all(doc_cls, queryset):
        return list(queryset.all())

    @queryset_manager
    def find_by_email(doc_cls, queryset, email):
        return queryset.filter(email=email).first()

    @queryset_manager
    def find_by_id(doc_cls, queryset, id):
        return queryset.filter(_id=id).first()

    def __str__(self):
        return str({'id': self._id, 'email': self.email})


class UserData(Document):
    _id = ObjectIdField()
    user_id = ObjectIdField(required=True, unique=True)
    first_name = StringField(max_length=50)
    last_name = StringField(max_length=50)
    fb = StringField(max_length=300)
    inst = StringField(max_length=300)
    twt = StringField(max_length=300)
    lin = StringField(max_length=300)

    @queryset_manager
    def find_by_user_id(doc_cls, queryset, user_id):
        return queryset.filter(user_id=user_id).first()

    @queryset_manager
    def find_by_user_id_list(doc_cls, queryset, user_id_list):
        return list(queryset.filter(user_id__in=user_id_list).all())

    def to_dict(self):
        return {
            'first_name': self.first_name,
            'last_name': self.last_name,
            'fb': self.fb,
            'inst': self.inst,
            'twt': self.twt,
            'lin': self.lin
        }

    def __str__(self):
        return str({'id': self._id, 'user_id': self.user_id, 'first_name': self.first_name, 'last_name': self.last_name, 'fb': self.fb, 'inst': self.inst, 'twt': self.twt, 'lin': self.lin})


class Contact(DynamicEmbeddedDocument):
    user_id = ObjectIdField(required=True)
    keywords = ListField(field=StringField(max_length=50), default=[])
    note = StringField(required=True, default='')

    def to_dict(self):
        return {'user_id': str(self.user_id), 'keywords': self.keywords, 'note': self.note}

    def __str__(self):
        return str({'user_id': self.user_id, 'keywords': self.keywords, 'note': self.note})


class UserContacts(Document):
    _id = ObjectIdField()
    user_id = ObjectIdField(required=True, unique=True)
    contacts = EmbeddedDocumentListField(document_type=Contact, default=[])

    @queryset_manager
    def find_by_user_id(doc_cls, queryset, user_id):
        return queryset.filter(user_id=user_id).first()

    def __str__(self):
        return str({'id': self._id, 'user_id': self.user_id, 'contacts': self.contacts})


class ShareToken(Document):
    user_id = ObjectIdField(required=True)
    token = StringField(required=True)
    create_time = DateTimeField(required=True)
    expire_time = DateTimeField(required=True)

    @queryset_manager
    def find_by_user_id(doc_cls, queryset, user_id):
        return queryset.filter(user_id=user_id).first()

    @queryset_manager
    def find_by_token(doc_cls, queryset, token):
        return queryset.filter(token=token).first()

    @queryset_manager
    def delete_by_id(doc_cls, queryset, id):
        queryset.filter(_id=id).delete()

    def __str__(self):
        return str(
            {
                'id': self._id,
                'user_id': self.user_id,
                'token': self.token,
                'create_time': self.create_time.strftime('%d.%m.%Y %H:%M:%S'),
                'expire_time': self.expire_time.strftime('%d.%m.%Y %H:%M:%S')
            }
        )
