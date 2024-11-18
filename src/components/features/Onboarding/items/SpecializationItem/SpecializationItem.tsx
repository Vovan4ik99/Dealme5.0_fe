import React from "react";
import {ISpecializationItemProps} from "./specializationItemTypes.ts";
import styles from './SpecializationItem.module.scss';
import info_icon from '../../../../../assets/icons/info_icon.svg';

const SpecializationItem: React.FC<ISpecializationItemProps> = ({item, onSelect, selectedItem}) => {
	return (
		<button className={`${styles['item']} ${item === selectedItem && styles['item--selected']}`} onClick={() => onSelect()}>
			<label className={styles['item__wrapper']} htmlFor={`specialization-${item.id}`}>
				<input type={'radio'} name={'specialization'} id={`specialization-${item.id}`}/>
				<div className={styles['item__add-wrapper']}>
					<div className={`${styles['item__radio']} ${item === selectedItem && styles['item__radio--selected']}`}></div>
					<p className={styles['item__text']}>{item.name}</p>
				</div>
				<div className={styles['item__icon']}>
					<img src={info_icon} alt={'info icon'}/>
				</div>
			</label>
		</button>
	)
}

export default SpecializationItem;