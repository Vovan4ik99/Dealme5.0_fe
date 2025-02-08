import styles from "./AddActivityModalItem.module.scss";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { IActivity } from "@shared/onboardingTypes.ts";
import { ISelectItem } from "@ui/SelectInput/selectInputTypes.ts";
import {
	IAddActivityModalItemProps
} from "@components/features/EditModal/activities/AddActivityModalItem/addActivityModalItemTypes.ts";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";
import LevelPicker from "@ui/LevelPicker/LevelPicker.tsx";
import { SKILL_LEVELS } from "@constants/constans.ts";

const AddActivityModalItem: React.FC<IAddActivityModalItemProps> = ({onSave, registerOnSave, activitiesToRender}) => {

	const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
	const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
	const [isLevelItemHovered, setIsLevelItemHovered] = useState<boolean>(false);

	const getSelectItems = (): ISelectItem[] => {
		return activitiesToRender.map(activity => ({
			text: activity.name,
			info: activity.info
		}));
	};

	const onActivitySelect = (newActivityName: string) => {
		const newActivity = activitiesToRender
			.find(activity => activity.name === newActivityName);

		if (!newActivity) return;

		setSelectedActivity({...newActivity});
	};

	const getLevelDescription = (level: number | null) => {
		if (!level) return 'Wybierz poziom';
		return SKILL_LEVELS[level - 1];
	};

	const handleSave = useCallback(() => {
		if (!selectedActivity || !selectedLevel) return;
		onSave(selectedActivity, selectedLevel);
	}, [onSave, selectedActivity, selectedLevel]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);
	
	return (
		<div className={styles['modal']}>
			<SelectInput text={selectedActivity?.name ?? 'Wybierz'}
			             selectItems={getSelectItems()}
			             labelText={'Usługa'}
			             onClick={onActivitySelect}/>
			<div className={ styles['modal__content'] }>
				<div className={ styles['modal__wrapper'] }
				     role={ 'button' }
				     onMouseEnter={ () => setIsLevelItemHovered(true) }
				     onMouseLeave={ () => setIsLevelItemHovered(false) }
				>
					<TooltipIcon isLeft={ true }
					             isIconTop={ true }
					             text={ getLevelDescription(selectedLevel) }
					             isActive={ isLevelItemHovered }
					/>
					<div className={ styles['modal__info'] }>
						<span>Poziom znajomości</span>
						<p>{ getLevelDescription(selectedLevel) }</p>
					</div>
				</div>
				<LevelPicker selectedLevel={ selectedLevel } onLevelSelect={ setSelectedLevel }/>
			</div>
		</div>
	);
};

export default AddActivityModalItem;