import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'logout',
    template: `<div class="alert alert-success" role="alert">
			     <i class="fa fa-check-circle"></i> You successfully logged out! Redirecting... <i class="fa fa-spinner fa-spin"></i>
			   </div>`,
    directives: [ROUTER_DIRECTIVES]
})

export class LogoutComponent {

	constructor(private router: Router) { 
		localStorage.removeItem("session");
		localStorage.removeItem("id");
		setTimeout(() => this.router.navigate(['Categories']), 2000);
	}
}