import {Component} from 'angular2/core';
import {Router} from 'angular2/router';

import {MongoAPIService} from './mongoapi.service';

import {InitCasePipe} from './init-case-pipe';

@Component({
    selector: 'categories',
    templateUrl: 'app/view/categories.html',
    pipes: [InitCasePipe],
    providers: [MongoAPIService]
})


export class CategoriesComponent {

	private cats = null;

	constructor(private service: MongoAPIService,
				private router: Router) {

        if (!catsCache)
			this.service.mongoGet('cats', '').subscribe(
				data => { catsCache = data;	this.cats = catsCache; }
			);
		else this.cats = catsCache;
		
	}

    gotoCat(catname: string) {
		this.router.navigate(['Category', {catname: catname}]);
    }
	
}

var catsCache;