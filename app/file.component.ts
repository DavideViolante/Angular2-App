import {Component} from 'angular2/core';
import {Router, RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';

import {FileModel} from './model/file-model';
import {CommentModel} from './model/comment-model';

import {MongoAPIService} from './service/mongoapi.service';

import {AuthenticationComponent} from './account/authentication.component';

import {FilterPipe} from './pipe/filter-pipe';

@Component({
    selector: 'file',
    templateUrl: 'app/file.html',
    pipes: [FilterPipe],
    directives: [ROUTER_DIRECTIVES]
})

export class FileComponent {

	private file = new FileModel();
	private fileid = "";
	
	private userid = +localStorage.getItem("id");
	
	private catname = "";
	private cats = [];
	
	private comment = new CommentModel();
	private commentBody = "";
	private comments = [];
	private filterComments = "";
	private antiFlood = false;
	private antiFloodTime = 10*1000;

	private mainScreen;
	private isSelected = false;

	private isEditing = false;
	private fileEdited = false;
	private fileDeleted = false;
	private fileFaved = false;
	private fileRated = false;

	// Info messages
	private msgFileEdited = "File edited successfully!";
	private msgFileDeleted = "File deleted successfully! Redirecting...";

	constructor(private service: MongoAPIService, 				
				private routeParams: RouteParams,
				private router: Router,
				private auth: AuthenticationComponent) {

		// get the file clicked from the URL
		this.fileid = this.routeParams.get("fileid");
		this.catname = this.routeParams.get("catname");

		// get the file from the ID
		this.service.mongoSelect("files", "{id:" + this.fileid + "}").subscribe(
			data => {
				this.file = data[0];
				this.mainScreen = data[0].imgurl[0];
				(this.file.favs.indexOf(this.userid) >= 0) ? this.fileFaved = true : this.fileFaved = false;
				(this.file.likes.concat(this.file.dislikes).indexOf(this.userid) >= 0) ? this.fileRated = true : this.fileRated = false;
			}
		);

		this.service.mongoSelect("cats", "").subscribe(
			data => this.cats = data
		);

		this.service.mongoSelect("comments", "{file:"+this.fileid+"}").subscribe(
			data => this.comments = data
		);

	}

	setMainScreen(screen) {
		this.mainScreen = screen;
		this.isSelected = true;
	}

	rate(n) {
		this.service.mongoSelect("users", "{id:" + this.userid + "}").subscribe(
			data => {
				if (data.length > 0) { // ok user exists
					switch(n) {
						case 1: { // thumbs up
							this.file.likes.push(this.userid);
							this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { likes: this.file.likes }).subscribe();
							this.fileRated = true;
							break;
						}
						case -1: { // thumbs down
							this.file.dislikes.push(this.userid);
							this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { dislikes: this.file.dislikes }).subscribe();
							this.fileRated = true;
							break;
						}
						case 0: { // favorite
							this.file.favs.push(this.userid);
							this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { favs: this.file.favs }).subscribe();
							this.fileFaved = true;
							break;
						}
						default: false;
					}
				}
			}
		);
	}

	downloaded(dls) {
		this.service.mongoUpdate("files", "{id:" + this.fileid + "}", { dls: dls + 1 }).subscribe();
		this.file.dls++;
	}

	commented(body) {
		this.service.mongoSelect("users", "{id:" + this.userid + "}").subscribe(
			data => {
				this.comment = new CommentModel(+this.fileid, data[0].username, body);
				this.service.mongoInsert("comments", this.comment).subscribe();
				this.comments.push(this.comment);
			}
		);
		this.commentBody = ""; // clear the textarea after sent
		this.antiFlood = true;
		setTimeout(() => this.antiFlood = false, this.antiFloodTime);
	} 

	editFile() { this.isEditing = true; }
	isEditingCancel() { this.isEditing = false; }

	isEditingDone(file) {
		if (typeof file.authors === "string") // if the authors array was edited
			file.authors = file.authors.replace(/, /g, ",").split(',');
		if (typeof file.imgurl === "string") // if the imgurl array was edited
			file.imgurl = file.imgurl.replace(/, /g, ",").split(',');
		if (typeof file.likes === "string") // if the likes array was edited
			file.likes === "" ? file.likes = [] : file.likes = file.likes.replace(/, /g, ",").split(',').map(Number);
		if (typeof file.dislikes === "string") // if the dislikes array was edited
			file.dislikes === "" ? file.dislikes = [] : file.dislikes = file.dislikes.replace(/, /g, ",").split(',').map(Number);
		if (typeof file.favs === "string") // if the favs array was edited
			file.favs === "" ? file.favs = [] : file.favs = file.favs.replace(/, /g, ",").split(',').map(Number);

		this.service.mongoUpdate("files", "{id:"+file.id+"}", file).subscribe();
		this.isEditing = false;
		this.fileEdited = true;
		setTimeout(() => this.fileEdited = false, 3000);
	}

	deleteFile(file) {
		if (window.confirm("Are you sure you want to permanently delete this file?")) {
			this.service.mongoDelete("files", file._id.$oid).subscribe();
			this.fileDeleted = true;
			setTimeout(() => {
				this.fileDeleted = false;
				this.router.navigate(['Category', { catname: this.catname }]);
			}, 2500);
		}
	}
}