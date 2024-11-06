import {useState, useCallback} from "react";
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

interface HTTPResponse<T> {
	loadingStatus: LoadingStatusOptions;
	errorMessage: string | null;
	sendRequest: (config: RequestConfig) => Promise<T | undefined>;
}

export const useHttp = <T>(): HTTPResponse<T> => {
	const [loadingStatus, setLoadingStatus] = useState<LoadingStatusOptions>('idle');
	const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

	const sendRequest = useCallback(async (
		{url, method = 'GET', body = null, headers = {'Content-Type': 'application/json'}, onError} : RequestConfig,
	): Promise<T | undefined> => {
		setLoadingStatus('loading');
		try {
			const response = await fetch(url, {method, body, headers});
			if (!response.ok) {
				if (response.status === 500) {
					setErrorMessage(ErrorMessage.SERVER_ERROR);
					setLoadingStatus('error');
				} else {
					const errorMessage = onError(response.status);
					setErrorMessage(errorMessage);
					setLoadingStatus('error');
				}
				return;
			}
			const data: T = await response.json();
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