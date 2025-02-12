import styles from './SecondaryInfo.module.scss';
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import SubIndustriesItem from "./SubIndustriesItem/SubIndustriesItem.tsx";
import WorkingDaysProfileItem
	from "@components/features/FreelancerProfile/aside/SecondaryInfo/WorkingDaysProfileItem/WorkingDaysProfileItem.tsx";
import WorkingHoursProfileItem
	from "@components/features/FreelancerProfile/aside/SecondaryInfo/WorkingHoursProfileItem/WorkingHoursProfileItem.tsx";
import LocalizationItem
	from "@components/features/FreelancerProfile/aside/SecondaryInfo/LocalizationItem/LocalizationItem.tsx";
import LanguagesItem from "@components/features/FreelancerProfile/aside/SecondaryInfo/LanguagesItem/LanguagesItem.tsx";
import { useFreelancerProfileAsideInfoService } from "@services/freelancerProfileAsideInfoService.ts";
import { IFreelancerBarResponse } from "@shared/freelancer/common.ts";

const SecondaryInfo = () => {

	const [ freelancerInfo, setFreelancerInfo ] = useState<IFreelancerBarResponse | null>(null);

	const { user, getLoggedUserData } = useContext(AuthContext);
	const { getFreelancerBar } = useFreelancerProfileAsideInfoService();

	const fetchFreelancerBarInfo = useCallback(() => {
		getFreelancerBar()
			.then(response => setFreelancerInfo(response))
			.catch(console.error);
	}, [ getFreelancerBar ]);

	useEffect(() => {
		fetchFreelancerBarInfo();
	}, [ fetchFreelancerBarInfo ]);

	if (!user || !freelancerInfo) return null;

	const handleSave = () => {
		getLoggedUserData(localStorage.getItem('token') as string);
	};

	const handleAddDataSave = () => {
		fetchFreelancerBarInfo();
	};

	const isLocalizationUndefined = () => {
		return !freelancerInfo.localization?.country || !freelancerInfo.localization?.state;
	};

	const isLanguagesUndefined = () => {
		return freelancerInfo.languagesLevel.length === 0;
	}

	const getFreelancerLanguages = () => {
		return freelancerInfo.languagesLevel.map(l => l.language);
	}

	return (
		<div className={ styles['info'] }>
			<div className={ styles['info__item'] }>
				<SubIndustriesItem userSubIndustries={ user.subIndustries } onSave={ handleSave }/>
			</div>
			<div className={ styles['info__item'] }>
				<WorkingDaysProfileItem userWorkingDays={ user.workingDays } onSave={ handleSave }/>
			</div>
			<div className={ styles['info__item'] }>
				<WorkingHoursProfileItem userWorkingHour={ user.workingHours } onSave={ handleSave }/>
			</div>
			<div
				className={ `${ styles['info__item'] } ${ isLocalizationUndefined() && styles['info__item--empty'] }` }>
				<LocalizationItem isUndefined={ isLocalizationUndefined() }
				                  userLocalization={ freelancerInfo.localization }
				                  freelancerWorkingArea={ freelancerInfo.workingArea }
				                  freelancerWorkingAreaValue={ freelancerInfo.workingAreaValue }
				                  onSave={ handleAddDataSave }/>
			</div>
			<div className={ `${ styles['info__item'] } ${ isLanguagesUndefined() && styles['info__item--empty'] }` }>
				<LanguagesItem isUndefined={ isLanguagesUndefined() }
				               onSave={ handleAddDataSave }
				               freelancerLanguages={ getFreelancerLanguages() }/>
			</div>
		</div>
	);
}

export default SecondaryInfo;