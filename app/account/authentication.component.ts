import {Component} from 'angular2/core';
import {Observable} from 'rxjs/Observable';

import {MongoAPIService} from '../service/mongoapi.service';

@Component({
    selector: 'authentication',
    template: ''
})

export class AuthenticationComponent {
    private loggedIn;
    private isAdmin;

    constructor(private service: MongoAPIService) {
        this.loggedIn = false;
        this.isAdmin = false;
    }

    login() {
        if (localStorage.getItem("id") && localStorage.getItem("session")) {
            this.service.mongoSelect("users", "{id:" + localStorage.getItem("id") + "}").subscribe(
                data => {
                    if (data.length > 0) {
                        (data[0].session === localStorage.getItem("session")) ? this.loggedIn = true : this.loggedIn = false;
                        (data[0].role === "admin") ? this.isAdmin = true : this.isAdmin = false;
                    } else {
                        this.loggedIn = false;
                        this.isAdmin = false;
                    }
                }
            );
        } else {
            this.loggedIn = false;
            this.isAdmin = false;
        }
    }

    logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("session");
        this.loggedIn = false;
        this.isAdmin = false;
    }

    check() {
        return Observable.of(this.loggedIn, this.isAdmin);
    }
}