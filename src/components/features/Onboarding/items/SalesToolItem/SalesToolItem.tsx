import React from "react";
import {ISalesToolItemProps} from "./salesToolItemTypes.ts";
import styles from "../OnboardingItems.module.scss";
import checkbox_checked from '@icons/auth/checkbox_checked.svg';

const SalesToolItem: React.FC<ISalesToolItemProps> = ({text, isSelected, onChange, picture}) => {

	return (
		<button className={`${styles['item']} ${isSelected && styles['item--selected']}`} onClick={onChange}>
			<label className={`${styles['item__wrapper']}`} htmlFor={text}>
				<input id={text} type={'checkbox'} name={'workday'} onClick={(e) => e.stopPropagation()}/>
				<div className={styles['item__add-wrapper']}>
					<div className={styles['item__checkbox']}>
						{isSelected && <img src={checkbox_checked} alt={'checkbox'}/>}
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
				{picture &&
                    <div>
                        <img src={picture} alt={'sales tool'}/>
                    </div>
				}
			</label>
		</button>
	);
};

export default SalesToolItem;