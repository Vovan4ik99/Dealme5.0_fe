import styles from './CertificateLicenseAddModalItem.module.scss';
import React, {useCallback, useEffect, useState} from "react";
import {
	DATE_ERROR_MESSAGE,
	DateErrorKey,
	ICertificateLicenseAddModalItemProps,
	IFormValues,
} from "./certificateLicenseAddModalItemTypes.ts";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import SwitchBtn from "@ui/SwitchBtn/SwitchBtn.tsx";
import {useForm} from "react-hook-form";
import CustomInput from "@ui/CustomInput/CustomInput.tsx";
import CertificateDatesItem
	from "@components/features/EditModal/certificates_licenses/CertificateDatesItem/CertificateDatesItem.tsx";
import {CertificateType, IFreelancerCertificate} from "@shared/freelancerTypes.ts";

const CertificateLicenseAddModalItem: React.FC<ICertificateLicenseAddModalItemProps> = ({
	                                                                                        onSave,
	                                                                                        registerOnSave,
	                                                                                        handleClose,
	                                                                                        certificate
                                                                                        }) => {

	const [type, setType] = useState<CertificateType>('CERTIFICATE');
	const [startMonth, setStartMonth] = useState<number>(0);
	const [startYear, setStartYear] = useState<number>(0);
	const [endMonth, setEndMonth] = useState<number>(0);
	const [endYear, setEndYear] = useState<number>(0);
	const [dateErrors, setDateErrors] = useState<Map<DateErrorKey, string>>(new Map());
	const [isOngoingChecked, setIsOngoingChecked] = useState<boolean>(false);

	const {register, handleSubmit, formState: {errors}, setValue} = useForm<IFormValues>({
		shouldFocusError: false,
		mode: 'onTouched',
	});

	const fillCertificateData = useCallback((certificate: Omit<IFreelancerCertificate, 'id'>) => {
		setValue('name', certificate.name);
		setValue('type', certificate.certificateType);
		setValue('info', certificate.info);
		setStartYear(mapCertificateDate(certificate.dateOfObtaining)?.year ?? 0);
		setStartMonth(mapCertificateDate(certificate.dateOfObtaining)?.month ?? 0);
		setIsOngoingChecked(certificate.endDate === null);
		setEndYear(mapCertificateDate(certificate.endDate)?.year ?? 0);
		setEndMonth(mapCertificateDate(certificate.endDate)?.month ?? 0);
	}, [setValue]);

	useEffect(() => {
		if (certificate) {
			fillCertificateData(certificate);
		}
	}, [certificate, fillCertificateData]);

	const mapCertificateDate = (dateString: string | null) => {
		if (!dateString) return;
		const date = new Date(dateString);
		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1
		};
	};

	const onTypeChange = () => {
		setType(type === 'CERTIFICATE' ? 'LICENSE' : 'CERTIFICATE');
	};

	const createDate = (year: number, month: number) => {
		const startDate = new Date(year, month);
		return startDate.toISOString().split("T")[0];
	};

	const checkDateErrors = useCallback((): boolean => {
		let isError = dateErrors.size > 0;
		if (startMonth === 0) {
			setDateErrors((prevState) =>
				new Map(prevState).set('startMonth', DATE_ERROR_MESSAGE['startMonth']))
			isError = true;
		}
		if (startYear === 0) {
			setDateErrors((prevState) =>
				new Map(prevState).set('startYear', DATE_ERROR_MESSAGE['startYear']))
			isError = true;
		}
		if (endMonth === 0 && !isOngoingChecked) {
			setDateErrors((prevState) =>
				new Map(prevState).set('endMonth', DATE_ERROR_MESSAGE['endMonth']))
			isError = true;
		}
		if (endYear === 0 && !isOngoingChecked) {
			setDateErrors((prevState) =>
				new Map(prevState).set('endYear', DATE_ERROR_MESSAGE['endYear']))
			isError = true;
		}
		return isError;
	}, [dateErrors.size, endMonth, endYear, isOngoingChecked, startMonth, startYear]);

	const handleSave = useCallback(() => {
		if (checkDateErrors()) return;
		handleSubmit(data => {
			onSave({
				name: data.name,
				info: data.info,
				dateOfObtaining: createDate(startYear, startMonth),
				endDate: isOngoingChecked ? null : createDate(endYear, endMonth),
				certificateType: type,
			});
			handleClose!();
		})();
	}, [checkDateErrors, endMonth, endYear, handleClose, handleSubmit, isOngoingChecked, onSave, startMonth, startYear, type]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);

	return (
		<div className={styles['item']}>
			<div className={styles['item__label']}>
				<span className={styles['item__text']}>Wybierz rodzaj</span>
				<div className={styles['item__icon']}>
					<InfoIcon width={14} height={14}/>
				</div>
			</div>
			<SwitchBtn isActive={type === 'CERTIFICATE'}
			           onClick={onTypeChange}
			           leftContent={'Certyfikat'}
			           rightContent={'Licencja'}/>
			<form className={styles['item__form']}>
				<CustomInput preset={'certificateName'} register={register} errorMessage={errors.name?.message}/>
				<CustomInput preset={'certificateOrganization'} register={register}
				             errorMessage={errors.info?.message}/>
			</form>
			<h3 className={styles['item__title']}>W jakim okresie zdobywałeś certyikat?</h3>
			<CertificateDatesItem selectedStartMonth={startMonth}
			                      selectedEndMonth={endMonth}
			                      selectedStartYear={startYear}
			                      selectedEndYear={endYear}
			                      onStartYearSelect={setStartYear}
			                      onStartMonthSelect={setStartMonth}
			                      onEndYearSelect={setEndYear}
			                      onEndMonthSelect={setEndMonth}
			                      dateErrors={dateErrors}
			                      onDateErrorChange={setDateErrors}
			                      isOngoingChecked={isOngoingChecked}
			                      onOngoingChange={setIsOngoingChecked}/>
		</div>
	);
}

export default CertificateLicenseAddModalItem;