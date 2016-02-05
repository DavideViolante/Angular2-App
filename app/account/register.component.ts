import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {User} from '../model/user-model';

@Component({
    selector: 'register',
    templateUrl: 'app/template/register.html',
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class RegisterComponent {
	private user = new User();
	private formSubmitted = false;
	private usernameAlreadyExists = false;

	constructor(private service: MongoAPIService) {	}

	onSubmit(fileForm) {
		this.service.mongoSelect("users", "{username:'" + fileForm.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.usernameAlreadyExists = true;
				} else {
					// Select the max user ID
					this.service.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
						data => {
							fileForm.id = data[0].id + 1; // the new user will have maxID+1
							fileForm.role = "user";
							fileForm.session = "";
							fileForm.password = this.simpleHash(fileForm.password);
							this.service.mongoInsert("users", fileForm).subscribe();
						}
					);
					this.formSubmitted = true;
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
