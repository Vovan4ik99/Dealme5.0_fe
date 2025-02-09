import styles from "./AddActivityModalItem.module.scss";
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { ISelectItem } from "@ui/SelectInput/selectInputTypes.ts";
import {
	IActivityAddForm,
	IAddActivityModalItemProps
} from "@components/features/EditModal/activities/AddActivityModalItem/addActivityModalItemTypes.ts";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";
import LevelPicker from "@ui/LevelPicker/LevelPicker.tsx";
import { SKILL_LEVELS } from "@constants/constans.ts";
import { useForm, useWatch } from "react-hook-form";
import InputError from "@ui/InputError/InputError.tsx";

const AddActivityModalItem: React.FC<IAddActivityModalItemProps> = ({
	                                                                    onSave,
	                                                                    registerOnSave,
	                                                                    handleClose,
	                                                                    activitiesToRender
                                                                    }) => {

	const [ isLevelItemHovered, setIsLevelItemHovered ] = useState<boolean>(false);

	const { register, handleSubmit, trigger, control, setValue, formState: { errors } } = useForm<IActivityAddForm>({
		shouldFocusError: false,
		mode: 'onChange',
	});

	const activityName = useWatch({name: 'name', control});
	const level = useWatch({name: 'level', control});

	const getSelectItems = (): ISelectItem[] => {
		return activitiesToRender.map(activity => ({
			text: activity.name,
			info: activity.info
		}));
	};

	const onActivitySelect = (newActivityName: string) => {
		setValue('name', newActivityName);
	};

	const onLevelSelect = (newLevel: number) => {
		setValue('level', newLevel);
		trigger('level');
	};

	const getLevelDescription = (level: number | null) => {
		if (!level) return 'Wybierz poziom';
		return SKILL_LEVELS[level - 1];
	};

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			const selectedActivity = activitiesToRender
				.find(activity => activity.name === data.name);

			if (!selectedActivity) return;
			onSave(selectedActivity, data.level);
			handleClose!();
		})();
	}, [ activitiesToRender, handleClose, handleSubmit, onSave ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<form className={ styles['modal'] }>
			<SelectInput text={ activityName ?? null }
			             selectItems={ getSelectItems() }
			             labelText={ 'Usługa' }
			             id={ 'name' }
			             trigger={ trigger }
			             register={ register }
			             validationRules={ {
				             required: "Wybierz usługę"
			             } }
			             error={ errors.name ?? null }
			             onValueChange={ onActivitySelect }/>
			<div>
				<div className={ `${styles['modal__content'] } ${ errors.level && styles['modal__content--error']}` }>
					<input type="hidden"
					       id={'level'}
					       {...register('level', {required: 'Wybierz poziom'})}/>
					<div className={ styles['modal__wrapper'] }
					     role={ 'button' }
					     onMouseEnter={ () => setIsLevelItemHovered(true) }
					     onMouseLeave={ () => setIsLevelItemHovered(false) }
					>
						<TooltipIcon isLeft={ true }
						             isIconTop={ true }
						             text={ getLevelDescription(level) }
						             isActive={ isLevelItemHovered }
						/>
						<div className={ styles['modal__info'] }>
							<span>Poziom znajomości</span>
							<p>{ getLevelDescription(level) }</p>
						</div>
					</div>
					<LevelPicker selectedLevel={ level } onLevelSelect={ onLevelSelect }/>
				</div>
				{ errors.level?.message && <InputError text={ errors.level.message }/> }
			</div>
		</form>
	);
};

export default AddActivityModalItem;