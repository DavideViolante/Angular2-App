import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'add-category',
    templateUrl: 'app/upload/add-category.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddCategoryComponent {

	private formSubmitted = false;

	constructor(private service: MongoAPIService) { }

	onSubmit(catForm) {
		// Select the max category ID
		this.service.mongoSelectOne("cats", "{id:1}", "{id:-1}").subscribe(
			data => {
				catForm.id = data[0].id + 1; // the new category will have maxID+1
				this.service.mongoInsert("cats", catForm).subscribe();
			}
		);
		this.formSubmitted = true;
	}
}
