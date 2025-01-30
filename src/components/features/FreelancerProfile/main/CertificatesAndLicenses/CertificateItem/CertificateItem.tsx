import React from "react";
import {ICertificateItemProps} from "./certificateItemTypes.ts";
import styles from "./CertificateItem.module.scss";
import company_img from '@icons/freelancer_profile/secondary_info/cloud.svg';
import date_img from '@icons/freelancer_profile/secondary_info/calendar.svg';
import {getPolishMonthShort} from "@utils/dateUtils.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";


const CertificateItem: React.FC<ICertificateItemProps> = ({
	                                                          certificate,
	                                                          isModalItem = false,
	                                                          onDelete = () => {},
	                                                          onPatch = () => {}
                                                          }) => {

	const formatDateRange = () => {
		const startDate = new Date(certificate.dateOfObtaining);
		const startMonthYear = `${getPolishMonthShort(certificate.dateOfObtaining)} ${startDate.getFullYear()}`;
		let endMonthYear = 'Teraz';
		if (certificate.endDate) {
			const endDate = new Date(certificate.endDate);
			endMonthYear = `${getPolishMonthShort(certificate.endDate)} ${endDate.getFullYear()}`;
		}

		return `${startMonthYear} - ${endMonthYear}`;
	}

	return (
		<div className={`${styles['certificate']} ${isModalItem && styles['certificate--modal']}`}>
			<div className={styles['certificate__header']}>
				<p className={styles['certificate__title']}>{certificate.name}</p>
				{isModalItem &&
                    <div className={styles['certificate__btn']}>
                        <ActionBtn kind={'Edit'} withBorder backgroundColor={'white'} onClick={onPatch}/>
                        <ActionBtn kind={'Delete'} withBorder backgroundColor={'white'} onClick={onDelete}/>
                    </div>
				}
			</div>

			<div className={styles['certificate__wrapper']}>
				<div className={styles['certificate__item']}>
					<img src={company_img} alt="company"/>
					<p className={styles['certificate__text']}>{certificate.info}</p>
				</div>
				<div className={styles['certificate__item']}>
					<img src={date_img} alt="date"/>
					<p className={styles['certificate__text']}>{formatDateRange()}</p>
				</div>
			</div>
		</div>
	);
}

export default CertificateItem;