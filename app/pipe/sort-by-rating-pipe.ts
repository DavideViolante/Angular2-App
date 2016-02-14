import {Pipe} from 'angular2/core';

@Pipe({ name: 'sortByRating' })

export class SortByRatingPipe {
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
			return (a.likes > b.likes) ? pOne : ((b.likes > a.likes) ? mOne : 0);
		});
	}
}