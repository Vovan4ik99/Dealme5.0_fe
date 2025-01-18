import styles from "@components/features/EditModal/LocalizationModalItem/LocalizationModalItem.module.scss";
import React, {useEffect} from "react";
import {WORKING_AREAS} from "@constants/workingAreas.ts";
import {
	ILocalizationWorkingAreaProps
} from "@components/features/EditModal/LocalizationModalItem/LocalizationWorkingArea/localizationWorkingAreaTypes.ts";
import SwitchBtn from "@ui/SwitchBtn/SwitchBtn.tsx";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import {ISelectItem} from "@ui/SelectInput/selectInputTypes.ts";
import {
	getDescriptionByCountryName,
	getStateDescriptionByStateName,
	getStatesAsSelectItems
} from "@utils/localizationUtils.ts";
import {PRIORITY_COUNTRY_KEY} from "@constants/constans.ts";

const LocalizationWorkingArea: React.FC<ILocalizationWorkingAreaProps> = ({
	                                                                          userWorkingArea,
	                                                                          userWorkingAreaValue,
	                                                                          onWorkingAreaValueChange,
	                                                                          onWorkingAreaChange,
	                                                                          countries,
	                                                                          states
                                                                          }) => {

	useEffect(() => {
		if (userWorkingAreaValue !== null) return;
		onWorkingAreaValueChange(userWorkingAreaValue);
	}, [onWorkingAreaValueChange, userWorkingAreaValue]);

	const handleAreaChange = () => {
		if (userWorkingArea === "COUNTRY") {
			onWorkingAreaChange("STATE");
		} else {
			onWorkingAreaChange("COUNTRY");
		}
	};

	const renderSelectText = () => {
		return getWorkingAreaValueDescription(userWorkingAreaValue);
	};

	const getWorkingAreaValueDescription = (workingAreaValue: string | null) => {
		if (userWorkingArea === "COUNTRY") {
			return getDescriptionByCountryName(countries, PRIORITY_COUNTRY_KEY);
		}
		return getStateDescriptionByStateName(states, workingAreaValue);
	};

	//Workaround, because now working area is only Poland
	const renderSelectItems = (): ISelectItem[] => {
		if (userWorkingArea === "COUNTRY") {
			return [{text: countries[0]?.description, info: null}];
		}
		return getStatesAsSelectItems(states);
	};

	const renderLabel = () => {
		return userWorkingArea === "COUNTRY" ? WORKING_AREAS.COUNTRY : WORKING_AREAS.STATE;
	}

	const renderInfo = () => {
		const areaToPaste = userWorkingArea === "STATE" ? 'województwa' : 'kraju';
		return `Wybranie ${areaToPaste} oznacza świadczenie usług na terenie całego ${areaToPaste}`;
	};

	return (
		<div className={styles['item']}>
			<p className={styles['item__text']}>Określ obszar świadczenia usług</p>
			<div className={styles['item__wrapper']}>
				<SwitchBtn isActive={userWorkingArea === "COUNTRY"}
				           onClick={() => handleAreaChange()}
				           leftContent={
					           <p className={styles['item__add-text']}>{WORKING_AREAS.COUNTRY}</p>
				           }
				           rightContent={
					           <p>{WORKING_AREAS.STATE}</p>
				           }/>
				<div className={styles['item__info-wrapper']}>
					<div className={styles['item__icon']}>
						<InfoIcon width={14} height={14}/>
					</div>
					<p className={styles['item__info']}>{renderInfo()}</p>
				</div>
				<SelectInput text={renderSelectText()}
				             labelText={renderLabel()}
				             onClick={onWorkingAreaValueChange}
				             selectItems={renderSelectItems()}/>
			</div>
		</div>
	)
};

export default LocalizationWorkingArea;