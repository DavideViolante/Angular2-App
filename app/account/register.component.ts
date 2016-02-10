import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'register',
    templateUrl: 'app/template/register.html',
    directives: [ROUTER_DIRECTIVES]
})

export class RegisterComponent {
	private formSubmitted = false;
	private usernameAlreadyExists = false;
	private passwordTooShort = false;

	constructor(private service: MongoAPIService,
				private router: Router) { 
		/*if (localStorage.getItem("id")) {
			this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
				data => {
					if (data[0].id === +localStorage.getItem("id") &&
						data[0].session === localStorage.getItem("session"))
						this.router.navigate(['Home']);
				}
			);
		}*/
	}

	onSubmit(userForm) {
		this.service.mongoSelect("users", "{username:'" + userForm.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.usernameAlreadyExists = true;
				} else if (userForm.password.length < 6) {
					this.passwordTooShort = true;
				} else {
					// Select the max user ID
					this.service.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
						data => {
							userForm.id = data[0].id + 1; // the new user will have maxID+1
							userForm.role = "user";
							userForm.session = "";
							userForm.password = this.simpleHash(userForm.password);
							this.service.mongoInsert("users", userForm).subscribe();
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

	// TO CHANGE
	simpleHash(psw: string): string {
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
