import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';
import {AuthenticationComponent} from './account/authentication.component';

import {SortPipe} from './pipe/sort-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';

@Component({
    selector: 'categories',
    templateUrl: 'app/categories.html',
    pipes: [SortPipe, TrimLowerCasePipe],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoriesComponent {

	private cats = null;
	private cat = null;

	private nameOrder = 1;

	private isEditing = false;
	private editingComplete = false;
	private catDeleted = false;
	private catNotDeleted = false;

	// Info messages
	private msgCategoryEdited = "Category edited successfully!";
	private msgCategoryDeleted = "Category deleted successfully! Redirecting...";

	constructor(private service: MongoAPIService,
				private router: Router,
				private auth: AuthenticationComponent) {
		this.service.mongoSelect('cats', '').subscribe(
			data => this.cats = data
		);
	}

	changeSort() {
		this.nameOrder > 0 ? this.nameOrder = -1 : this.nameOrder = 1;
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
				data => {
					if (data.length > 0) {
						this.service.mongoDelete("cats", data[0]._id.$oid).subscribe()
						this.catDeleted = true;
					}
				}
			);
			setTimeout(() => {
				this.catDeleted = false;
				this.router.navigate(['Home']);
			}, 2500);
		} else {
			this.catDeleted = false;
		}
	}
}