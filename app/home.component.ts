import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';

import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'home',
    templateUrl: 'app/home.html',
    pipes: [TrimLowerCasePipe],
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent {

	private files = [];
	private clickedL = false;
	private clickedMD = false;
	private clickedML = false;
	private searching = false;
	private searchParam = this.routeParams.get("s");

	constructor(private service: MongoAPIService,
				private router: Router,
				private routeParams: RouteParams) {
		if (!this.searchParam || this.searchParam.length < 3) {
			this.latest();
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
		this.service.mongoSelect("files", "&s={added:-1}&l=9").subscribe(
			data => this.files = data
		);
		this.clickedL = true;
		this.clickedMD = this.clickedML = false;
	}

	mostDownloaded() {
		this.service.mongoSelect("files", "&s={dls:-1}&l=9").subscribe(
			data => this.files = data
		);
		this.clickedMD = true;
		this.clickedL = this.clickedML = false;
	}

	mostLiked() {
		this.service.mongoSelect("files", "&s={likes:-1}&l=9").subscribe(
			data => this.files = data
		);
		this.clickedML = true;
		this.clickedL = this.clickedMD = false;
	}

}
