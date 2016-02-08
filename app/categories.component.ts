import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {SortByNamePipe} from './pipe/sort-by-name-pipe';

@Component({
    selector: 'categories',
    templateUrl: 'app/template/categories.html',
    pipes: [InitCasePipe, SortByNamePipe],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoriesComponent {

	private cats = null;

	private defaultSort = 1;

	constructor(private service: MongoAPIService) {
		this.service.mongoSelect('cats', '').subscribe(
			data => this.cats = data
		);
	}

	changeSort() {
		this.defaultSort > 0 ? this.defaultSort = -1 : this.defaultSort = 1;
	}
}