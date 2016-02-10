import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'authentication',
    template: '',
    providers: [MongoAPIService]
})

export class AuthenticationComponent {
    private loggedIn;

    constructor(private service: MongoAPIService) {
        this.loggedIn = false;
    }

    login() {
        //this.loggedIn = true;
        if (localStorage.getItem("id") && localStorage.getItem("session")) {
            this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
                data => {
                    if (data.length > 0) {
                        (data[0].session === localStorage.getItem("session")) ? this.loggedIn = true : this.loggedIn = false;
                        //(data[0].role === "admin") ? this.isAdmin = true : this.isAdmin = false;
                    } else {
                        this.loggedIn = false;
                        //this.isAdmin = false;
                    }
                }
            );
        } else {
            this.loggedIn = false;
        }
    }

    logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("session");
        this.loggedIn = false;
    }

    check() {
        return Observable.of(this.loggedIn);
    }
}