import styles from './CertificateLicenseEditModalItem.module.scss';
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { IFreelancerCertificate, IFreelancerCertificateRequest } from "@shared/freelancerTypes.ts";
import CertificateItem
	from "@components/features/FreelancerProfile/main/CertificatesAndLicenses/CertificateItem/CertificateItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import CertificateLicenseAddModalItem
	from "@components/features/EditModal/certificates_licenses/CertificateLicenseAddModalItem/CertificateLicenseAddModalItem.tsx";
import { useFreelancerCertificateService } from "@services/freelancerCertificateService.ts";

const CertificateLicenseEditModalItem = () => {

	const [ certificates, setCertificates ] = useState<IFreelancerCertificate[]>([]);
	const { openModal } = useModal();

	const {
		getFreelancerCertificates,
		patchCertificate,
		deleteCertificate,
		addCertificate,
		loadingStatus
	} = useFreelancerCertificateService();

	const fetchFreelancerCertificates = useCallback(() => {
		getFreelancerCertificates()
			.then(setCertificates)
			.catch(console.error);
	}, [ getFreelancerCertificates ]);

	useEffect(() => {
		fetchFreelancerCertificates();
	}, [ fetchFreelancerCertificates ]);

	const handleDeleteCertificate = (id: number) => {
		deleteCertificate(id)
			.then(fetchFreelancerCertificates)
			.catch(console.error);
	};

	const handleAddCertificate = (certificate: IFreelancerCertificateRequest) => {
		addCertificate(certificate)
			.then(fetchFreelancerCertificates)
			.catch(console.error);
	};

	const handlePatchCertificate = (id: number, certificate: IFreelancerCertificateRequest) => {
		patchCertificate(id, certificate)
			.then(fetchFreelancerCertificates)
			.catch(console.error);
	};

	const onAddCertificate = () => {
		openModal({
			id: 'CertificateLicenseAddModalItem',
			title: 'Dodaj licencje lub certyfikat',
			btnText: 'Dodaj licencje lub certyfikat',
			btnWithIcon: true,
			withSaveBtn: true,
			shouldCloseOnSaving: false,
			child: <CertificateLicenseAddModalItem onSave={ handleAddCertificate }/>
		});
	};

	const onEditCertificate = (certificate: IFreelancerCertificate) => {
		openModal({
			id: 'CertificateLicenseAddModalItem',
			title: 'Edytuj licencje lub certyfikat',
			btnText: 'Edytuj licencje lub certyfikat',
			btnWithIcon: false,
			withSaveBtn: true,
			shouldCloseOnSaving: false,
			child: <CertificateLicenseAddModalItem certificate={ certificate }
			                                       isEdit={ true }
			                                       onSave={
				                                       (updatedCertificate: IFreelancerCertificateRequest) =>
					                                       handlePatchCertificate(certificate.id, updatedCertificate)
			                                       }/>
		});
	};

	const renderCertificates = () => {
		if (certificates.length === 0) {
			return <></>;
		}
		return certificates.map(certificate => {
			return <CertificateItem key={ certificate.id }
			                        certificate={ certificate }
			                        isModalItem
			                        onDelete={ () => handleDeleteCertificate(certificate.id) }
			                        onPatch={ () => onEditCertificate(certificate) }/>
		});
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['modal'] }>
			<div className={ styles['modal__wrapper'] }>
				{ renderCertificates() }
			</div>
			<button className={ 'btn btn--modal' } onClick={ onAddCertificate }>
				<AddIcon/>
				<span>Dodaj licencje lub certyfikat</span>
			</button>
		</div>
	);
};

export default CertificateLicenseEditModalItem;