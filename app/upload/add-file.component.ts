import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'add-file',
    templateUrl: 'app/template/addFile.html',
    directives: [ROUTER_DIRECTIVES]
})

export class AddFileComponent {
	private cats = new Array<string>();
	private formSubmitted = false;

	constructor(private service: MongoAPIService) {
		this.service.mongoSelect('cats', '').subscribe(
			data => this.cats = data
		);
	}

	onSubmit(fileForm) {
		console.log(fileForm);
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
