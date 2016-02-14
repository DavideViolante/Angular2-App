import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'add-user',
    templateUrl: 'app/upload/add-user.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddUserComponent {

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
							userForm.session = "";
							userForm.password = bcrypt.hashSync(userForm.password, bcrypt.genSaltSync(10));
							this.service.mongoInsert("users", userForm).subscribe();
						}
					);
					this.formSubmitted = true;
				}
			}
		);
	}
}
