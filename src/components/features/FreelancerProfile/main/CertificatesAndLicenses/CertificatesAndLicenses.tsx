import styles from './CertificatesAndLicenses.module.scss';
import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useCallback, useEffect, useState } from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { IFreelancerCertificate, IFreelancerCertificateRequest } from "@shared/freelancerTypes.ts";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import CertificateLicenseAddModalItem
	from "@components/features/EditModal/certificates_licenses/CertificateLicenseAddModalItem/CertificateLicenseAddModalItem.tsx";
import CertificateItem
	from "@components/features/FreelancerProfile/main/CertificatesAndLicenses/CertificateItem/CertificateItem.tsx";
import CertificateLicenseEditModalItem
	from "@components/features/EditModal/certificates_licenses/CertificateLicenseEditModalItem/CertificateLicenseEditModalItem.tsx";
import { useFreelancerCertificateService } from "@services/freelancerCertificateService.ts";

const CertificatesAndLicenses = () => {

	const SECTION_ID: NavbarSectionKey = 'certifications';

	const { getFreelancerCertificates, addCertificate } = useFreelancerCertificateService();
	const { openModal } = useModal();

	const [ certificates, setCertificates ] = useState<IFreelancerCertificate[]>([]);

	const fetchCertificates = useCallback(() => {
		getFreelancerCertificates()
			.then(setCertificates)
			.catch(console.error);
	}, [ getFreelancerCertificates ]);

	useEffect(() => {
		fetchCertificates();
	}, [ fetchCertificates ]);

	const renderCertificates = () => {
		if (certificates.length === 0) {
			return <AlertItem kind={ 'neutral' }
			                  text={ 'Nie dodałeś żadnych certyfikatów i licencji' }/>
		}
		return certificates.map(certificate => {
			return <CertificateItem certificate={ certificate } key={ certificate.id }/>;
		});
	};

	const onCertificateAdd = () => {
		openModal({
			id: 'CertificateLicenseAddModalItem',
			title: 'Dodaj certyfikaty i licencje',
			shouldCloseOnSaving: false,
			btnText: 'Dodaj certyfikat',
			btnWithIcon: true,
			withSaveBtn: true,
			child: <CertificateLicenseAddModalItem onSave={ handleCertificateAdd }/>
		});
	};

	const onCertificateEdit = () => {
		openModal({
			id: 'CertificateLicenseEditModalItem',
			title: 'Edytuj certyfikaty i licencje',
			withSaveBtn: false,
			child: <CertificateLicenseEditModalItem/>,
			onClose: fetchCertificates
		});
	}

	const handleCertificateAdd = (certificate: IFreelancerCertificateRequest) => {
		addCertificate(certificate)
			.then(fetchCertificates)
			.catch(console.error);
	};

	return (
		<section id={ SECTION_ID } className={ styles['certificates'] }>
			<header className={ styles['certificates__header'] }>
				<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
				<div className={ styles['certificates__wrapper'] }>
					<ActionBtn kind={ 'Add' }
					           onClick={ onCertificateAdd }
					           withBorder={ true }
					           backgroundColor={ 'white' }/>
					{ certificates.length > 0 &&
                        <ActionBtn kind={ 'Edit' }
                                   onClick={ onCertificateEdit }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }/>
					}
				</div>
			</header>
			<div className={ styles['certificates__content'] }>
				{ renderCertificates() }
			</div>
		</section>
	);
}

export default CertificatesAndLicenses;