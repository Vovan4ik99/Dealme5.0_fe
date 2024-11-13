export type UserRole = 'FREELANCER' | 'INVESTOR';

export interface CreateUserRequest {
	firstName: string;
	lastName: string;
	company: string;
	email: string;
	password: string;
}

export interface CreateUserResponse {
	email: string;
	firstName: string;
	lastName: string;
	company: string;
	phone: string;
}

export interface LoggedUserResponse {
	firstName: string;
	lastName: string;
	experienceLevel: string;
}

export interface LoggedUserData extends LoggedUserResponse {
	role: UserRole;
}