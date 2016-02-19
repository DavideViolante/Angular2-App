import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserModel} from '../model/user-model';

import {MongoAPIService} from '../service/mongoapi.service';

import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'add-user',
    templateUrl: 'app/upload/add-user.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddUserComponent {
	private user: UserModel;
	private formSubmitted = false;
	private usernameAlreadyExists = false;

	// Info messages
	private msgUsernameAlreadyExists = "Username already exists!";
	private msgUserAdded = "User added successfully! Redirecting...";

	constructor(private service: MongoAPIService,
				private router: Router) { }

	onSubmit(userForm) {
		this.service.mongoSelect("users", "{username:'" + userForm.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.usernameAlreadyExists = true;
				} else {
					// Select the max user ID
					this.service.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
						data => {
							// the new user will have maxID+1
							this.user = new UserModel(data[0].id + 1,
													  userForm.username,
													  bcrypt.hashSync(userForm.password, bcrypt.genSaltSync(10)),
													  userForm.email,
													  userForm.role,
													  "");
							this.service.mongoInsert("users", this.user).subscribe();
						}
					);
					this.formSubmitted = true;
					setTimeout(() => {
						this.formSubmitted = false;
						this.router.navigate(['../../Upload']);
					}, 2000);
				}
			}
		);
	}
}
