import { Component, OnInit } from '@angular/core';

import { Toast } from '@ionic-native/toast/ngx';

import { UserContactsService } from '../api/user-contacts/user-contacts.service';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

    private userContacts: any = [];
    private socialMedia = [
        {key: 'fb', icon: 'logo-facebook', label: 'Facebook'},
        {key: 'inst', icon: 'logo-instagram', label: 'Instagram'},
        {key: 'twt', icon: 'logo-twitter', label: 'Twitter'},
        {key: 'lin', icon: 'logo-linkedin', label: 'LinkedIn'}
    ];

    constructor(private toast: Toast, private userContactsService: UserContactsService) {}

    ngOnInit() {
        this.userContactsService.getUserContacts().toPromise()
        .then((res: any) => {
            console.log(res);
            res.data.userContacts.forEach(userContact => {
                let contactSocialMedia = [];
                this.socialMedia.forEach(socialMedia => {
                    contactSocialMedia.push({
                        key: socialMedia.key,
                        icon: socialMedia.icon,
                        label: socialMedia.label,
                        value: userContact.contact_data[socialMedia.key]
                    });
                });

                this.userContacts.push({
                    firstName: userContact.contact_data.first_name,
                    lastName: userContact.contact_data.last_name,
                    socialMedia: contactSocialMedia,
                    keywords: userContact.keywords.join(','),
                    note: userContact.note,
                    userId: userContact.user_id
                });
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    save() {
        this.userContactsService.updateUserContacts(this.userContacts).toPromise()
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
    }
}
