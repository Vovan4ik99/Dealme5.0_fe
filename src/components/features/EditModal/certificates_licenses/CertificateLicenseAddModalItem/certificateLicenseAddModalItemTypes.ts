import {ISaveableChildProps} from "@context/ModalContext/ModalContext.ts";
import {CertificateType, IFreelancerCertificate} from "@shared/freelancerTypes.ts";

export interface ICertificateLicenseAddModalItemProps extends ISaveableChildProps {
	onSave: (certificate: Omit<IFreelancerCertificate, 'id'>) => void;
	certificate?: Omit<IFreelancerCertificate, 'id'>;
}

export interface IFormValues {
	type: CertificateType;
	name: string;
	info: string;
}

export type DateErrorKey = 'startMonth' | 'startYear' | 'endMonth' | 'endYear';

export const DATE_ERROR_MESSAGE = {
	startMonth: 'Wybierz miesiąc początkowy',
	endMonth: 'Wybierz miesiąc końcowy',
	startYear: 'Wybierz początkowy rok',
	endYear: 'Wybierz końcowy rok'
} as const;