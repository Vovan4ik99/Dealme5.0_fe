import React from "react";
import { ICertificateItemProps } from "./certificateItemTypes.ts";
import styles from "./CertificateItem.module.scss";
import company_img from '@icons/freelancer_profile/secondary_info/cloud.svg';
import date_img from '@icons/freelancer_profile/secondary_info/calendar.svg';
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import { formatDateRange } from "@utils/dateUtils.ts";


const CertificateItem: React.FC<ICertificateItemProps> = ({
	                                                          certificate,
	                                                          isModalItem = false,
	                                                          onDelete = () => {},
	                                                          onPatch = () => {}
                                                          }) => {

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
					<p className={styles['certificate__text']}>
						{formatDateRange(certificate.dateOfObtaining, certificate.endDate)}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CertificateItem;