import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { Toast } from '@ionic-native/toast/ngx';

import { AuthService } from '../api/auth/auth.service';

import { APIConfig } from '../api/api-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    state: string;
    email: string;
    password: string;
    confirmedPassword: string;

    constructor(private router: Router, private toast: Toast, private authService: AuthService) {
        this.state = 'login';
        this.email = 'jan.kowalski@test.com';
        this.password = 'password';
    }

    ngOnInit() {}

    segmentChanged(event) {
        this.state = event.detail.value;
    }

    login() {
        console.log('LOGIN');
        this.authService.login(this.email, this.password).toPromise()
        .then((res: any) => {
            APIConfig.setTokens(res.data);
            this.router.navigate(['/my-profile']);
        }).catch(err => {
            console.error(err);
        });
    }

    register() {
        console.log('REGISTER')
        if(this.password === this.confirmedPassword) {
            this.authService.register(this.email, this.password).toPromise()
            .then((res: any) => {
                if(res.status === 'success') {
                    this.login()
                }
            }).catch(err => {
                console.error(err)
            });
        } else {
            console.log('PASSWORD DONT MATCH')
        }
    }
}
