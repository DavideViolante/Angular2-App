import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {FileModel} from './model/file-model';

import {InitCasePipe} from './pipe/init-case-pipe';

import {MongoAPIService} from './service/mongoapi.service';

import {AuthenticationComponent} from './account/authentication.component';

@Component({
    selector: 'file',
    templateUrl: 'app/template/file.html',
    pipes: [InitCasePipe],
    directives: [ROUTER_DIRECTIVES]
})

export class FileComponent {

	private file = new FileModel();
	private fileid = "";
	private catname = "";
	private cats = null;

	private mainScreen;
	private isSelected = false;

	private isEditing = false;
	private editingComplete = false;

	private fileDeleted = false;
	private fileNotDeleted = false;

	constructor(private service: MongoAPIService, 				
				private routeParams: RouteParams,
				private router: Router,
				private auth: AuthenticationComponent) {

		// get the file clicked from the URL
		this.fileid = this.routeParams.get("fileid");
		this.catname = this.routeParams.get("catname");

		// get the file from the ID
		this.service.mongoSelect('files', '{id:' + this.fileid + '}').subscribe(
			data => {
				this.file = data[0];
				this.mainScreen = data[0].imgurl[0];
			}
		);

		this.service.mongoSelect('cats', '').subscribe(
			data => this.cats = data
		);

	}

	setMainScreen(screen) {
		this.mainScreen = screen;
		this.isSelected = true;
	}

	liked(file) {
		this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { likes: file.likes + 1 }).subscribe();
		file.likes++;
	}
	disliked(file) {
		this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { dislikes: file.dislikes + 1 }).subscribe();
		file.dislikes++;
	}

	downloaded(file) {
		this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { dls: file.dls + 1 }).subscribe();
		file.dls++;
	} 

	editFile() {
		this.isEditing = true;
	}

	isEditingCancel() {
		this.isEditing = false;
	}

	isEditingDone(fileEdited) {
		if(typeof fileEdited.authors === "string") // if the authors array was edited using the input form
			fileEdited.authors = fileEdited.authors.replace(/, /g,",").split(',');
		this.service.mongoUpdate("files", "{id:"+fileEdited.id+"}", fileEdited).subscribe();
		this.isEditing = false;
		this.editingComplete = true;
		setTimeout(() => this.editingComplete = false, 3000);
	}

	deleteFile(fileid) {
		if(window.confirm("Are you sure you want to permanently delete this file?")) {
			this.service.mongoSelect("files", "{id:" + fileid + "}").subscribe(
				data => data ? this.service.mongoDelete("files", data[0]._id.$oid).subscribe() : this.fileNotDeleted = true
			);
			this.fileDeleted = true;
			setTimeout(() => {
				this.fileDeleted = false;
				this.router.navigate(['Category', { catname: this.catname }]);
			}, 2500);
		} else {
			this.fileDeleted = false;
		}
	}
}