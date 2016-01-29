import {Pipe} from 'angular2/core';

@Pipe({ name: 'trimLowerCase' })

export class TrimLowerCasePipe {
	transform(value: string) {
		if(value)
			return value.toLowerCase().replace(/ /g, "-");
	}
}