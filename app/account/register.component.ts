import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserModel} from '../model/user-model';

import {MongoAPIService} from '../service/mongoapi.service';

import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'register',
    templateUrl: 'app/account/register.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RegisterComponent {
	private user: UserModel;
	private formSubmitted = false;
	private usernameAlreadyExists = false;
	private passwordTooShort = false;

	// Info messages
	private msgUsernameAlreadyExists = "Username already exists!";
	private msgPswTooShort = "The password must be 6+ characters long!";
	private msgRegistered = "You successfully registered! Redirecting...";

	constructor(private db: MongoAPIService,
				private router: Router) { }

	onSubmit(userForm) {
		this.db.mongoSelect("users", "{username:'" + userForm.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.usernameAlreadyExists = true;
				} else if (userForm.password.length < 6) {
					this.passwordTooShort = true;
				} else {
					// Select the max user ID
					this.db.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
						data => {
							this.user = new UserModel(data[0].id + 1, // the new user will have maxID+1
													  userForm.username,
													  bcrypt.hashSync(userForm.password, bcrypt.genSaltSync(10)),
													  userForm.email,
													  "user", // role
													  "");	  // session
							this.db.users.push(this.user);
							this.db.mongoInsert("users", this.user).subscribe();
						}
					);
					this.formSubmitted = true;
					setTimeout(() => this.router.navigate(['Login']), 3000);
				}
			}
		);
		this.usernameAlreadyExists = false;
		this.passwordTooShort = false;
	}
}
