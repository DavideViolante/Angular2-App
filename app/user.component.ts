import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserModel} from './model/user-model';

import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';

import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'user',
    templateUrl: 'app/user.html',
    pipes: [TrimLowerCasePipe],
    directives: [ROUTER_DIRECTIVES]
})

export class UserComponent {

	private user = new UserModel();
	private uploads = [];

	constructor(private service: MongoAPIService,
				private routeParams: RouteParams) {
		this.service.mongoSelect("users", "{id:" + this.routeParams.get("userid") + "}").subscribe(
			data => this.user = data[0],
			err => console.log(err),
			() => this.service.mongoSelect("files", "{authors:'" + this.user.username + "'}").subscribe(
				data => this.uploads = data
			)
		);

		/*this.service.mongoSelect("files", "{authors:" + this.user.username + "}").subscribe(
			data => this.uploads = data
		);*/
	}
}
