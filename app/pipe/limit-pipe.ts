import {Pipe} from 'angular2/core';

@Pipe({ name: 'limit' })

// TODO: Generalize this function

export class LimitPipe {
	// args[0]: limit
	transform(array, args: string[]) {
		console.log(array.slice(0, 9));
		return array.slice(0, +args[0]);
	}
}
	