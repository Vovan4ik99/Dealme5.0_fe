import React from "react";
import {
	IDraggableSectorItemProps
} from "@components/features/EditModal/sectors/DraggableSectorItem/draggableSectorItemTypes.ts";
import styles from "./DraggableSectorItem.module.scss";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import draggable_icon from "@icons/freelancer_profile/secondary_info/draggable_item.svg";

const DraggableSectorItem: React.FC<IDraggableSectorItemProps> = ({name, onDelete}) => {

	return (
		<div className={styles['sector']}>
			<img className={styles['sector__img']} src={draggable_icon} alt={'draggable item'}/>
			<p className={styles['sector__text']}>{name}</p>
			<ActionBtn kind={'Delete'} onClick={onDelete} withBorder={true} backgroundColor={'transparent'}/>
		</div>
	);
};

export default DraggableSectorItem;