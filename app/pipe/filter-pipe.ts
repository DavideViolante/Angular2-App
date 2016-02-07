import {Pipe} from 'angular2/core';

@Pipe({ name: 'filter' })

export class FilterPipe {
	transform(array, query: string) {
		if (query[0] === "" || query[0].length < 2) {
			return array;
		} else {
			// if file name contains the query
			return array.filter(elem => 
				elem.name.toLowerCase().indexOf(query[0].toLowerCase()) > -1);
		}
	}
}
	