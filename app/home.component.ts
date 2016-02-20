import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {SortPipe} from './pipe/sort-pipe';
import {LimitPipe} from './pipe/limit-pipe';

import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'home',
    templateUrl: 'app/home.html',
    pipes: [TrimLowerCasePipe, SortPipe, LimitPipe],
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent {

	private files = [];
	private clickedL = true;
	private clickedMD = false;
	private clickedML = false;
	private searching = false;
	private searchParam = this.routeParams.get("s");

	private sortWay = -1;
	private sortField = "added";

	constructor(private service: MongoAPIService,
				private router: Router,
				private routeParams: RouteParams) {
		if (!this.searchParam || this.searchParam.length < 3) {
			this.service.mongoSelect("files", "").subscribe(
				data => this.files = data
			);
			this.searching = false;
		} else {
			this.searching = true;
			this.searchParam = this.searchParam.toLowerCase();
			this.service.mongoSelect("files", "").subscribe(
				data => this.files = data.filter((e) => e.name.toLowerCase().indexOf(this.searchParam) > -1)
			);
		}
	}

	latest() {
		this.sortField = "added";
		this.clickedL = true;
		this.clickedMD = this.clickedML = false;
	}

	mostDownloaded() {
		this.sortField = "dls";
		this.clickedMD = true;
		this.clickedL = this.clickedML = false;
	}

	mostLiked() {
		this.sortField = "likes";
		this.clickedML = true;
		this.clickedL = this.clickedMD = false;
	}

}
