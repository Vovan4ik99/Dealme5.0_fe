import styles from './PrimaryInfo.module.scss';
import React, { useCallback, useContext, useEffect, useState } from "react";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { FreelancerPrimaryInfo, IFreelancerPrimaryInfoProps } from "./primaryInfoTypes.ts";
import { ReactComponent as LogoIcon } from "@icons/named_exported/logo_icon.svg";
import star from "@icons/freelancer_profile/primary_info/star.svg";
import StatusItem from "@ui/freelancer-profile/StatusItem/StatusItem.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import PrimaryInfoModalItem
	from "@components/features/modals/primary_info/PrimaryInfoModalItem/PrimaryInfoModalItem.tsx";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import { IFreelancerData } from "@shared/freelancer/common.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

const PrimaryInfo: React.FC<IFreelancerPrimaryInfoProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const { getLoggedUserData } = useContext(AuthContext);

	const { openModal } = useModal();

	const { getFreelancerBar } = useFreelancerProfileAsideInfoService();
	const { getFreelancerPrimaryInfo } = useFreelancerProfileService();

	const [ freelancerData, setFreelancerData ] = useState<IFreelancerData | undefined>();
	const [ primaryInfo, setPrimaryInfo ] = useState<FreelancerPrimaryInfo | null>(null);

	const token = localStorage.getItem("token");


	const fetchPrimaryInfo = useCallback(() => {
		getFreelancerBar(freelancerId)
			.then(response => {
				setPrimaryInfo({ ...response })
			})
			.catch(error => console.error(error));
	}, [ freelancerId, getFreelancerBar ]);

	const fetchFreelancerData = useCallback(() => {
		getFreelancerPrimaryInfo(freelancerId)
			.then(setFreelancerData)
			.catch(console.error);
	}, [ freelancerId, getFreelancerPrimaryInfo ]);

	useEffect(() => {
		fetchPrimaryInfo();
		fetchFreelancerData();
	}, [ fetchFreelancerData, fetchPrimaryInfo ]);

	if (!freelancerData) {
		return null;
	}

	const handleSave = () => {
		getLoggedUserData(token!)
			.then(fetchFreelancerData)
			.catch(console.error);
	};

	const onEdit = () => {
		openModal({
			id: 'PrimaryInfoModalItem',
			title: 'Edytuj dane podstawowe',
			shouldCloseOnSaving: true,
			btnText: 'Zapisz zmiany',
			btnWithIcon: false,
			withSaveBtn: true,
			child: <PrimaryInfoModalItem onSave={ handleSave }
			                             freelancerId={ freelancerId }
			                             firstName={ freelancerData.firstName }
			                             lastName={ freelancerData.lastName }
			                             company={ freelancerData.company }
			                             specialization={ freelancerData.specialization.name }
			                             experience={ freelancerData.experienceLevel }
			                             incomeGoal={ freelancerData.incomeGoal }/>
		});
	}

	const renderAccountStatusItem = () => {
		if (primaryInfo?.accountStatus === 'NORMAL') {
			return <StatusItem kind={ 'normal account status' }/>
		}
		if (primaryInfo?.accountStatus === 'LIMITED') {
			return <StatusItem kind={ 'limited account status' }/>
		}
		return null;
	}

	const renderVisibilityStatusItem = () => {
		if (primaryInfo?.visibilityStatus === 'LIMITED') {
			return <StatusItem kind={ 'limited availability' }/>
		}
		if (primaryInfo?.visibilityStatus === 'NORMAL') {
			return <StatusItem kind={ 'normal availability' }/>
		}
	}

	return (
		<div className={ styles['info'] }>
			{ isLoggedUserProfile &&
                <div className={ styles['info__btn'] }>
                    <ActionBtn kind={ 'Edit' } onClick={ onEdit } backgroundColor={ 'transparent' }
                               withBorder={ true }/>
                </div>
			}
			<h2 className={ styles['info__title'] }>{ freelancerData.firstName } { freelancerData.lastName }</h2>
			<h3 className={ styles['info__subtitle'] }>{ freelancerData.specialization.name }</h3>
			<div className={ styles['info__wrapper'] }>
				<div className={ styles['info__item'] }>
					<img src={ star } alt={ 'rate star' }/>
					<p className={ styles['info__rate'] }>{ primaryInfo?.rate ?? 0 }</p>
					<p className={ styles['info__text'] }>({ primaryInfo?.count ?? 0 } ocen)</p>
				</div>
				<div className={ `${ styles['info__item'] } ${ styles['info__item--logo'] }` }>
					<LogoIcon/>
					<p className={ styles['info__rate'] }>{ primaryInfo?.points }</p>
					<p className={ styles['info__text'] }>({ primaryInfo?.ordersCount } zleceń)</p>
				</div>
			</div>
			<div className={ styles['info__item'] }>
				{ renderAccountStatusItem() }
				{ renderVisibilityStatusItem() }
			</div>

		</div>
	);
}

export default PrimaryInfo;