import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {SortByNamePipe} from './pipe/sort-by-name-pipe';
import {SortByDLSPipe} from './pipe/sort-by-dls-pipe';


@Component({
    selector: 'category',
    templateUrl: 'app/view/category.html',
    pipes: [InitCasePipe, TrimLowerCasePipe, SortByNamePipe, SortByDLSPipe],
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoryComponent {

	private files = null;
	private catname = "";

	private defaultSort = 1;
	private defaultSortDLS = 0;

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

	changeSort() {
		this.defaultSort > 0 ? this.defaultSort = -1 : this.defaultSort = 1;
	}
	changeSortDLS() {
		this.defaultSortDLS > 0 ? this.defaultSortDLS = -1 : this.defaultSortDLS = 1;
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
