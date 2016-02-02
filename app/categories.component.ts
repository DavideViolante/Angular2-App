import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {SortByNamePipe} from './pipe/sort-by-name-pipe';

@Component({
    selector: 'categories',
    templateUrl: 'template/categories.html',
    pipes: [InitCasePipe, SortByNamePipe],
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})


export class CategoriesComponent {

	private cats = null;

	private defaultSort = 1;

	constructor(private service: MongoAPIService) {

        if (!catsCache)
			this.service.mongoSelect('cats', '').subscribe(
				data => { catsCache = data;	this.cats = catsCache; }
			);
		else this.cats = catsCache;

	}

	changeSort() {
		this.defaultSort > 0 ? this.defaultSort = -1 : this.defaultSort = 1;
	}
}

var catsCache;