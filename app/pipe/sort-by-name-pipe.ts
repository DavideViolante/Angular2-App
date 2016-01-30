import {Pipe} from 'angular2/core';

@Pipe({ name: 'sortByName' })

export class SortByNamePipe {
	transform(array, way: number) {
		if (way == 0) return array;

		return array.sort(function(a, b) {
			if (way > 0) {
				var pOne = 1;
				var mOne = -1;
			} else {
				var pOne = -1;
				var mOne = 1;
			}
			return (a.name > b.name) ? pOne : ((b.name > a.name) ? mOne : 0);
		});
	}
}