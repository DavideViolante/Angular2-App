import {Pipe} from 'angular2/core';

@Pipe({ name: 'sortByDLS' })

export class SortByDLSPipe {
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
			return (a.dls > b.dls) ? pOne : ((b.dls > a.dls) ? mOne : 0);
		});
	}
}