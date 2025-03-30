export interface IOnboardingRegistrationForm {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	privacy: boolean;
	regulations: boolean;
}