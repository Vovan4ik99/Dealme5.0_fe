import React from "react";
import styles from './ActionBtn.module.scss'
import {IActionBtnProps} from "./actionBtnTypes.ts";
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import {ReactComponent as EditIcon} from "@icons/named_exported/edit_icon.svg";
import {ReactComponent as CloseIcon} from "@icons/named_exported/close_icon.svg";
import {ReactComponent as DeleteIcon} from "@icons/named_exported/delete_icon.svg";

const ActionBtn: React.FC<IActionBtnProps> = ({onClick, kind, withBorder, backgroundColor = 'transparent'}) => {

	const getBtnSvg = () => {
		switch (kind) {
			case 'Edit':
				return <EditIcon className={`${styles['action-btn__icon']} ${styles['icon--edit']}`}/>;
			case 'Add':
				return <AddIcon className={`${styles['action-btn__icon']} ${styles['icon--close']}`}/>;
			case 'Close':
				return <CloseIcon className={`${styles['action-btn__icon']} ${styles['icon--close']}`}/>;
			case 'Delete':
				return <DeleteIcon className={`${styles['action-btn__icon']} ${styles['icon--delete']}`}/>;
			default:
				return <></>;
		}
	}

	const getBackgroundColor = () => {
		if (backgroundColor === 'transparent') {
			return backgroundColor;
		}
		if (backgroundColor === 'lightgray') {
			return '#F0F1F7';
		}
	}

	return (
		<button style={{backgroundColor: getBackgroundColor()}}
		        onClick={onClick}
		        className={`${styles['action-btn']} ${withBorder && styles['action-btn--wb']}`}>
			{getBtnSvg()}
		</button>
	);
};

export default ActionBtn;