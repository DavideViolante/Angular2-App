import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {File} from './file-model';

@Component({
    selector: 'edit-file',
    templateUrl: 'app/view/editFile.html',
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class EditFileComponent {

	private file;
	private formSubmitted = false;
	private loaded = false;

	constructor(private service: MongoAPIService) {
		
	}

	onSubmit(fileForm) {
		// edit
		//this.service.mongoPostTest("files", fileForm.form.value).subscribe();
		this.formSubmitted = true;
	}

	loadData(fileid) {
		this.service.mongoGet('files', '{id:' + fileid + '}').subscribe(
			data => {
				this.file = data[0];
				console.log(this.file);
			}
		);
		
		this.loaded = true;
	}


}
