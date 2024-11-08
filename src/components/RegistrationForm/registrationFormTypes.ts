export interface CreateUserData {
	firstName: string;
	lastName: string;
	company: string;
	email: string;
	password: string;
}

export interface RegistrationFormData extends CreateUserData {
	passwordConfirmation: string;
	terms: boolean;
}

export type UserRole = "INVESTOR" | "FREELANCER";