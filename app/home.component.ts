import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {MongoAPIService} from './service/mongoapi.service';

@Component({
    selector: 'home',
    template: '',
    directives: [ROUTER_DIRECTIVES]
})

export class HomeComponent {

	private isLoggedIn = false;
	private isAdmin = false;

	constructor(private service: MongoAPIService) {	}
}
