import { IFreelancerCertificate } from "@shared/freelancer/certificate.ts";

export interface ICertificateItemProps {
	certificate: IFreelancerCertificate;
	isModalItem?: boolean;
	onPatch?: () => void;
	onDelete?: () => void;
}