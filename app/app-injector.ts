import {Injector} from 'angular2/core';

// code by brandonroberts @ http://plnkr.co/users/brandonroberts

let appInjectorRef: Injector;
export const appInjector = (injector?: Injector):Injector => {
	if (injector) {
	  appInjectorRef = injector;
	}

	return appInjectorRef;
};