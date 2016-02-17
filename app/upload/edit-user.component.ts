import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserModel} from '../model/user-model';

import {MongoAPIService} from '../service/mongoapi.service';

import {FilterPipe} from '../pipe/filter-pipe';

@Component({
    selector: 'edit-user',
    templateUrl: 'app/upload/edit-user.html',
    pipes: [FilterPipe],
    directives: [ROUTER_DIRECTIVES]
})

export class EditUserComponent {
	private user: UserModel;
	private users = [];
	private formSubmitted = false;
	private usernameAlreadyExists = false;
	private userSelected = false;
	private query = "";

	constructor(private service: MongoAPIService,
				private router: Router) {
		this.service.mongoSelect("users", "").subscribe(
			data => this.users = data
		);
	}

	userClicked(user) {
		this.user = user;
		this.userSelected = true;
	}

	resetSearch() {
		this.userSelected = false;
		this.query = "";
	}

	onSubmit(user) {
		this.service.mongoSelect("users", "{username:'" + user.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.usernameAlreadyExists = true;
				} else {
					this.service.mongoUpdate("users", "{id:"+user.id+"}", user).subscribe();
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
