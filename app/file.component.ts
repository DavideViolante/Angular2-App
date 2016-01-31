import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {InitCasePipe} from './pipe/init-case-pipe';

import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'file',
    templateUrl: 'app/view/file.html',
    pipes: [InitCasePipe],
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class FileComponent {

	private file = null;

	private catname = "";

	private mainScreen;
	private isSelected = false;

	constructor(private service: MongoAPIService, 
				private router: Router,				
				private routeParams: RouteParams) {

		// get the file clicked from the URL
		var fileid = this.routeParams.get("fileid");
		this.catname = this.routeParams.get("catname");

		// get the file from the ID
		this.service.mongoGet('files', '{id:' + fileid + '}').subscribe(
			data => {
				this.file = data[0];
				this.mainScreen = this.file.imgurl[0];
			}
		);
	}

	setMainScreen(screen) {
		this.mainScreen = screen;
		this.isSelected = true;
	}

}