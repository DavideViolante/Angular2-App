import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ComponentInstruction, CanActivate} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {isLoggedIn} from '../account/is-logged-in';
import {AuthenticationComponent} from '../account/authentication.component';

import {UserModel} from '../model/user-model';

import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'upload',
    templateUrl: 'app/account/profile.html',
    directives: [ROUTER_DIRECTIVES]
})

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
	return isLoggedIn(next, previous);
})

export class ProfileComponent {
	private user = new UserModel();
	private changingPassword = false;
	private changingEmail = false;
	private emailChanged = false;
	private passwordChanged = false;

	// Info messages
	private msgEmailChanged = "Email changed successfully!";
	private msgPswChanged = "Password changed successfully!";

	constructor(private auth: AuthenticationComponent,
				private service: MongoAPIService) {
		this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
			data => this.user = data[0]
		);
	}

	changePassword() {
		this.changingPassword ? this.changingPassword = false : this.changingPassword = true;
	}
	changePasswordDone(newPassword) {
		this.service.mongoUpdate("users", "{id:" + this.user.id + "}", { password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)) }).subscribe();
		this.changingPassword = false;
		this.passwordChanged = true;
		setTimeout(() => this.passwordChanged = false, 3000);
	}

	changeEmail() {
		this.changingEmail ? this.changingEmail = false : this.changingEmail = true;
	}
	changeEmailDone(newEmail) {
		this.user.email = newEmail;
		this.service.mongoUpdate("users", "{id:" + this.user.id + "}", { email: newEmail }).subscribe();
		this.changingEmail = false;
		this.emailChanged = true;
		setTimeout(() => this.emailChanged = false, 3000);
	}

}

