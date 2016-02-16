import {Pipe} from 'angular2/core';

@Pipe({ name: 'sort' })

export class SortPipe {
	// args[0]: sorting way
	// args[1]: field to sort by
	transform(array, args: string[]) {
		if (args[0] == "0") return array;
		return array.sort(function(a, b) {
			if (+args[0] > 0) {
				var pOne = 1;
				var mOne = -1;
			} else {
				var pOne = -1;
				var mOne = 1;
			}
			return (a[args[1]] > b[args[1]]) ? pOne : ((b[args[1]] > a[args[1]]) ? mOne : 0);
		});
	}
}