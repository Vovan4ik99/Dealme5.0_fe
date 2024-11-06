export interface LoginData {
	email: string;
	password: string;
}

export interface UserDataResponse {
	username: string;
	roles: string | string[];
}