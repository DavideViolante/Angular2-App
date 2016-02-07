import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {File} from '../model/file-model';

@Component({
    selector: 'add-file',
    templateUrl: 'app/template/addFile.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddFileComponent {
	private file = new File();
	private formSubmitted = false;

	constructor(private service: MongoAPIService) { }

	onSubmit(fileForm) {
		this.service.mongoSelectOne("files", "{id:1}", "{id:-1}").subscribe(
			data => {
				// the new file will have maxID+1
				fileForm.id = data[0].id + 1;
				this.service.mongoInsert("files", fileForm).subscribe();
				this.formSubmitted = true;
			}
		);
	}

}
