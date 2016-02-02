import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {SortByNamePipe} from './pipe/sort-by-name-pipe';
import {SortByDLSPipe} from './pipe/sort-by-dls-pipe';


@Component({
    selector: 'category',
    templateUrl: 'app/template/category.html',
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
				private routeParams: RouteParams,
				private router: Router) {

		this.catname = this.routeParams.get("catname");

		if (fileCache.cat.indexOf(this.catname) === -1)
			this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(
				data => {
					this.files = data;
					fileCache.files.push({ cat: this.catname, data: data });
					fileCache.cat.push(this.catname);
				}
			);
		else this.files = fileCache.files.find(obj => obj.cat === this.catname).data;

		// cache
		this.defaultSort = defaultSort;
		this.defaultSortDLS = defaultSortDLS;

	}

	/*changeSort() {
		this.defaultSort > 0 ? this.defaultSort = -1 : this.defaultSort = 1;
	}
	changeSortDLS() {
		this.defaultSortDLS > 0 ? this.defaultSortDLS = -1 : this.defaultSortDLS = 1;
	}*/
	changeSort() {
		if (this.defaultSort > 0) {
			this.defaultSort = -1;
			defaultSort = this.defaultSort;
		} else {
			this.defaultSort = 1;
			defaultSort = this.defaultSort;
		}
	}
	changeSortDLS() {
		if (this.defaultSortDLS > 0) {
			this.defaultSortDLS = -1;
			defaultSortDLS = this.defaultSortDLS;
		} else {
			this.defaultSortDLS = 1;
			defaultSortDLS = this.defaultSortDLS;
		}
	}


}

var defaultSort = 1;
var defaultSortDLS = 0;

var fileCache = {
	files: [
			{
				cat: "",
				data: {}
			}
		],
	cat: []
};
