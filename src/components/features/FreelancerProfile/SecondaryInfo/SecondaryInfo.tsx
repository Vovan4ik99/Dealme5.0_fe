import styles from './SecondaryInfo.module.scss';
import {useContext} from "react";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";
import SubIndustriesItem from "./SubIndustriesItem/SubIndustriesItem.tsx";
import WorkingDaysProfileItem from "@components/features/FreelancerProfile/SecondaryInfo/WorkingDaysProfileItem/WorkingDaysProfileItem.tsx";

const SecondaryInfo = () => {

	const {user, getLoggedUserData} = useContext(AuthContext);

	if (!user) return null;

	const handleSave = () => {
		getLoggedUserData(localStorage.getItem('token') as string);
	}

	return (
		<div className={styles['info']}>
			<div className={styles['info__item']}>
				<SubIndustriesItem userSubIndustries={user.subIndustries} onSave={handleSave}/>
			</div>
			<div className={styles['info__item']}>
				<WorkingDaysProfileItem userWorkingDays={user.workingDays} onSave={handleSave}/>
			</div>
			<div className={styles['info__item']}></div>
			<div className={styles['info__item']}></div>
			<div className={styles['info__item']}></div>
		</div>
	);
}

export default SecondaryInfo;