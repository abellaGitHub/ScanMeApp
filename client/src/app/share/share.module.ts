import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { IonicModule } from '@ionic/angular';

import { Toast } from '@ionic-native/toast/ngx';

import { ShareTokenService } from '../api/share-token/share-token.service';

import { SharePage } from './share.page';

const routes: Routes = [
  {
    path: '',
    component: SharePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgxQRCodeModule
  ],
  declarations: [SharePage],
  providers: [
    Toast,
    ShareTokenService
  ]
})
export class SharePageModule {}
