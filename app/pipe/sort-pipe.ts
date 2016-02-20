import {Pipe} from 'angular2/core';

@Pipe({ name: 'sort' })

export class SortPipe {
	// args[0]: sorting way
	// args[1]: field to sort by
	transform(array, args: string[]) {
		if (args[0] == "0") return array;
		return array.sort(function(a, b) {
			if (+args[0] > 0) {	var pOne = 1; var mOne = -1; }
			else 			  { var pOne = -1; var mOne = 1; }

			if(args[1] === "likes") 
				return (a.likes.length > b.likes.length) ? pOne : ((b.likes.length > a.likes.length) ? mOne: 0);
			if(args[1] === "favs")
				return (a.favs.length > b.favs.length) ? pOne : ((b.favs.length > a.favs.length) ? mOne : 0);
			if (args[1] === "name") {
				return (a[args[1]].toLowerCase() > b[args[1]].toLowerCase()) ? pOne : ((b[args[1]].toLowerCase() > a[args[1]].toLowerCase()) ? mOne : 0);
			}
			
			return (a[args[1]] > b[args[1]]) ? pOne : ((b[args[1]] > a[args[1]]) ? mOne : 0);
		});
	}
}