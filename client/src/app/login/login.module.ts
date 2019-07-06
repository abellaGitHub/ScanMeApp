import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { Toast } from '@ionic-native/toast/ngx';

import { LoginPage } from './login.page';
import { AuthService } from '../api/auth/auth.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    Toast,
    AuthService
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
