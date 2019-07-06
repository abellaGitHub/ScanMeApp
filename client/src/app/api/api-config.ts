import { HttpClient, HttpHeaders } from '@angular/common/http';

export class APIConfig {

    public static HOST: string = 'http://899950e6.ngrok.io';
    public static HTTP_OPTIONS: any = {
        headers: {'Content-Type': 'application/json'},
        observe: 'body',
        responseType: 'json',
        withCredentials: false
    };

    private static TOKENS = {
        accessToken: '',
        refreshToken: ''
    };

    constructor() {}

    static setTokens(tokens) {
        APIConfig.TOKENS.accessToken = tokens.access_token;
        APIConfig.TOKENS.refreshToken = tokens.refresh_token;

        APIConfig.HTTP_OPTIONS.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.TOKENS.accessToken
        };
    }

    static setAccessToken(accessToken) {
        this.TOKENS.accessToken = accessToken;

        APIConfig.HTTP_OPTIONS.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.TOKENS.accessToken
        };
    }

    static getRefreshOptions() {
        return new Object({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.TOKENS.refreshToken
            },
            observe: 'body',
            responseType: 'json',
            withCredentials: false
        });
    }
}
