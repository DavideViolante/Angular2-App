export class File {
	private id: number;
	private name: string;
	private cat: string;
	private authors: Array<string> = [];
	private dls: number;
	private likes: number;
	private dislikes: number;
	private imgurl: Array<string> = [];
	private youtubeurl: Array<string> = [];
	private dlurl: string;



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