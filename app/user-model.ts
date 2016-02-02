export class User {
	private id: number;
	private username: string;
	private password: string;
	private role: string;


	constructor(id?: number, username?: string, password?: string, role?: string) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.role = role;
	}

	getID() { return this.id; }
	setID(id) { this.id = id; }

	getUsername() { return this.username; }
	setUsername(username) { this.username = username; }

	getPassword() { return this.password; }
	setPassword(password) { this.password = password; }

	getRole() { return this.role; }
	setRole(role) { this.role = role; }
}