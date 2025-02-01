import {IFreelancerCertificate} from "@shared/freelancerTypes.ts";

export interface ICertificateItemProps {
	certificate: IFreelancerCertificate;
	isModalItem?: boolean;
	onPatch?: () => void;
	onDelete?: () => void;
}