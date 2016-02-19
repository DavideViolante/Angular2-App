import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {UserModel} from './model/user-model';

import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {FilterPipe} from './pipe/filter-pipe';
import {SortPipe} from './pipe/sort-pipe';

import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'user',
    templateUrl: 'app/user.html',
    pipes: [TrimLowerCasePipe, FilterPipe, SortPipe],
    directives: [ROUTER_DIRECTIVES]
})

export class UserComponent {

	private user = new UserModel();
	private uploads = [];
	
	private filterUploads = "";

	private sortWay = 1;
	private sortField = "name";

	private username = this.routeParams.get("username");

	private userNotExist = false;

	constructor(private service: MongoAPIService,
				private routeParams: RouteParams) {
		this.service.mongoSelect("users", "{username:'" + this.username + "'}").subscribe(
			data => {
				if (data.length > 0) {
					this.user = data[0];
				} else {
					this.userNotExist = true;
				}
			}
		);

		this.service.mongoSelect("files", "{authors:'" + this.username + "'}").subscribe(
			data => this.uploads = data
		);
	}

	switchSort(field) {
		this.sortField = field;
		this.sortWay < 0 ? this.sortWay = 1 : this.sortWay = -1;
	}
	
}
