import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'logout',
    template: '<h3>You successfully logged out. <a [routerLink]="[\'Categories\']">Home</a></h3>',
    directives: [ROUTER_DIRECTIVES]
})

export class LogoutComponent {

	constructor() { 
		localStorage.removeItem("session");
		localStorage.removeItem("id");
	}
}