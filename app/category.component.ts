import {Component} from 'angular2/core';
import {ComponentInstruction, CanReuse, Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {NoDecimalValues} from './pipe/no-decimal-values-pipe';
import {SortPipe} from './pipe/sort-pipe';
import {FilterPipe} from './pipe/filter-pipe';

@Component({
    selector: 'category',
    templateUrl: 'app/category.html',
    pipes: [InitCasePipe, TrimLowerCasePipe, NoDecimalValues, SortPipe, FilterPipe],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoryComponent implements CanReuse {

	private files = new Array<Object>();
	private catname = "";

	private nameOrder = 1; // ASCending order
	private dlsOrder = 0; // no order
	private ratingOrder = 0;

	private query = "";

	private totFiles = 0;
	private skip = 0;
	private filesPerPage = 9;
	private noMoreNext = true;
	private noMorePrev = true;

	constructor(private service: MongoAPIService,
				private routeParams: RouteParams,
				private router: Router) {

		this.catname = this.routeParams.get("catname");
		this.catname = this.toTitleCase(this.catname);

		// Counting the total number of files
		this.service.mongoCount('files', '{cat:"' + this.catname + '"}').subscribe(
			data => {
				this.totFiles = data;
				if ((this.skip + this.filesPerPage) <= this.totFiles)
					this.noMoreNext = false;
			}
		);

		this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(
			data => this.files = data
		);

		if (this.routeParams.get("sortname")) {
			this.ratingOrder = 0;
			this.dlsOrder = 0;
			this.routeParams.get("sortname") === "asc" ? this.nameOrder = 1 : this.nameOrder = -1;
		}
		if (this.routeParams.get("sortdls")) {
			this.nameOrder = 0;
			this.ratingOrder = 0;
			this.routeParams.get("sortdls") === "desc" ? this.dlsOrder = -1 : this.dlsOrder = 1;
		}
		if (this.routeParams.get("sortrating")) {
			this.nameOrder = 0;
			this.dlsOrder = 0;
			this.routeParams.get("sortrating") === "desc" ? this.ratingOrder = -1 : this.ratingOrder = 1;
		}
		// gotta figure out how to make this work...
		/*if (this.routeParams.get("page")) {
			var page = +this.routeParams.get("page");
			for (var i = 1; i < page; i++)
				this.nextPage();
		}*/
	}

	// Don't reload the component when clicking sorting buttons
	routerCanReuse(next: ComponentInstruction, prev: ComponentInstruction) { return true; }

	toTitleCase(str) {
    	return str.replace(/\w\S*/g, (s) => { return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase(); });
	}

	changeFilesPerPage(n) {
		this.filesPerPage = n;
		this.firstPageValues();
	}

	resetForSearch() {
		this.skip = 0;
		this.noMorePrev = true;
		this.filesPerPage = 9;
		(this.totFiles <= this.filesPerPage) ? this.noMoreNext = true : this.noMoreNext = false;
	}

	firstPageValues() {
		this.skip = 0;
		this.noMorePrev = true;
		(this.totFiles <= this.filesPerPage) ? this.noMoreNext = true : this.noMoreNext = false;
	}
	
	nextPage() {
		if ((this.skip + this.filesPerPage) <= this.totFiles) {
			this.skip += this.filesPerPage;
			//this.router.navigate(['Category', { catname: this.catname, page: this.skip / this.filesPerPage + 1 }]);
			if ((this.skip + this.filesPerPage) >= this.totFiles) // Last page
				this.noMoreNext = true;
		}
		this.noMorePrev = false;
	}
	prevPage() {
		if (this.skip - this.filesPerPage === 0) this.noMorePrev = true;
		this.skip -= this.filesPerPage;
		//this.router.navigate(['Category', { catname: this.catname, page: this.skip / this.filesPerPage + 1 }]);
		this.noMoreNext = false;
	}

	switchNameOrder() {
		// Back on first page
		this.firstPageValues();
		this.ratingOrder = 0;
		this.dlsOrder = 0;
		if (this.nameOrder > 0) {
			this.nameOrder = -1;
			this.router.navigate(['Category', { catname: this.catname, sortname: "desc" }]);
		} else {
			this.nameOrder = 1;
			this.router.navigate(['Category', { catname: this.catname, sortname: "asc" }]);
		}
	}
	switchDlsOrder() {
		// Back on first page
		this.firstPageValues();
		this.ratingOrder = 0;
		this.nameOrder = 0;
		if (this.dlsOrder < 0) {
			this.dlsOrder = 1;
			this.router.navigate(['Category', { catname: this.catname, sortdls: "asc" }]);
		} else {
			this.dlsOrder = -1;
			this.router.navigate(['Category', { catname: this.catname, sortdls: "desc" }]);
		}
	}
	switchRatingOrder() {
		// Back on first page
		this.firstPageValues();
		this.nameOrder = 0;
		this.dlsOrder = 0;
		if (this.ratingOrder < 0) {
			this.ratingOrder = 1;
			this.router.navigate(['Category', { catname: this.catname, sortrating: "asc" }]);
		} else {
			this.ratingOrder = -1;
			this.router.navigate(['Category', { catname: this.catname, sortrating: "desc" }]);
		}
	}
}

/*if (fileCache.cat.indexOf(this.catname) === -1)
	this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(
		data => {
			this.files = data;
			fileCache.files.push({ cat: this.catname, data: data });
			fileCache.cat.push(this.catname);
		}
	);
else this.files = fileCache.files.find(obj => obj.cat === this.catname).data;*/


/*var fileCache = {
	files: [
			{
				cat: "",
				data: {}
			}
		],
	cat: []
};
*/