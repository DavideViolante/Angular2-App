export class File {
	private id: number;
	private author: string;
	//private dls: number,
	public imgurl: Array<string> = [];
	private name: string;
	private cat: string;

	constructor(id?: number, author?: string, imgurl?: Array<string>, name?: string, cat?: string) {
		this.id = id;
		this.author = author;
		this.imgurl = imgurl;
		this.name = name;
		this.cat = cat;
	}

	getID() { return this.id; }
	setID(id) { this.id = id; }

	getAuthor() { return this.author; }
	setAuthor(author) { this.author = author; }

	addImgUrl(url: string) {
		this.imgurl.push(url);
	}

	getName() { return this.name; }
	setName(name) { this.name = name; }

	getCat() { return this.cat; }
	setCat(cat) { this.cat = cat; }

}