import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'login',
    templateUrl: 'app/template/login.html',
    directives: [ROUTER_DIRECTIVES]    
})

export class LoginComponent {
	private loggedIn = false;
	private wrongUsername = false;
	private wrongPassword = false;

	constructor(private service: MongoAPIService,
				private router: Router) {
		if (localStorage.getItem("id")) {
			this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
				data => {
					if (data[0].session === localStorage.getItem("session")) {
						this.loggedIn = true;
						this.router.navigate(['Home']);
					}
				}
			);
		}
	}

	onSubmit(fileForm) {
		this.service.mongoSelect("users", "{username:'" + fileForm.username + "'}").subscribe(
			data => {
				if (data.length === 0) {
					this.wrongUsername = true;
				} else if (this.simpleHash(fileForm.password) === data[0].password) {
					localStorage.setItem("session", Math.random().toString(36).slice(2));
					localStorage.setItem("id", data[0].id);
					this.service.mongoUpdate("users", "{id:" + data[0].id + "}", { session: localStorage.getItem("session") }).subscribe();
					this.loggedIn = true;
					setTimeout(() => this.router.navigate(['Home']), 2000);

				} else {
					this.wrongPassword = true;
				}
			}
		);
	}

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