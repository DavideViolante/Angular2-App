import {Injectable} from 'angular2/core';

@Injectable();

export class FileModel {
	id: number;
	name: string;
	cat: string;
	authors: Array<string> = [];
	dls: number;
	likes: number;
	dislikes: number;
	imgurl: Array<string> = [];
	//private youtubeurl: Array<string> = [];
	dlurl: string;

	constructor(id?: number, name?: string, cat?: string, authors?: Array<string>, imgurl?: Array<string>, dlurl?: string) {
		this.id = id;
		this.name = name;
		this.cat = cat;
		this.authors = authors;
		this.imgurl = imgurl;
		this.dlurl = dlurl;

		this.dls = 0;
		this.likes = 0;
		this.dislikes = 0;
	}
}