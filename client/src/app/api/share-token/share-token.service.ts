import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { APIConfig } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class ShareTokenService {

    private endpointUrl: string = APIConfig.HOST + '/api/share_token';

    constructor(private http: HttpClient) {}

    createShareToken() {
        return this.http.get(this.endpointUrl + '/create', APIConfig.HTTP_OPTIONS);
    }
}
