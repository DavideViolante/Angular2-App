import {Pipe} from 'angular2/core';

@Pipe({ name: 'initCase' })

export class InitCasePipe {
	transform(value: string) {
		if(value)
			return value.toLowerCase().replace(/(?:^|\s)[a-z]/g, function(m) {
				return m.toUpperCase();
			});
	}
}