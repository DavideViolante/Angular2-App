///<reference path="../node_modules/angular2/typings/browser.d.ts"/> 
import {bootstrap}        from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS}	  from 'angular2/http';

import {AppComponent}     from './app.component';

import {MongoAPIService}  from './service/mongoapi.service';

import {appInjector} from './app-injector';
import {AuthenticationComponent} from './account/authentication.component';
import 'rxjs/Rx';

bootstrap(AppComponent, [
	ROUTER_PROVIDERS,
	HTTP_PROVIDERS,
	MongoAPIService,
	AuthenticationComponent
]).then((appRef) => appInjector(appRef.injector));
