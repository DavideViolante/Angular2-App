import {Component} from 'angular2/core';
import {ComponentInstruction, CanReuse, Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {NoDecimalValues} from './pipe/no-decimal-values-pipe';
import {SortByNamePipe} from './pipe/sort-by-name-pipe';
import {SortByDLSPipe} from './pipe/sort-by-dls-pipe';
import {FilterPipe} from './pipe/filter-pipe';

@Component({
    selector: 'category',
    templateUrl: 'app/template/category.html',
    pipes: [InitCasePipe, TrimLowerCasePipe, NoDecimalValues, SortByNamePipe, SortByDLSPipe, FilterPipe],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoryComponent implements CanReuse {

	private files = new Array<Object>();
	private catname = "";

	private sortByName = 1; // ASCending order
	private sortByDLS = 0; // no order

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
			this.routeParams.get("sortname") === "asc" ? this.sortByName = 1 : this.sortByName = -1;
		}
		if (this.routeParams.get("sortdls")) {
			this.routeParams.get("sortdls") === "asc" ? this.sortByDLS = -1 : this.sortByDLS = 1;
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

	firstPageValues() {
		this.skip = 0;
		this.noMorePrev = true;
		(this.totFiles < this.filesPerPage) ? this.noMoreNext = true : this.noMoreNext = false;
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

	changeSortByName() {
		// Back on first page
		this.firstPageValues();
		if (this.sortByName > 0) {
			this.sortByName = -1;
			this.router.navigate(['Category', { catname: this.catname, sortname: "desc" }]);
		} else {
			this.sortByName = 1;
			this.router.navigate(['Category', { catname: this.catname, sortname: "asc" }]);
		}
		
	}
	changeSortByDLS() {
		// Back on first page
		this.firstPageValues();
		if (this.sortByDLS < 0) {
			this.sortByDLS = 1;
			this.router.navigate(['Category', { catname: this.catname, sortdls: "asc" }]);
		} else {
			this.sortByDLS = -1;
			this.router.navigate(['Category', { catname: this.catname, sortdls: "desc" }]);
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