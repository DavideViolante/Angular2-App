import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {AuthenticationComponent} from './authentication.component';

import * as bcrypt from 'bcryptjs';

@Component({
    selector: 'login',
    templateUrl: 'app/account/login.html',
    directives: [ROUTER_DIRECTIVES]    
})

export class LoginComponent {
	private correctCredentials = false;
	private wrongUsername = false;
	private wrongPassword = false;
	private formSubmitted = false;

	constructor(private service: MongoAPIService,
				private router: Router,
				private auth: AuthenticationComponent) { }

	onSubmit(fileForm) {
		this.service.mongoSelect("users", "{username:'" + fileForm.username + "'}").subscribe(
			data => {
				if (data.length === 0) {
					this.wrongUsername = true;
				} else if (bcrypt.compareSync(fileForm.password, data[0].password)) {
					localStorage.removeItem("id"); localStorage.removeItem("session");
					localStorage.setItem("session", Math.random().toString(36).slice(2));
					localStorage.setItem("id", data[0].id);
					this.service.mongoUpdate("users", "{id:" + data[0].id + "}", { session: localStorage.getItem("session") }).subscribe(
						data => false,
						error => console.log(error),
						() => this.auth.login());
					this.correctCredentials = true;
					this.formSubmitted = true;
					setTimeout(() => {
						this.router.navigate(['Home']);
					}, 1000);
				} else {
					this.wrongPassword = true;
				}
			}
		);
	}
}