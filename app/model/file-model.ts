export class FileModel {
	id: number;
	name: string;
	cat: string;
	authors = [];
	imgurl = [];
	dlurl: string;

	dls: number;
	likes = [];
	dislikes = [];
	favs = [];

	added: number; // date in epoch format

	constructor(id?: number, name?: string, cat?: string, authors?: Array<string>, imgurl?: Array<string>, dlurl?: string) {
		this.id = id;
		this.name = name;
		this.cat = cat;
		this.authors = authors;
		this.imgurl = imgurl;
		this.dlurl = dlurl;

		this.dls = 0;
		this.likes = [];
		this.dislikes = [];
		this.favs = [];

		this.added = Date.now();
	}
}