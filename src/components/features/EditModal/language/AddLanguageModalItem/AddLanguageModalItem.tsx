import React, { useCallback, useEffect, useState } from "react";
import styles from './AddLanguageModalItem.module.scss';
import SelectInput from "@ui/SelectInput/SelectInput.tsx";
import { ISelectItem } from "@ui/SelectInput/selectInputTypes.ts";
import LevelPicker from "@ui/LevelPicker/LevelPicker.tsx";
import TooltipIcon from "@ui/TooltipIconBtn/TooltipIcon.tsx";
import {
	getLanguageKeyFromEnumByValue,
	getLanguageLevelDescription,
	getLanguageLevelName,
	getPolishLanguageName
} from "@utils/languageUtils.ts";
import {
	IAddLanguageModalItemProps,
	ILanguageForm
} from "@components/features/EditModal/language/AddLanguageModalItem/addLanguageModalItemTypes.ts";
import { useForm, useWatch } from "react-hook-form";
import InputError from "@ui/InputError/InputError.tsx";

const AddLanguageModalItem: React.FC<IAddLanguageModalItemProps> = ({
	                                                                    registerOnSave,
	                                                                    languages,
	                                                                    onSave,
	                                                                    handleClose
                                                                    }) => {

	const { register, setValue, trigger, control, handleSubmit, formState: { errors } } = useForm<ILanguageForm>({
		shouldFocusError: false,
		mode: 'onChange',
	});

	const language = useWatch({ name: 'language', control });
	const level = useWatch({ name: 'level', control });

	const [ isLevelItemHovered, setIsLevelItemHovered ] = useState<boolean>(false);

	const handleSave = useCallback(() => {
		handleSubmit(data => {
			onSave({ language: data.language, level: data.level });
			handleClose!();
		})();
	}, [ handleClose, handleSubmit, onSave ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	const getSelectInputItems = (): ISelectItem[] => {
		return languages.map(language => {
			return { text: getPolishLanguageName(language), info: null }
		});
	};

	const selectLanguage = (language: string) => {
		const languageToSave = getLanguageKeyFromEnumByValue(language);

		if (!languageToSave) return;

		setValue('language', languageToSave);
	};

	const onLevelSelect = (level: number) => {
		setValue('level', level);
		trigger('level');
	};

	return (
		<div className={ styles['item'] }>
			<SelectInput text={ getPolishLanguageName(language) }
			             id={ 'language' }
			             labelText={ 'Język' }
			             selectItems={ getSelectInputItems() }
			             register={ register }
			             trigger={ trigger }
			             validationRules={ {
				             required: "Wybierz język"
			             } }
			             error={ errors.language ?? null }
			             onValueChange={ selectLanguage }/>
			<div>
				<div className={ `${styles['item__content']} ${ errors.level && styles['item__content--error'] }` }>
					<input type="hidden"
					       id={ 'level' }
					       { ...register('level', { required: 'Wybierz poziom' }) }/>
					<div className={ styles['item__wrapper'] }
					     role={ 'button' }
					     onMouseEnter={ () => setIsLevelItemHovered(true) }
					     onMouseLeave={ () => setIsLevelItemHovered(false) }>
						<TooltipIcon isLeft={ true }
						             isIconTop={ true }
						             text={ getLanguageLevelDescription(level) }
						             isActive={ isLevelItemHovered }
						/>
						<div className={ styles['item__info'] }>
							<span>Poziom znajomości</span>
							<p>{ getLanguageLevelName(level) }</p>
						</div>
					</div>
					<LevelPicker selectedLevel={ level }
					             onLevelSelect={ onLevelSelect }/>
				</div>
				{ errors.level?.message && <InputError text={ errors.level.message }/> }
			</div>
		</div>
	)
};

export default AddLanguageModalItem;