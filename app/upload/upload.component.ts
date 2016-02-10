import {Component, Injector} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES, CanActivate, ComponentInstruction} from 'angular2/router';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'upload',
    templateUrl: 'app/template/upload.html',
    directives: [ROUTER_DIRECTIVES]
})

/*@CanActivate((next: ComponentInstruction, previous: ComponentInstruction) => {
	return new Promise((resolve) => {
		resolve(true);
	});
})*/

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

