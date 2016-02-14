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

	constructor(private service: MongoAPIService,
				private router: Router) {
		this.service.mongoSelect('cats', '').subscribe(
			data => this.cats = data
		);
	}

	onSubmit(fileForm) {
		// the new file will have maxID+1
		this.service.mongoSelectOne("files", "{id:1}", "{id:-1}").subscribe(
			data => {
				// if there is only 1 author
				if 	(fileForm.authors.indexOf(",") < 0) fileForm.authors = [fileForm.authors];
				else fileForm.authors = fileForm.authors.replace(/, /g, ",").split(',');
				this.file = new FileModel(data[0].id + 1, fileForm.name, fileForm.cat, fileForm.authors);
				this.service.mongoInsert("files", this.file).subscribe();
				this.formSubmitted = true;
				setTimeout(() => {
					this.formSubmitted = false;
					this.router.navigate(['../../Upload']);
				}, 2000);

			}
		);
	}

}
