import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {AuthenticationComponent} from './authentication.component';

@Component({
    selector: 'logout',
    template: `<div class="alert alert-success" role="alert">
			     <i class="fa fa-check-circle"></i> You successfully logged out! Redirecting... <i class="fa fa-spinner fa-spin"></i>
			   </div>`,
    directives: [ROUTER_DIRECTIVES]
})

export class LogoutComponent {

	constructor(private router: Router,
				private auth: AuthenticationComponent) {
		this.auth.logout(); 
		setTimeout(() => this.router.navigate(['Home']), 2000);
	}
}