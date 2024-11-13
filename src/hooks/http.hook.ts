import {useCallback, useState} from "react";
import {ErrorMessage} from "../constans/ErrorMessage.ts";

type HTTPRequestMethods = 'GET' | 'POST' | 'PATCH' | 'DELETE';

export type LoadingStatusOptions = 'idle' | 'loading' | 'error';

interface HTTPHeaders {
	[key: string]: string;
}

interface RequestConfig {
	url: string;
	method?: HTTPRequestMethods;
	body?: string | null;
	headers?: HTTPHeaders;
	onError: (status: number) => ErrorMessage;
}

interface HTTPResponse {
	loadingStatus: LoadingStatusOptions;
	errorMessage: string | null;
	sendRequest: (config: RequestConfig) => Promise<any>;
}

const baseUrl: string = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const useHttp = (): HTTPResponse => {
	const [loadingStatus, setLoadingStatus] = useState<LoadingStatusOptions>('idle');
	const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

	const sendRequest = useCallback(async (
		{url, method = 'GET', body = null, headers = {}, onError}: RequestConfig,
	): Promise<any> => {
		setLoadingStatus('loading');

		const locationPath = window.location.pathname;
		const isAuthPage = locationPath === '/login' || locationPath === '/register';

		const token = localStorage.getItem('token');
		const authHeaders: HTTPHeaders = {
			'Content-Type': 'application/json',
			...(token && !isAuthPage ? { 'Authorization': `Bearer ${token}` } : {}),
			...headers,
		};

		try {
			const response = await fetch(`${baseUrl}${url}`, {method, body, headers: authHeaders});
			if (!response.ok) {
				if (response.status === 500) {
					setErrorMessage(ErrorMessage.SERVER_ERROR);
				} else if (response.status === 403) {
					setErrorMessage(ErrorMessage.TOKEN_EXPIRED_OR_INVALID)
				} else {
					const errorMessage = onError(response.status);
					setErrorMessage(errorMessage);
				}
				setLoadingStatus('error');
				return;
			}
			const data = await response.json();
			setLoadingStatus('idle');
			return data;
		} catch (e) {
			setErrorMessage(ErrorMessage.SERVER_ERROR);
			setLoadingStatus('error');
			console.log(e);
		}
	}, []);

	return {loadingStatus, errorMessage, sendRequest};
}