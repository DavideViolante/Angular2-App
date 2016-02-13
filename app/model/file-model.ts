export class FileModel {
	private id: number;
	private name: string;
	private cat: string;
	private authors: Array<string> = [];
	private dls: number;
	private likes: number;
	private dislikes: number;
	private imgurl: Array<string> = [];
	//private youtubeurl: Array<string> = [];
	private url: string;

	constructor(id?: number, name?: string, cat?: string, authors?: Array<string>) {
		this.id = id;
		this.name = name;
		this.cat = cat;
		this.authors = authors;
		//this.imgurl = imgurl;
		this.imgurl = [];

		this.dls = 0;
		this.likes = 0;
		this.dislikes = 0;
		this.url = "";
	}

	getID() { return this.id; }
	setID(id) { this.id = id; }

	getName() { return this.name; }
	setName(name) { this.name = name; }

	getCat() { return this.cat; }
	setCat(cat) { this.cat = cat; }

	/*addImgUrl(url: string) {
		this.imgurl.push(url);
	}*/

}