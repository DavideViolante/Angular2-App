import {Injectable} from 'angular2/core';

import {Http} from 'angular2/http';
import {Headers} from 'angular2/http';

import 'rxjs/add/operator/map';

@Injectable()

export class MongoAPIService {

	private mongoURL: string = "https://api.mongolab.com/api/1/databases/masterthesis/collections/";
	private apiKey: string = "DrWjz1L1mpb4g0701x7BS7VAC-vxBlpr";

	constructor(private http: Http) {}

	// SELECT
	mongoGet(collection: string, query: string) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	// INSERT TEST
	mongoPostTest(collection: string, fileObject) {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");

		return this.http.post(this.mongoURL + collection + "?apiKey=" + this.apiKey,
			//JSON.stringify({ x: 1, y: 2 }),
			JSON.stringify(fileObject),
			{ headers: headers }
		).map(res => res.json());

	}
}