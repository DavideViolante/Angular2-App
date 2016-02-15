export class UserModel {
	private id: number;
	private username: string;
	private password: string;
	private email: string;
	private role: string;
	private session: string;

	constructor(id?: number, username?: string, password?: string, email?: string, role?: string, session?: string) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.role = role;
		this.session = session;
	}

	getID() { return this.id; }
	setID(id) { this.id = id; }

	getUsername() { return this.username; }
	setUsername(username) { this.username = username; }

	getPassword() { return this.password; }
	setPassword(password) { this.password = password; }

	getEmail() { return this.email; }
	setEmail(email) { this.email = email; }

	getRole() { return this.role; }
	setRole(role) { this.role = role; }

}