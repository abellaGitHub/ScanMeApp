import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { APIConfig } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private endpointUrl: string = APIConfig.HOST + '/auth';

    constructor(private http: HttpClient) {}

    register(email, password) {
        return this.http.post(
            this.endpointUrl + '/register',
            {'email': email, 'password': password},
            APIConfig.HTTP_OPTIONS
        );
    }

    login(email, password) {
        console.log(APIConfig.HTTP_OPTIONS)
        return this.http.post(
            this.endpointUrl + '/token/get',
            {'email': email, 'password': password},
            APIConfig.HTTP_OPTIONS
        );
    }

    refresh() {
        return this.http.get(this.endpointUrl + '/token/refresh', APIConfig.getRefreshOptions());
    }

    logout(token) {
        return this.http.get(this.endpointUrl + '/token/remove', APIConfig.HTTP_OPTIONS);
    }
}
