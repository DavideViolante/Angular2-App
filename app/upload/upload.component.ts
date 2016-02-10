import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ComponentInstruction, CanActivate} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {UploadHomeComponent} from './upload-home.component';
import {AddUserComponent} from './add-user.component';
import {AddFileComponent} from './add-file.component';

import {isLoggedIn} from '../account/is-logged-in';
import {AuthenticationComponent} from '../account/authentication.component';

@Component({
    selector: 'upload',
    templateUrl: 'app/template/upload.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '/', name: 'UploadHome', component: UploadHomeComponent, useAsDefault: true},
	{ path: '/addFile', name: 'AddFile', component: AddFileComponent },
	{ path: '/addUser', name: 'AddUser', component: AddUserComponent }
])

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
	return isLoggedIn(next, previous);
})

export class UploadComponent {

	constructor(private auth: AuthenticationComponent) { }

}

