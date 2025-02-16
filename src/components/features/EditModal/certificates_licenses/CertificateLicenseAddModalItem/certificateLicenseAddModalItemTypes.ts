import { ISaveableChildProps } from "@context/ModalContext/ModalContext.ts";
import {
	CertificateType,
	IFreelancerCertificate,
	IFreelancerCertificateRequest
} from "@shared/freelancer/certificate.ts";

export interface ICertificateLicenseAddModalItemProps extends ISaveableChildProps {
	onSave: (certificate: IFreelancerCertificateRequest) => void;
	certificate?: Omit<IFreelancerCertificate, 'id'>;
	isEdit?: boolean;
}

export interface ICertificateForm {
	type: CertificateType;
	name: string;
	info: string;
	startMonth: number;
	startYear: number;
	endMonth: number;
	endYear: number;
}