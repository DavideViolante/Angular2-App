import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {FileModel} from '../model/file-model';

@Component({
    selector: 'add-file',
    templateUrl: 'app/upload/add-file.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddFileComponent {
	private cats = new Array<string>();
	private formSubmitted = false;
	private file: FileModel;
	private imgurlCount = [1];

	// Info messages
	private msgFileAdded = "File added successfully! Redirecting...";

	constructor(private db: MongoAPIService,
				private router: Router) {
		if (this.db.cats.length === 0) {
			this.db.mongoSelect('cats', '').subscribe(
				data => this.cats = data
			);
		} else {
			this.cats = this.db.cats;
		}
	}

	addImgurlForm() { this.imgurlCount.push(1); }

	removeImgurlForm() { this.imgurlCount.pop(); }

	onSubmit(fileForm) {
		// the new file will have maxID+1
		this.db.mongoSelectOne("files", "{id:1}", "{id:-1}").subscribe(
			data => {
				// if there is only 1 author
				if 	(fileForm.authors.indexOf(",") < 0) fileForm.authors = [fileForm.authors];
				else fileForm.authors = fileForm.authors.replace(/, /g, ",").split(',');

				fileForm.imgurl = [];
				var i = 0, cond = false;
				do {
					fileForm.imgurl.push(fileForm["imgurl" + i]);
					i++;
					// check if next url doesn't exist, if so, stop
					if (!fileForm["imgurl" + i]) cond = true;
				} while (!cond);

				this.file = new FileModel(data[0].id + 1, fileForm.name, fileForm.cat, fileForm.authors, fileForm.imgurl, fileForm.dlurl);
				this.db.files.push(this.file);
				this.db.mongoInsert("files", this.file).subscribe();
				this.formSubmitted = true;
				setTimeout(() => {
					this.formSubmitted = false;
					this.router.navigate(['../../Upload']);
				}, 2000);

			}
		);
	}

}
