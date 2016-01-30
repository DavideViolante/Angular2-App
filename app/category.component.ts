import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';


@Component({
    selector: 'category',
    templateUrl: 'app/view/category.html',
    pipes: [InitCasePipe, TrimLowerCasePipe],
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoryComponent {

	private files = null;
	private catname = "";

	constructor(private service: MongoAPIService,
				private routeParams: RouteParams) {

		this.catname = this.routeParams.get("catname");

		if (fileCache.cat.indexOf(this.catname) === -1)
			this.service.mongoGet('files', '{cat:"' + this.catname + '"}').subscribe(
				data => {
					this.files = data;
					fileCache.files.push({ cat: this.catname, data: data });
					fileCache.cat.push(this.catname);
				}
			);
		else this.files = fileCache.files.find(obj => obj.cat === this.catname).data;		
	}
}

var fileCache = {
	files: [
			{
				cat: "",
				data: {}
			}
		],
	cat: []
};
