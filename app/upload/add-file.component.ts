import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {File} from '../file-model';

@Component({
    selector: 'add-file',
    templateUrl: 'app/view/addFile.html',
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class AddFileComponent {

	private file = new File();
	private formSubmitted = false;

	constructor(private service: MongoAPIService) {
		// Select the max file ID
		this.service.mongoSelectOne("files", "{id:1}", "{id:-1}").subscribe(
			data => this.file.setID(data[0].id + 1) // the new file will have maxID+1
		);
	}

	onSubmit(fileForm) {
		this.service.mongoInsert("files", fileForm.form.value).subscribe();
		this.formSubmitted = true;
	}


}
