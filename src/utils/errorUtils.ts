import { ErrorMessages } from "@shared/errorMessages.ts";

export type ErrorHandler = (status: number, message?: string) => ErrorMessages;

export const getErrorMessage: ErrorHandler = (status, message = '') => {
	switch (status) {
		case 404:
			if (message === 'Picture not found') {
				return ErrorMessages.BACKGROUND_PICTURE_NOT_FOUND;
			}
			if (message === 'User not found') {
				return ErrorMessages.USER_NOT_FOUND;
			}
			return ErrorMessages.INVALID_CREDENTIALS;
		case 403:
			localStorage.removeItem('token');
			return ErrorMessages.TOKEN_EXPIRED_OR_INVALID;
		case 409:
			return ErrorMessages.USER_ALREADY_EXISTS;
		case 500:
			return ErrorMessages.SERVER_ERROR;
		default:
			return ErrorMessages.UNKNOWN_ERROR;
	}
};