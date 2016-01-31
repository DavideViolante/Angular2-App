import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {File} from './file-model';

@Component({
    selector: 'add-file',
    templateUrl: 'app/view/addFile.html',
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class AddFileComponent {

	private file = new File(-1, "", "", "");
	private formSubmitted = false;

	constructor(private service: MongoAPIService) {}

	onSubmit(fileForm) {
		fileForm.form.value.id = 51;
		this.service.mongoPostTest("files", fileForm.form.value).subscribe();
		this.formSubmitted = true;
	}


}
