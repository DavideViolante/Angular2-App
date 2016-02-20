import {Injectable} from 'angular2/core';

import {Http} from 'angular2/http';
import {Headers} from 'angular2/http';

import 'rxjs/add/operator/map';

@Injectable()

export class MongoAPIService {

	// API DOCS: http://docs.mongolab.com/data-api/

	private mongoURL: string = "https://api.mongolab.com/api/1/databases/masterthesis/collections/";
	private apiKey: string = "DrWjz1L1mpb4g0701x7BS7VAC-vxBlpr";

	cats = [];
	files = [];
	users = [];
	totFiles = 0;

	constructor(private http: Http) {
		this.http.get(this.mongoURL + "cats" + '?apiKey=' + this.apiKey).map(res => res.json()).subscribe(
			data => this.cats = data,
			error => console.log("Error loading categories."),
			() => console.log("Categories loaded.")
		);
		this.http.get(this.mongoURL + "files" + '?apiKey=' + this.apiKey).map(res => res.json()).subscribe(
			data => {
				this.files = data;
				this.totFiles = this.files.length;
			},
			error => console.log("Error loading files."),
			() => console.log("Files loaded.")
		);
		this.http.get(this.mongoURL + "users" + '?apiKey=' + this.apiKey).map(res => res.json()).subscribe(
			data => this.users = data,
			error => console.log("Error loading users."),
			() => console.log("Users loaded.")
		);

	}

	// f: fields to include: {id:1}  1 yes, 0 no
	// s: sort direction: {id:-1}    1 ASC -1 DESC
	mongoSelectOne(collection: string, field: string, sort: string) {
		return this.http.get(this.mongoURL + collection + '?f=' + field + '&s=' + sort + '&l=1&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	mongoSelect(collection: string, query: string) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	mongoCount(collection: string, query: string) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&c=true&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	// sk: results to skip
	// l: limit
	/*mongoSelectSkip(collection: string, query: string, sk: number, l: number) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&sk=' + sk + '&l=' + l + '&apiKey=' + this.apiKey)
			.map(res => res.json());
	}*/

	mongoInsert(collection: string, fileObj) {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		return this.http.post(this.mongoURL + collection + "?apiKey=" + this.apiKey,
			JSON.stringify(fileObj), // {"x":1, "y":2}
			{ headers: headers }
		).map(res => res.json());
	}

	mongoUpdate(collection: string, fileID: string, newValueObj) {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		return this.http.put(this.mongoURL + collection + '?q=' + fileID + '&apiKey=' + this.apiKey, //{"_id":123}
			JSON.stringify({ "$set": newValueObj }), //{ "x": 3 }
			{ headers: headers }
		).map(res => res.json());
	}
	
	mongoDelete(collection: string, mongoID) {
		return this.http.delete(this.mongoURL + collection + "/" + mongoID + '?apiKey=' + this.apiKey).map(res => res.json());
	}
}