import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';

import {MongoAPIService} from './mongoapi.service';

import {InitCasePipe} from './init-case-pipe';

@Component({
    selector: 'category',
    templateUrl: 'app/view/category.html',
    pipes: [InitCasePipe],
    providers: [MongoAPIService]
})

export class CategoryComponent {

	private files = null;
	private catname = "";

	constructor(private service: MongoAPIService,
				private router: Router,
				private routeParams: RouteParams) {

		this.catname = this.routeParams.get("catname");

		this.service.mongoGet('files', '{cat:"' + this.catname + '"}').subscribe(
			data => this.files = data
		);
		
	}

	gotoFile(catname: string, fileid: string, filename: string) {
		filename = filename.replace(/ /g,"-").toLowerCase();
		this.router.navigate(['File', { catname: catname, fileid: fileid, filename: filename }]);
    }
}
