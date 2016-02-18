export class CommentModel {
	file: number;
	user: string;
	body: string;
	added: number; // date in epoch format

	constructor(file?: number, user?: string, body?: string) {
		this.file = file;
		this.user = user;
		this.body = body;
		this.added = Date.now();
	}
}