import {ErrorMessages} from "@shared/errorMessages.ts";

export type ErrorHandler = (status: number, message?: string) => ErrorMessages;

export const getErrorMessage: ErrorHandler = (status, message = '') => {
	switch (status) {
		case 404:
			return ErrorMessages.INVALID_CREDENTIALS;
		case 403:
			return ErrorMessages.TOKEN_EXPIRED_OR_INVALID;
		case 409:
			return ErrorMessages.USER_ALREADY_EXISTS;
		case 500:
			return ErrorMessages.SERVER_ERROR;
		default:
			return ErrorMessages.UNKNOWN_ERROR;
	}
};