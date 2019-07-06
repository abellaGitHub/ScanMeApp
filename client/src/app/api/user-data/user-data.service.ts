import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APIConfig } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

    private endpointUrl: string = APIConfig.HOST + '/api/user_data';

    constructor(private http: HttpClient) {}

    getUserData() {
        return this.http.get(this.endpointUrl + '/get', APIConfig.HTTP_OPTIONS);
    }

    updateUserData(userData) {
        return this.http.post(
            this.endpointUrl + '/update',
            {'user_data': userData},
            APIConfig.HTTP_OPTIONS
        );
    }
}
