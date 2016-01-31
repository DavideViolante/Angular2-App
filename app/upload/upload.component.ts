import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {AddFileComponent} from './add-file.component';

@Component({
    selector: 'upload',
    templateUrl: 'app/view/upload.html',
    providers: [MongoAPIService],
    directives: [ROUTER_DIRECTIVES]
})

export class UploadComponent {

	constructor(private service: MongoAPIService) {}

}
