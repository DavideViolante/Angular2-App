import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {User} from '../user-model';

@Component({
    selector: 'add-user',
    templateUrl: 'app/view/addUser.html',
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class AddUserComponent {

	private user = new User();
	private formSubmitted = false;

	constructor(private service: MongoAPIService) {
		// Select the max user ID
		this.service.mongoSelectOne("users", "{id:1}", "{id:-1}").subscribe(
			data => this.user.setID(data[0].id + 1) // the new user will have maxID+1
		);
	}

	onSubmit(fileForm) {
		fileForm.password = this.simpleHash(fileForm.password);
		this.service.mongoInsert("users", fileForm).subscribe();
		this.formSubmitted = true;
	}

	simpleHash(psw: string) {
		var hash = 0, i, chr, len;
		if (psw.length === 0) return hash;
		for (i = 0, len = psw.length; i < len; i++) {
			chr = psw.charCodeAt(i);
			hash = ((hash << 5) - hash) + chr;
			hash |= 0;
		}
		return hash;
	};

}
