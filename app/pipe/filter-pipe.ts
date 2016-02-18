import {Pipe} from 'angular2/core';

@Pipe({ name: 'filter' })

// TODO: Generalize this function

export class FilterPipe {
	// args[0]: query
	// args[1]: field
	// args[2]: another field
	transform(array, args: string[]) {
		// don't filter if the query is empty or if it's too short
		if (args[0] === "" || args[0].length < 2) {
			return array;
		} else if (args[2]) {
			return array.filter(elem => elem[args[1]].toLowerCase().indexOf(args[0].toLowerCase()) > -1
									 || elem[args[2]].toLowerCase().indexOf(args[0].toLowerCase()) > -1);
		} else {
			return array.filter(elem =>	elem[args[1]].toLowerCase().indexOf(args[0].toLowerCase()) > -1);
		}
	}
}
	