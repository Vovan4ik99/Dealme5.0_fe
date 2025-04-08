import styles from './SalesToolModalItem.module.scss';
import React from "react";
import {
	ISalesToolModalItemProps
} from "./salesToolModalItemTypes.ts";
import draggable_icon from "@icons/freelancer_profile/secondary_info/draggable_item.svg";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";

const SalesToolModalItem: React.FC<ISalesToolModalItemProps> = ({
	                                                                toolName,
	                                                                toolImg,
	                                                                categoryName,
	                                                                onDelete
                                                                }) => {

	return (
		<div className={styles['tool']}>
			<div className={styles['tool__content']}>
				<div className={styles['tool__icon']}>
					<img src={draggable_icon} alt={'draggable item'}/>
				</div>
				<div className={styles['tool__info']}>
					<p className={styles['tool__category']}>{categoryName}</p>
					<p className={styles['tool__name']}>{toolName}</p>
				</div>
			</div>
			<div className={styles['tool__wrapper']}>
				<div className={styles['tool__img']}>
					{ toolImg && <img src={toolImg} alt={'tool img'}/>}
				</div>
				<ActionBtn kind={'Delete'}
				           onClick={onDelete}
				           withBorder={true}
				           backgroundColor={'transparent'}/>
			</div>
		</div>
	);
}

export default SalesToolModalItem;