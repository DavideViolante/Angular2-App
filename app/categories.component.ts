import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './mongoapi.service';

import {InitCasePipe} from './init-case-pipe';

@Component({
    selector: 'categories',
    templateUrl: 'app/view/categories.html',
    pipes: [InitCasePipe],
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})


export class CategoriesComponent {

	private cats = null;

	constructor(private service: MongoAPIService) {

        if (!catsCache)
			this.service.mongoGet('cats', '').subscribe(
				data => { catsCache = data;	this.cats = catsCache; }
			);
		else this.cats = catsCache;
		
	}	
}

var catsCache;