export type UserRole = 'FREELANCER' | 'INVESTOR';

export interface ICreateUserRequest {
	firstName: string;
	lastName: string;
	company: string;
	email: string;
	password: string;
}

export interface ICreateUserResponse {
	email: string;
	firstName: string;
	lastName: string;
	company: string;
}

export interface ILoggedUserResponse {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	isOnboardingPassed: boolean | undefined;
}

export interface IUserAvatarResponse {
	pictureId: number;
	picture: string;
}

export interface ILoggedUserData extends ILoggedUserResponse {
	role: UserRole;
}