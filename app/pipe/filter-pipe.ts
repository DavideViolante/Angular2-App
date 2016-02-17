import {Pipe} from 'angular2/core';

@Pipe({ name: 'filter' })

export class FilterPipe {
	// args[0]: query
	// args[1]: field
	transform(array, args: string[]) {
		if (args[0] === "" || args[0].length < 2) {
			return array;
		} else {
			// if the field contains the query
			return array.filter(elem => 
				elem[args[1]].toLowerCase().indexOf(args[0].toLowerCase()) > -1);
		}
	}
}
	