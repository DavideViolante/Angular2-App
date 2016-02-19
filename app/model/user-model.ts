export class UserModel {
	id: number;
	username: string;
	password: string;
	email: string;
	role: string;
	joined: number;
	website: string;
	location: string;
	birthday: string;
	session: string;

	constructor(id?: number,
				username?: string,
				password?: string,
				email?: string,
				role?: string,
				website?: string,
				location?: string,
				birthday?: string) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.website = website;
		this.location = location;
		this.birthday = birthday;

		this.joined = Date.now();
		this.session = "";
	}
}