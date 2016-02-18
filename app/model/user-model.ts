export class UserModel {
	id: number;
	username: string;
	password: string;
	email: string;
	role: string;
	joined: number;
	session: string;

	constructor(id?: number, username?: string, password?: string, email?: string, role?: string, session?: string) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.joined = Date.now();
		this.session = session;
	}
}