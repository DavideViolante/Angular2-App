import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

import {InitCasePipe} from './pipe/init-case-pipe';
import {TrimLowerCasePipe} from './pipe/trim-lowercase-pipe';
import {SortByNamePipe} from './pipe/sort-by-name-pipe';
import {SortByDLSPipe} from './pipe/sort-by-dls-pipe';
import {FilterPipe} from './pipe/filter-pipe';


@Component({
    selector: 'category',
    templateUrl: 'app/template/category.html',
    pipes: [InitCasePipe, TrimLowerCasePipe, SortByNamePipe, SortByDLSPipe, FilterPipe],
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class CategoryComponent {

	private files = null;
	private catname = "";

	private sortByName = 1;
	private sortByDLS = 0;

	private query = "";

	private totFiles = 0;
	private skip = 0;
	private filesPerPage = 10;
	private noMoreNext = false;
	private noMorePrev = true;

	constructor(private service: MongoAPIService,
				private routeParams: RouteParams,
				private router: Router) {

		this.catname = this.routeParams.get("catname");

		// Counting the total number of files
		this.service.mongoSelect('files', '{cat:"' + this.catname + '"}&c=true').subscribe(
			data => this.setTotFiles(data)
		);

		/*// Fetching only X files per page
		this.service.mongoSelectSkip('files', '{cat:"' + this.catname + '"}', this.skip, this.filesPerPage).subscribe(
			data => this.files = data
		);*/
		
		this.service.mongoSelect('files', '{cat:"' + this.catname + '"}').subscribe(
			data => this.files = data
		);

	}

	test() {
		this.filesPerPage += 10;
	}

	setTotFiles(totFiles) {
		this.totFiles = totFiles;
	}

	changeSort() {
		this.sortByName > 0 ? this.sortByName = -1 : this.sortByName = 1;
	}
	changeSortDLS() {
		this.sortByDLS < 0 ? this.sortByDLS = 1 : this.sortByDLS = -1;
	}

	nextPage() {
		if ((this.skip + this.filesPerPage) <= this.totFiles) {
			this.skip += this.filesPerPage;
			this.service.mongoSelectSkip('files', '{cat:"' + this.catname + '"}', this.skip, this.filesPerPage).subscribe(
				data => this.files = data
			);
			// Last page
			if((this.skip + this.filesPerPage) >= this.totFiles) {
				this.noMoreNext = true;
			}		
		}
		this.noMorePrev = false;
	}

	prevPage() {
		// Back on first page
		if (this.skip - this.filesPerPage === 0) this.noMorePrev = true;
		this.skip -= this.filesPerPage;
		this.service.mongoSelectSkip('files', '{cat:"' + this.catname + '"}', this.skip, this.filesPerPage).subscribe(
			data => this.files = data
		);
		this.noMoreNext = false;
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