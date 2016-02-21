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

	// Info messages
	private msgUsernameAlreadyExists = "Username already exists!";
	private msgUserEdited = "User edited successfully! Redirecting...";

	constructor(private db: MongoAPIService,
				private router: Router) {
		if (this.db.users.length === 0) {
			this.db.mongoSelect('users', '').subscribe(
				data => this.users = data
			);
		} else {
			this.users = this.db.users;
		}
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
		this.db.mongoSelect("users", "{username:'" + user.username + "'}").subscribe(
			data => {
				var ok = false;
				if (data.length > 0) { // username wasn't changed
					if (data[0].id === user.id) { // I found the same user, so it's ok
						ok = true;
					} else {
						this.usernameAlreadyExists = true;
					}
				} else { // username was changed and the new one is unique
					ok = true;
				}
				if (ok) {
					this.usernameAlreadyExists = false;
					/*var pos = this.db.users.map((e) => { return e.id }).indexOf(user.id);
					this.db.users.splice(pos, 1);
					this.db.users.push(user);*/
					this.db.mongoUpdate("users", "{id:" + user.id + "}", user).subscribe();
					this.formSubmitted = true;
					setTimeout(() => {
						this.formSubmitted = false;
						this.userSelected = false;
						this.query = "";
					}, 2000);
				}
			}
		);
	}
}
