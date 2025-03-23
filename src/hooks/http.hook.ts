import { useCallback, useState } from "react";
import { ErrorMessages } from "@shared/errorMessages.ts";
import { getErrorMessage } from "@utils/errorUtils.ts";
import { AUTH_PAGES } from "@constants/constans.ts";

type HTTPRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type LoadingStatusOptions = 'idle' | 'loading' | 'error';

interface IHTTPHeaders {
	[key: string]: string;
}

interface IRequestConfig {
	url: string;
	method?: HTTPRequestMethods;
	body?: string | FormData | null;
	headers?: IHTTPHeaders;
}

interface IHTTPResponse {
	loadingStatus: LoadingStatusOptions;
	errorMessage: string | null;
	sendRequest: (config: IRequestConfig) => Promise<any>;
}

interface IErrorResponse {
	message: string;
	status: number;
}

const baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const useHttp = (): IHTTPResponse => {
	const [ loadingStatus, setLoadingStatus ] = useState<LoadingStatusOptions>('idle');
	const [ errorMessage, setErrorMessage ] = useState<ErrorMessages | null>(null);

	const sendRequest = useCallback(async (
		{ url, method = 'GET', body = null, headers = {} }: IRequestConfig,
	): Promise<any> => {
		setLoadingStatus('loading');

		const locationPath = window.location.pathname;
		const isAuthPage = AUTH_PAGES.includes(locationPath);

		const token = localStorage.getItem('token');
		const authHeaders: IHTTPHeaders = {
			...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
			...(token && !isAuthPage ? { 'Authorization': `Bearer ${ token }` } : {}),
			...headers,
		};

		try {
			const response = await fetch(`${ baseUrl }${ url }`, { method, body, headers: authHeaders });
			if (!response.ok) {
				const errorData: IErrorResponse = await response.json().catch(() => null);
				const errorMessage = getErrorMessage(response.status, errorData.message);
				setErrorMessage(errorMessage);
				setLoadingStatus('error');
				return Promise.reject(errorMessage);
			}
			const contentType = response.headers.get('Content-Type');
			const hasBody = contentType?.includes('application/json');

			const data = hasBody ? await response.json().catch(() => null) : null;
			setLoadingStatus('idle');
			return data;

		} catch (e) {
			console.error(e);
			setLoadingStatus('error');
			setErrorMessage(ErrorMessages.SERVER_ERROR);
			return Promise.reject(new Error(ErrorMessages.SERVER_ERROR));
		}
	}, []);

	return { loadingStatus, errorMessage, sendRequest };
}