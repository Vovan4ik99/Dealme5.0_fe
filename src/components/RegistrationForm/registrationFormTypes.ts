import {CreateUserRequest} from "../../shared/userTypes.ts";

export interface RegistrationFormData extends CreateUserRequest {
	passwordConfirmation: string;
	terms: boolean;
}