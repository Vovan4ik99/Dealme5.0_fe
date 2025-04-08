export interface ILoginRequest {
	email: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
}

export interface IInvestorAuthTokenResponse {
	token: string,
	sig: string,
	email: string
}

export interface IRegisterMockInvestorRequest {
	email: string;
	phone?: string;
}