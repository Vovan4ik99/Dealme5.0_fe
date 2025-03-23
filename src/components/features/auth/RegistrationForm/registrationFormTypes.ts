import {ICreateUserRequest} from "@shared/userTypes.ts";

export interface RegistrationFormData extends ICreateUserRequest {
	passwordConfirmation: string;
	terms: boolean;
}