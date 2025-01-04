import styles from './PrimaryInfo.module.scss';
import React, {useContext, useEffect, useState} from "react";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import {FreelancerPrimaryInfo} from "./primaryInfoTypes.ts";
import {ReactComponent as LogoIcon} from "@icons/named_exported/logo_icon.svg";
import star from "@icons/freelancer_profile/primary_info/star.svg";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import StatusItem from "@ui/StatusItem/StatusItem.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";

const PrimaryInfo: React.FC = () => {
	
	const [primaryInfo, setPrimaryInfo] = useState<FreelancerPrimaryInfo | null>(null);
	const {user} = useContext(AuthContext);
	const {openModal} = useModal();
	const {getFreelancerBar, loadingStatus} = useFreelancerProfileService();
	
	useEffect(() => {
		if (primaryInfo) return;
		getFreelancerBar()
			.then(response => setPrimaryInfo({...response}))
			.catch(error => console.error(error));
	}, [getFreelancerBar, primaryInfo]);

	const onEdit = () => {
		openModal({
			id: 'primaryInfoEdit',
			title: 'Edytuj dane podstawowe',
			shouldCloseOnSaving: true,
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			child: <></>
		});
	}

	const renderAccountStatusItem = () => {
		if (primaryInfo?.accountStatus === 'NORMAL') {
			return <StatusItem kind={'normal account status'}/>
		}
		if (primaryInfo?.accountStatus === 'LIMITED') {
			return <StatusItem kind={'limited account status'}/>
		}
		return null;
	}

	const renderVisibilityStatusItem = () => {
		if (primaryInfo?.visibilityStatus === 'LIMITED') {
			return <StatusItem kind={'limited availability'}/>
		}
		if (primaryInfo?.visibilityStatus === 'NORMAL') {
			return <StatusItem kind={'normal availability'}/>
		}
	}

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	console.log(primaryInfo);

	if (!user) {
		return null;
	}

	return (
		<div className={styles['info']}>
			<div className={styles['info__btn']}>
				<ActionBtn kind={'Edit'} onClick={onEdit} backgroundColor={'transparent'} withBorder={true}/>
			</div>
			<h2 className={styles['info__title']}>{user.firstName} {user.lastName}</h2>
			<h3 className={styles['info__subtitle']}>{user.specialization.name}</h3>
			<div className={styles['info__wrapper']}>
				<div className={styles['info__item']}>
					<img src={star} alt={'rate star'}/>
					<p className={styles['info__rate']}>{primaryInfo?.rate ?? 0}</p>
					<p className={styles['info__text']}>({primaryInfo?.count ?? 0} ocen)</p>
				</div>
				<div className={`${styles['info__item']} ${styles['info__item--logo']}`}>
					<LogoIcon/>
					<p className={styles['info__rate']}>{primaryInfo?.points}</p>
					<p className={styles['info__text']}>({primaryInfo?.ordersCount} zleceń)</p>
				</div>
			</div>
			<div className={styles['info__item']}>
				{renderAccountStatusItem()}
				{renderVisibilityStatusItem()}
			</div>

		</div>
	);
}

export default PrimaryInfo;