import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {User} from '../model/user-model';

@Component({
    selector: 'add-user',
    templateUrl: 'app/template/addUser.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddUserComponent {

	private user = new User();
	private formSubmitted = false;
	private usernameAlreadyExists = false;

	constructor(private service: MongoAPIService) { }

	onSubmit(userForm) {
		this.service.mongoSelect("users", "{username:'" + userForm.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.usernameAlreadyExists = true;
				} else {
					// Select the max user ID
					this.service.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
						data => {
							userForm.id = data[0].id + 1; // the new user will have maxID+1
							userForm.password = this.simpleHash(userForm.password);
							userForm.session = "";
							this.service.mongoInsert("users", userForm).subscribe();
						}
					);
					this.formSubmitted = true;
				}
			}
		);
	}

	simpleHash(psw: string) : string {
		var hash = 0, i, chr, len;
		if (psw.length === 0) return hash.toString();
		for (i = 0, len = psw.length; i < len; i++) {
			chr = psw.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash.toString();
	}

}
