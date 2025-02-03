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
	IAddLanguageModalItemProps
} from "@components/features/EditModal/language/AddLanguageModalItem/addLanguageModalItemTypes.ts";
import { LANGUAGE_NAMES } from "@constants/language.ts";

const AddLanguageModalItem: React.FC<IAddLanguageModalItemProps> = ({ registerOnSave, languages, onSave }) => {

	const [ selectedLevel, setSelectedLevel ] = useState<number | null>(null);
	const [ selectedLanguage, setSelectedLanguage ] = useState<keyof typeof LANGUAGE_NAMES | null>(null);
	const [ isLevelItemHovered, setIsLevelItemHovered ] = useState<boolean>(false);

	useEffect(() => {
		if (!selectedLanguage) {
			setSelectedLanguage(languages[0]);
		}
	}, [ languages, selectedLanguage ]);

	const handleSave = useCallback(() => {
		if (!selectedLanguage || !selectedLevel) return;
		onSave({ language: selectedLanguage, level: selectedLevel });
	}, [ onSave, selectedLanguage, selectedLevel ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	const getSelectInputItems = (): ISelectItem[] => {
		return languages.map(language => {
			return { text: getPolishLanguageName(language), info: null }
		});
	};

	const selectLanguage = (language: string) => {
		setSelectedLanguage(getLanguageKeyFromEnumByValue(language) ?? null);
		setSelectedLevel(null);
	};

	return (
		<div className={ styles['item'] }>
			<SelectInput text={ getPolishLanguageName(selectedLanguage ?? languages[0]) }
			             labelText={ 'Język' }
			             selectItems={ getSelectInputItems() }
			             onClick={ selectLanguage }/>
			<div className={ styles['item__content'] }>
				<div className={ styles['item__wrapper'] }
				     role={ 'button' }
				     onMouseEnter={ () => setIsLevelItemHovered(true) }
				     onMouseLeave={ () => setIsLevelItemHovered(false) }
				>
					<TooltipIcon isLeft={ true }
					             isIconTop={ true }
					             text={ getLanguageLevelDescription(selectedLevel) }
					             isActive={ isLevelItemHovered }
					/>
					<div className={ styles['item__info'] }>
						<span>Poziom znajomości</span>
						<p>{ getLanguageLevelName(selectedLevel) }</p>
					</div>
				</div>
				<LevelPicker selectedLevel={ selectedLevel } onLevelSelect={ setSelectedLevel }/>
			</div>
		</div>
	)
};

export default AddLanguageModalItem;