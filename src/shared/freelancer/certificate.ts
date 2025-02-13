export type CertificateType = 'CERTIFICATE' | 'LICENSE';

export interface IFreelancerCertificateRequest {
	name: string;
	dateOfObtaining: string;
	endDate?: string;
	certificateType: CertificateType;
	info: string;
}

export interface IFreelancerCertificate {
	id: number;
	name: string;
	dateOfObtaining: string;
	endDate: string | null;
	certificateType: CertificateType;
	info: string;
}