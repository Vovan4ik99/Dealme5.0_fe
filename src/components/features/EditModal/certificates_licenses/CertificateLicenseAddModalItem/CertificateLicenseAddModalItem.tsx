import styles from './CertificateLicenseAddModalItem.module.scss';
import React, { useCallback, useEffect } from "react";
import { ICertificateForm, ICertificateLicenseAddModalItemProps, } from "./certificateLicenseAddModalItemTypes.ts";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import SwitchBtn from "@ui/SwitchBtn/SwitchBtn.tsx";
import { useForm, useWatch } from "react-hook-form";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import DatesForm from "@components/features/EditModal/certificates_licenses/DatesForm/DatesForm.tsx";
import { IFreelancerCertificateRequest } from "@shared/freelancerTypes.ts";
import { createDateFromYearMonth, mapDateToYearMonth } from "@utils/dateUtils.ts";

const CertificateLicenseAddModalItem: React.FC<ICertificateLicenseAddModalItemProps> = ({
	                                                                                        onSave,
	                                                                                        registerOnSave,
	                                                                                        handleClose,
	                                                                                        certificate
                                                                                        }) => {

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		trigger,
		unregister,
		clearErrors,
		control
	} = useForm<ICertificateForm>({
		shouldFocusError: false,
		mode: 'onTouched',
		defaultValues: {
			name: certificate?.name,
			info: certificate?.info,
			type: certificate?.certificateType ?? 'CERTIFICATE',
			startMonth: mapDateToYearMonth(certificate?.dateOfObtaining)?.month,
			startYear: mapDateToYearMonth(certificate?.dateOfObtaining)?.year,
			endMonth: mapDateToYearMonth(certificate?.endDate)?.month,
			endYear: mapDateToYearMonth(certificate?.endDate)?.year,
		}
	});

	const certificateType = useWatch({ name: 'type', control });
	const startMonth = useWatch({ name: 'startMonth', control });
	const startYear = useWatch({ name: 'startYear', control });
	const endMonth = useWatch({ name: 'endMonth', control });
	const endYear = useWatch({ name: 'endYear', control });

	const onTypeChange = () => {
		if (certificateType === 'CERTIFICATE') {
			setValue('type', 'LICENSE');
			return;
		}
		setValue('type', 'CERTIFICATE');
	};

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			const request: IFreelancerCertificateRequest = {
				name: data.name,
				info: data.info,
				dateOfObtaining: createDateFromYearMonth(startYear, startMonth),
				certificateType
			};

			if (endMonth && endYear) {
				request.endDate = createDateFromYearMonth(endYear, endMonth);
			}

			onSave(request);
			handleClose!();
		})();
	}, [ certificateType, endMonth, endYear, handleClose, handleSubmit, onSave, startMonth, startYear ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<form className={ styles['item'] }>
			<div className={ styles['item__label'] }>
				<span className={ styles['item__text'] }>Wybierz rodzaj</span>
				<div className={ styles['item__icon'] }>
					<InfoIcon width={ 14 } height={ 14 }/>
				</div>
			</div>
			<SwitchBtn isActive={ certificateType === 'CERTIFICATE' }
			           onClick={ onTypeChange }
			           leftContent={ 'Certyfikat' }
			           rightContent={ 'Licencja' }/>
			<div className={ styles['item__inputs'] }>
				<CustomInput preset={ 'certificateName' }
				             register={ register }
				             errorMessage={ errors.name?.message }/>
				<CustomInput preset={ 'certificateOrganization' }
				             register={ register }
				             errorMessage={ errors.info?.message }/>
			</div>
			<h3 className={ styles['item__title'] }>W jakim okresie zdobywałeś certyikat?</h3>
			<DatesForm register={ register }
			           setValue={ setValue }
			           formData={ { startMonth, startYear, endMonth, endYear } }
			           unregister={ unregister }
			           clearErrors={ clearErrors }
			           checkboxLabel={ 'Jestem w trakcie' }
			           trigger={ trigger }
			           errors={ errors }/>
		</form>
	);
}

export default CertificateLicenseAddModalItem;