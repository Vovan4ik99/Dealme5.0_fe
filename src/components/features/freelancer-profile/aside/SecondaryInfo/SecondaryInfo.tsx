import styles from './SecondaryInfo.module.scss';
import React, { useCallback, useEffect, useState } from "react";
import SubIndustriesItem from "./SubIndustriesItem/SubIndustriesItem.tsx";
import WorkingDaysProfileItem
	from "@components/features/freelancer-profile/aside/SecondaryInfo/WorkingDaysProfileItem/WorkingDaysProfileItem.tsx";
import WorkingHoursProfileItem
	from "@components/features/freelancer-profile/aside/SecondaryInfo/WorkingHoursProfileItem/WorkingHoursProfileItem.tsx";
import LocalizationItem
	from "@components/features/freelancer-profile/aside/SecondaryInfo/LocalizationItem/LocalizationItem.tsx";
import LanguagesItem from "@components/features/freelancer-profile/aside/SecondaryInfo/LanguagesItem/LanguagesItem.tsx";
import { useFreelancerProfileAsideInfoService } from "@services/freelancer/freelancerProfileAsideInfoService.ts";
import { IFreelancerBarResponse, IFreelancerData } from "@shared/freelancer/common.ts";
import { ISecondaryInfoProps } from "@components/features/freelancer-profile/aside/SecondaryInfo/secondaryInfoTypes.ts";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";

const SecondaryInfo: React.FC<ISecondaryInfoProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const { getFreelancerBar } = useFreelancerProfileAsideInfoService();
	const { getFreelancerPrimaryInfo } = useFreelancerProfileService();

	const [ freelancerInfo, setFreelancerInfo ] = useState<IFreelancerBarResponse | null>(null);
	const [ freelancerData, setFreelancerData ] = useState<IFreelancerData | undefined>(undefined);

	const fetchFreelancerBarInfo = useCallback(() => {
		getFreelancerBar(freelancerId)
			.then(response => setFreelancerInfo(response))
			.catch(console.error);
	}, [ freelancerId, getFreelancerBar ]);

	const fetchFreelancerData = useCallback(() => {
		getFreelancerPrimaryInfo(freelancerId)
			.then(setFreelancerData)
			.catch(console.error);
	}, [ freelancerId, getFreelancerPrimaryInfo ]);

	useEffect(() => {
		fetchFreelancerBarInfo();
		fetchFreelancerData();
	}, [ fetchFreelancerBarInfo, fetchFreelancerData ]);

	if (!freelancerData || !freelancerInfo) return;

	const handleSave = () => {
		fetchFreelancerData();
	};

	const handleAddDataSave = () => {
		fetchFreelancerBarInfo();
	};

	const isLocalizationUndefined = () => {
		return !freelancerInfo.localization?.country || !freelancerInfo.localization?.state;
	};

	const isLanguagesUndefined = () => {
		return freelancerInfo.languagesLevel.length === 0;
	};

	const getFreelancerLanguages = () => {
		return freelancerInfo.languagesLevel.map(l => l.language);
	};

	return (
		<div className={ styles['info'] }>
			<div className={ styles['info__item'] }>
				<SubIndustriesItem userSubIndustries={ freelancerData.subIndustries }
				                   onSave={ handleSave }
				                   isLoggedUserProfile={ isLoggedUserProfile }/>
			</div>
			<div className={ styles['info__item'] }>
				<WorkingDaysProfileItem userWorkingDays={ freelancerData.workingDays }
				                        onSave={ handleSave }
				                        isLoggedUserProfile={ isLoggedUserProfile }/>
			</div>
			<div className={ styles['info__item'] }>
				<WorkingHoursProfileItem userWorkingHour={ freelancerData.workingHours }
				                         onSave={ handleSave }
				                         isLoggedUserProfile={ isLoggedUserProfile }/>
			</div>
			<div
				className={ `${ styles['info__item'] } ${ isLocalizationUndefined() && styles['info__item--empty'] }` }>
				<LocalizationItem isUndefined={ isLocalizationUndefined() }
				                  userLocalization={ freelancerInfo.localization }
				                  freelancerWorkingArea={ freelancerInfo.workingArea }
				                  freelancerWorkingAreaValue={ freelancerInfo.workingAreaValue }
				                  isLoggedUserProfile={ isLoggedUserProfile }
				                  onSave={ handleAddDataSave }/>
			</div>
			<div className={ `${ styles['info__item'] } ${ isLanguagesUndefined() && styles['info__item--empty'] }` }>
				<LanguagesItem isUndefined={ isLanguagesUndefined() }
				               onSave={ handleAddDataSave }
				               isLoggedUserProfile={ isLoggedUserProfile }
				               freelancerLanguages={ getFreelancerLanguages() }/>
			</div>
		</div>
	);
}

export default SecondaryInfo;