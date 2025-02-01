import styles from './PrimaryInfo.module.scss';
import React, {useCallback, useContext, useEffect, useState} from "react";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import {FreelancerPrimaryInfo} from "./primaryInfoTypes.ts";
import {ReactComponent as LogoIcon} from "@icons/named_exported/logo_icon.svg";
import star from "@icons/freelancer_profile/primary_info/star.svg";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import StatusItem from "@ui/StatusItem/StatusItem.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import PrimaryInfoModalItem from "@components/features/EditModal/primary_info/PrimaryInfoModalItem/PrimaryInfoModalItem.tsx";
import {useFreelancerProfileAsideInfoService} from "@services/freelancerProfileAsideInfoService.ts";

const PrimaryInfo: React.FC = () => {
	
	const [primaryInfo, setPrimaryInfo] = useState<FreelancerPrimaryInfo | null>(null);
	const {user, getLoggedUserData} = useContext(AuthContext);
	const {openModal} = useModal();
	const {getFreelancerBar} = useFreelancerProfileAsideInfoService();

	const fetchPrimaryInfo = useCallback(() => {
		getFreelancerBar()
			.then(response => {setPrimaryInfo({...response})})
			.catch(error => console.error(error));
	}, [getFreelancerBar]);
	
	useEffect(() => {
		if (primaryInfo) return;
		fetchPrimaryInfo();
	}, [fetchPrimaryInfo, primaryInfo]);

	if (!user) {
		return null;
	}

	const handleSave = () => {
		getLoggedUserData(localStorage.getItem('token') as string);
	}

	const onEdit = () => {
		openModal({
			id: 'unknown',
			title: 'Edytuj dane podstawowe',
			shouldCloseOnSaving: true,
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			child: <PrimaryInfoModalItem onSave={handleSave}
			                             freelancerId={user.id}
			                             firstName={user.firstName}
			                             lastName={user.lastName}
			                             company={user.company}
			                             specialization={user.specialization.name}
			                             experience={user.experienceLevel}
			                             incomeGoal={user.incomeGoal}/>
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