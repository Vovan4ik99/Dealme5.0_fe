import React from "react";
import {ISubIndustryModalItemProps} from "./subindustryModalItemTypes.ts";
import styles from './SubIndustryModalItem.module.scss';
import draggable_item from '@icons/freelancer_profile/secondary_info/draggable_item.svg';
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";

const SubIndustryModalItem: React.FC<ISubIndustryModalItemProps> = ({label, text, onDelete}) => {

	return (
		<div className={styles['item']}>
			<img src={draggable_item} alt={'draggable_item'}/>
			<div className={styles['item__wrapper']}>
				<span>{label}</span>
				<p className={styles['item__text']}>{text}</p>
			</div>
			<ActionBtn key={text}
			           kind={'Delete'}
			           withBorder={true}
			           backgroundColor={'transparent'}
			           onClick={onDelete}/>
		</div>
	)
}

export default SubIndustryModalItem;