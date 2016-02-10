import {Component} from 'angular2/core';
import {Router, RouteConfig, ROUTER_DIRECTIVES, ComponentInstruction, CanActivate} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

import {UploadHomeComponent} from './upload-home.component';
import {AddUserComponent} from './add-user.component';
import {AddFileComponent} from './add-file.component';

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
/*@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
	return new Promise((resolve) => {
		resolve(true);
	});
})
*/
export class UploadComponent {
	private isLoggedIn = false;
	private isAdmin = false;

	constructor(private service: MongoAPIService,
				private router: Router) {
		if (localStorage.getItem("id")) {
			this.checkUser();
		} else {
			this.router.navigate(['Login']);
		}
	}

	checkUser() {
        this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
            data => {
                if (data.length > 0) {
                    (data[0].session === localStorage.getItem("session")) ? this.isLoggedIn = true : this.isLoggedIn = false;
                    (data[0].role === "admin") ? this.isAdmin = true : this.isAdmin = false;
                } else {
                    this.isLoggedIn = false;
                    this.isAdmin = false;
                }
            }
        );
    }

}

