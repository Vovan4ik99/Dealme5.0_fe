import styles from './LanguagesModalItem.module.scss';
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import React, {useCallback, useEffect, useState} from "react";
import {IFreelancerLanguage, ILanguage} from "@shared/freelancerTypes.ts";
import LanguageModalItem
	from "@components/features/EditModal/LanguagesModalItem/LanguageModalItem/LanguageModalItem.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import AddLanguageModalItem from "@components/features/EditModal/AddLanguageModalItem/AddLanguageModalItem.tsx";
import DragAndDropContainer from "@components/features/EditModal/DragAndDropContainer/DragAndDropContainer.tsx";
import {getAbsentLanguageNames, getLanguageLevelName, getPolishLanguageName} from "@utils/languageUtils.ts";
import {
	IFreelancerDraggableLanguage
} from "@components/features/EditModal/LanguagesModalItem/LanguageModalItem/languageModalItemTypes.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {ILanguagesModalItemProps} from "@components/features/EditModal/LanguagesModalItem/languagesModalItemTypes.ts";

const LanguagesModalItem: React.FC<ILanguagesModalItemProps> = ({registerOnSave, onSave}) => {

	const [languages, setLanguages] = useState<ILanguage[]>([]);
	const [freelancerLanguages, setFreelancerLanguages] = useState<IFreelancerLanguage[]>([]);
	const [draggableLanguages, setDraggableLanguages] = useState<IFreelancerDraggableLanguage[]>([]);

	const {openModal} = useModal();
	const {patchFreelancerLanguages, getFreelancerBar, getLanguages, loadingStatus} = useFreelancerProfileService();

	useEffect(() => {
		getLanguages()
			.then(setLanguages)
			.catch(console.error);
	}, [getLanguages]);

	useEffect(() => {
		getFreelancerBar()
			.then(response => setFreelancerLanguages(response.languagesLevel))
			.catch(console.error);
	}, [getFreelancerBar]);

	const getDraggableLanguages = useCallback(async () => {
		return freelancerLanguages.map(language =>
			({id: language.language, language: language.language, level: language.level}));
	}, [freelancerLanguages]);

	useEffect(() => {
		getDraggableLanguages()
			.then(setDraggableLanguages)
			.catch(console.error);
	}, [getDraggableLanguages]);
	
	const handleSave = useCallback(() => {
		patchFreelancerLanguages(draggableLanguages
			.map(l => ({language: l.language, level: l.level})))
			.then(onSave)
			.catch(console.error);
	}, [draggableLanguages, onSave, patchFreelancerLanguages]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);

	const handleItemsChange = (newItems: typeof draggableLanguages) => {
		setDraggableLanguages(newItems);
	};

	const renderLanguageItem = (language: IFreelancerDraggableLanguage) => {
		return <LanguageModalItem key={language.id}
		                          language={getPolishLanguageName(language.language)}
		                          level={language.level}
		                          description={getLanguageLevelName(language.level)}
		                          onDelete={() => removeLanguage(language)}
		                          updateLevel={(level: number) => updateLanguageLevel(language.id, level)}/>
	};
	
	const onLanguageChange = (language: IFreelancerLanguage) => {
		setDraggableLanguages(prevState => 
			[...prevState, {id: language.language, language: language.language, level: language.level}]);
	}

	const addLanguage = () => {
		return openModal({
			id: 'languageAdd',
			title: 'Dodaj język',
			shouldCloseOnSaving: true,
			btnText: 'Dodaj język',
			btnWithIcon: true,
			child: <AddLanguageModalItem languages={getAbsentLanguageNames(languages, draggableLanguages)} 
			                             onSave={onLanguageChange}/>
		});
	};

	const removeLanguage = (language: IFreelancerDraggableLanguage) => {
		const newLanguages = draggableLanguages
			.filter(l => l.id !== language.id);
		setDraggableLanguages(newLanguages);
	};

	const updateLanguageLevel = (id: string, newLevel: number) => {
		setDraggableLanguages((prevLanguages) =>
			prevLanguages.map((language) =>
				language.id === id
					? { ...language, level: newLevel }
					: language
			)
		);
	};
	
	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={styles['item']}>
			<div className={styles['item__wrapper']}>
				<DragAndDropContainer items={draggableLanguages}
				                      onItemsChange={handleItemsChange}
				                      renderItem={renderLanguageItem}/>
			</div>
			<button className={`btn btn--more btn--withIcon ${styles['item__btn']}`} onClick={addLanguage}>
				<AddIcon/>
				<span>Dodaj kolejny język</span>
			</button>
		</div>
	)
}

export default LanguagesModalItem;