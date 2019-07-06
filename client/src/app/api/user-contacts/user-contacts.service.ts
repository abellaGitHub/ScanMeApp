import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APIConfig } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class UserContactsService {

    private endpointUrl: string = APIConfig.HOST + '/api/user_contacts';

    constructor(private http: HttpClient) {}

    getUserContacts() {
        return this.http.get(this.endpointUrl + '/get', APIConfig.HTTP_OPTIONS);
    }

    updateUserContacts(userContacts) {
        return this.http.post(
            this.endpointUrl + '/update',
            {'user_contacts': userContacts},
            APIConfig.HTTP_OPTIONS
        );
    }

    addContactToUserContacts(shareToken) {
        return this.http.post(
            this.endpointUrl + '/contact/add',
            {'share_token': shareToken},
            APIConfig.HTTP_OPTIONS
        );
    }
}
