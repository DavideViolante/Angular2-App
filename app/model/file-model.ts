export class File {
	private id: number;
	private authors: Array<string> = [];
	//private dls: number,
	private imgurl: Array<string> = [];

	private likes: number;

	private name: string;
	private cat: string;

	constructor(id?: number, authors?: Array<string>, imgurl?: Array<string>, name?: string, cat?: string) {
		this.id = id;
		this.authors = authors;
		this.imgurl = imgurl;
		this.name = name;
		this.cat = cat;
	}

	getID() { return this.id; }
	setID(id) { this.id = id; }

	/*getAuthor() { return this.author; }
	setAuthor(author) { this.author = author; }
*/
	addImgUrl(url: string) {
		this.imgurl.push(url);
	}

	getName() { return this.name; }
	setName(name) { this.name = name; }

	getCat() { return this.cat; }
	setCat(cat) { this.cat = cat; }

	setLikes(likes) {
		this.likes = likes;
	}

}