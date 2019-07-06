import { Component, OnInit } from '@angular/core';

import { Toast } from '@ionic-native/toast/ngx';

import { UserDataService } from '../api/user-data/user-data.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

    private userData: any = {
        'firstName': '',
        'lastName': '',
        'socialMedia': [
            {key: 'fb', icon: 'logo-facebook', label: 'Facebook'},
            {key: 'inst', icon: 'logo-instagram', label: 'Instagram'},
            {key: 'twt', icon: 'logo-twitter', label: 'Twitter'},
            {key: 'lin', icon: 'logo-linkedin', label: 'LinkedIn'}
        ]
    };

    constructor(private userDataService: UserDataService, private toast: Toast) {}

    ngOnInit() {
        this.userDataService.getUserData().toPromise()
        .then((res: any) => {
            console.log(res);
            let resUserData = res.data.user_data;
            this.userData.firstName = resUserData.first_name;
            this.userData.lastName = resUserData.last_name;
            this.userData.socialMedia.forEach(social => {
                social.value = resUserData[social.key];
            });
        })
        .catch((err: any) => {
            console.error(err);
        });
    }

    saveMyProfile() {
        let userDataUpdated = {
            first_name: this.userData.firstName,
            last_name: this.userData.lastName,
            fb: this.userData.socialMedia.find(social => social.key === 'fb').value,
            inst: this.userData.socialMedia.find(social => social.key === 'inst').value,
            twt: this.userData.socialMedia.find(social => social.key === 'twt').value,
            lin: this.userData.socialMedia.find(social => social.key === 'lin').value
        } 

        this.userDataService.updateUserData(userDataUpdated).toPromise()
        .then((res: any) => {
            console.log(res);
            // this.userData = res;
        })
        .catch((err: any) => {
            console.error(err);
        });
    }

    connect(socialMedia) {
        console.log('CONNECT', socialMedia.label)
    }
}
