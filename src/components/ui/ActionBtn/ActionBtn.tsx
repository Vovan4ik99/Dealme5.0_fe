import React from "react";
import styles from './ActionBtn.module.scss'
import { IActionBtnProps } from "./actionBtnTypes.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { ReactComponent as EditIcon } from "@icons/named_exported/edit_icon.svg";
import { ReactComponent as CloseIcon } from "@icons/named_exported/close_icon.svg";
import { ReactComponent as DeleteIcon } from "@icons/named_exported/delete_icon.svg";
import { ReactComponent as ArrowLeft } from "@icons/named_exported/arrow_left.svg";
import { ReactComponent as ArrowRight } from "@icons/named_exported/arrow_right.svg";

const ActionBtn: React.FC<IActionBtnProps> = ({
	                                              onClick,
	                                              kind,
	                                              withBorder,
	                                              backgroundColor = 'transparent',
	                                              disabled = false,
                                              }) => {

	const getBtnSvg = () => {
		switch (kind) {
			case 'Edit':
				return <EditIcon
					className={ `${ styles['action-btn__icon'] } ${ styles['icon--edit'] }` }/>;
			case 'Add':
				return <AddIcon
					className={ `${ styles['action-btn__icon'] } ${ styles['icon--add'] }` }/>;
			case 'Close':
				return <CloseIcon
					className={ `${ styles['action-btn__icon'] } ${ styles['icon--close'] }` }/>;
			case 'Delete':
				return <DeleteIcon
					className={ `${ styles['action-btn__icon'] } ${ styles['icon--delete'] }` }/>;
			case 'Navigate Left':
				return <ArrowLeft
					className={ `${ styles['action-btn__icon'] } ${ styles['icon--navigate'] }` }/>;
			case 'Navigate Right':
				return <ArrowRight
					className={ `${ styles['action-btn__icon'] } ${ styles['icon--navigate'] }` }/>;
			default:
				return <></>;
		}
	}

	const handlePointerDown = (e: React.PointerEvent) => {
		e.stopPropagation();
	};

	const getBackgroundColor = () => {
		if (backgroundColor === 'transparent') {
			return backgroundColor;
		}
		if (backgroundColor === 'lightgray') {
			return '#F0F1F7';
		}
		if (backgroundColor === 'white') {
			return '#FFFFFF';
		}
	};

	const handleClick = (e: React.MouseEvent | React.PointerEvent) => {
		e.stopPropagation();
		onClick();
	};

	return (
		<button style={ { backgroundColor: getBackgroundColor() } }
		        onClick={ handleClick }
		        onPointerDown={ handlePointerDown }
		        disabled={ disabled }
		        className={
			        `${ styles['action-btn'] } 
		            ${ withBorder && styles['action-btn--wb'] } 
		            ${ disabled && styles['action-btn--disabled'] }`
		        }>
			{ getBtnSvg() }
		</button>
	);
};

export default ActionBtn;