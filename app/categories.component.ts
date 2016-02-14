import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';
import {AuthenticationComponent} from './account/authentication.component';

import {SortByNamePipe} from './pipe/sort-by-name-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';

@Component({
    selector: 'categories',
    templateUrl: 'app/categories.html',
    pipes: [SortByNamePipe, TrimLowerCasePipe],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoriesComponent {

	private cats = null;
	private cat = null;

	private sortByName = 1;

	private isEditing = false;
	private editingComplete = false;
	private catDeleted = false;
	private catNotDeleted = false;

	constructor(private service: MongoAPIService,
				private router: Router,
				private auth: AuthenticationComponent) {
		this.service.mongoSelect('cats', '').subscribe(
			data => this.cats = data
		);
	}

	changeSort() {
		this.sortByName > 0 ? this.sortByName = -1 : this.sortByName = 1;
	}

	editCategory(cat) {
		this.cat = cat;
		this.isEditing = true;
	}

	isEditingCancel() {
		this.isEditing = false;
	}

	isEditingDone(catEdited) {
		this.service.mongoUpdate("cats", "{id:" + catEdited.id + "}", catEdited).subscribe();
		this.isEditing = false;
		this.editingComplete = true;
		setTimeout(() => this.editingComplete = false, 3000);
	}

	deleteCategory(catid) {
		if (window.confirm("Are you sure you want to permanently delete this file?")) {
			this.service.mongoSelect("cats", "{id:" + catid + "}").subscribe(
				data => data ? this.service.mongoDelete("cats", data[0]._id.$oid).subscribe() : this.catNotDeleted = true
			);
			this.catDeleted = true;
			setTimeout(() => {
				this.catDeleted = false;
				this.router.navigate(['Home']);
			}, 2500);
		} else {
			this.catDeleted = false;
		}
	}
}