import React from "react";
import {
	ILanguageModalItemProps
} from "@components/features/EditModal/LanguagesModalItem/LanguageModalItem/languageModalItemTypes.ts";
import styles from "./LanguageModalItem.module.scss";
import draggable_icon from "@icons/freelancer_profile/secondary_info/draggable_item.svg";
import LevelPicker from "@ui/LevelPicker/LevelPicker.tsx";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";

const LanguageModalItem: React.FC<ILanguageModalItemProps> = ({
	                                                              language,
	                                                              description,
	                                                              level,
	                                                              onDelete,
	                                                              updateLevel
                                                              }) => {

	return (
		<div className={styles['item']}>
			<img src={draggable_icon} alt={'draggable item'}/>
			<div className={styles['item__content']}>
				<span>{language}</span>
				<p className={styles['item__text']}>{description}</p>
			</div>
			<LevelPicker selectedLevel={level} onLevelSelect={updateLevel}/>
			<ActionBtn kind={'Delete'} onClick={onDelete} withBorder={true} backgroundColor={'transparent'}/>
		</div>
	);
};

export default LanguageModalItem;