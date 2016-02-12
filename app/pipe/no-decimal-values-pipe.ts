import {Pipe} from 'angular2/core';

@Pipe({ name: 'noDecimalValues' })

export class NoDecimalValues {
	transform(n: number) {
		return n | 0;
	}
}