import { Component, OnInit } from '@angular/core';

import { Toast } from '@ionic-native/toast/ngx';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

import { UserContactsService } from '../api/user-contacts/user-contacts.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

    isShowing: boolean = false;
    isFlashEnabled: boolean;
    currentCamera: number;
    scanSub: any;

    constructor(private qrScanner: QRScanner, private toast: Toast, private userContactsService: UserContactsService) {}

    ngOnInit() {
        this.qrScanner.hide();
    }

    startScan() {
        this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
            if (status.authorized) {
                this.isFlashEnabled = status.lightEnabled
                this.currentCamera = status.currentCamera

                this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
                    this.handleScan(text);
                });
                this.qrScanner.show().then((status: QRScannerStatus) => {
                    console.log('SHOWN');
                     this.isShowing = true;
                });
            } else if (status.denied) {
                // camera permission was permanently denied
                // you must use QRScanner.openSettings() method to guide the user to the settings page
                // then they can grant the permission from there
                console.log('Status denied permanently');
            } else {
                // permission was denied, but not permanently. You can ask for permission again at a later time.
                console.log('Status denied temporarly');
            }
        })
        .catch(err => {
            console.error(err);
        });
    }

    handleScan(scanedShareToken: string) {
        this.qrScanner.disableLight();
        this.stopScan();
        this.toast.show('Scanned text: ' + scanedShareToken, '5000', 'top').subscribe(toast => {});
        this.userContactsService.addContactToUserContacts(scanedShareToken)
        .toPromise()
        .then((res: any) => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
    } 

    stopScan() {
        this.scanSub.unsubscribe();

        this.qrScanner.hide()
        .then((status: QRScannerStatus) => {
            this.isShowing = false;
        });
        this.qrScanner.pausePreview();
    } 

    flashlight() {
      if(this.isFlashEnabled) {
          this.qrScanner.disableLight()
          .then((status: QRScannerStatus) => {
              this.isFlashEnabled = status.lightEnabled
          }); 
      } else {
          this.qrScanner.enableLight()
          .then((status: QRScannerStatus) => {
              this.isFlashEnabled = status.lightEnabled
          }); 
      }
    }

    reverseCamera() {
      if(this.currentCamera === 0) {
          this.qrScanner.useCamera(1)
          .then((status: QRScannerStatus) => {
              this.currentCamera = status.currentCamera
              this.isFlashEnabled = status.lightEnabled
          });        
      } else {
          this.qrScanner.useCamera(0)
          .then((status: QRScannerStatus) => {
              this.currentCamera = status.currentCamera
              this.isFlashEnabled = status.lightEnabled
          });
      }
    }
}
