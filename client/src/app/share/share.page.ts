import { Component, OnInit } from '@angular/core';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { Toast } from '@ionic-native/toast/ngx';

import { ShareTokenService } from '../api/share-token/share-token.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.page.html',
  styleUrls: ['./share.page.scss'],
})
export class SharePage implements OnInit {

    private shareCode: boolean = false;
    private shareButtonText: string = 'CREATE SHARE TOKEN';
    private shareToken: string = '';
    private isShareButtonDisabled: boolean = false;

    constructor(private qrCodeModule: NgxQRCodeModule, private toast: Toast, private shareTokenService: ShareTokenService) { }

    ngOnInit() {}

    share() {
        this.shareCode = !this.shareCode;
        if (this.shareCode) {
            this.shareButtonText = 'HIDE SHARE TOKEN';
            this.isShareButtonDisabled = !this.isShareButtonDisabled;
            this.shareTokenService.createShareToken()
            .toPromise()
            .then((res: any) => {
                console.log('SHARE_TOKEN:', res);
                this.shareToken = res.data.shareToken;
            })
            .catch((err) => {
                this.toast.show(err.message, '5000', 'top').subscribe(toast => {});
                this.shareButtonText = 'CREATE SHARE TOKEN';
                this.shareCode = !this.shareCode;
            })
            .finally(() => {
                this.isShareButtonDisabled = !this.isShareButtonDisabled;
            });
        } else {
            this.shareButtonText = 'CREATE SHARE TOKEN';
            this.shareToken = '';
        }
    }
}
