import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ComponentInstruction, CanActivate} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {UploadHomeComponent} from './upload-home.component';
import {AddFileComponent} from './add-file.component';
import {AddUserComponent} from './add-user.component';
import {AddCategoryComponent} from './add-category.component';

import {isLoggedIn} from '../account/is-logged-in';
import {AuthenticationComponent} from '../account/authentication.component';

@Component({
    selector: 'upload',
    templateUrl: 'app/upload/upload.html',
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
	{ path: '/', name: 'UploadHome', component: UploadHomeComponent, useAsDefault: true},
	{ path: '/add-file', name: 'AddFile', component: AddFileComponent },
	{ path: '/add-user', name: 'AddUser', component: AddUserComponent },
	{ path: '/add-category', name: 'AddCategory', component: AddCategoryComponent }
])

@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
	return isLoggedIn(next, previous);
})

export class UploadComponent {

	constructor(private auth: AuthenticationComponent) { }

}

