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

	// 1: ASC, -1: DESC, 0: no sorting
	private sortWay = 1;
	private sortField = "name";

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
		/*this.service.mongoCount('files', '{cat:"' + this.catname + '"}').subscribe(
			data => {
				this.totFiles = data;
				if ((this.skip + this.filesPerPage) <= this.totFiles)
					this.noMoreNext = false;
			}
		);*/

		this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(
			data => {
				this.files = data;
				this.totFiles = data.length;
				if ((this.skip + this.filesPerPage) <= this.totFiles)
					this.noMoreNext = false;
			}
		);

		var par = this.routeParams.get("sort");
		if(par) {
			this.sortField = par.substr(0,par.length-1);
			par.charAt(par.length-1) === "+" ? this.sortWay = 1 : this.sortWay = -1;
		}

		// TODO: add pages in url
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

	switchSort(field) {
		this.firstPageValues();	// Back on first page
		this.sortField = field;
		if (this.sortWay < 0) {
			this.sortWay = 1;
			this.router.navigate(['Category', { catname: this.catname, sort: field+"+" }]);
		} else {
			this.sortWay = -1;
			this.router.navigate(['Category', { catname: this.catname, sort: field+"-" }]);
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