import React from "react";
import styles from './ActionBtn.module.scss'
import { IActionBtnProps } from "./actionBtnTypes.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { ReactComponent as EditIcon } from "@icons/named_exported/edit_icon.svg";
import { ReactComponent as CloseIcon } from "@icons/named_exported/close_icon.svg";
import { ReactComponent as DeleteIcon } from "@icons/named_exported/delete_icon.svg";
import { ReactComponent as ArrowLeft } from "@icons/named_exported/onboarding/arrow_left.svg";
import { ReactComponent as ArrowRight } from "@icons/named_exported/arrow_right.svg";
import { ReactComponent as PreviewIcon } from "@icons/named_exported/preview_icon.svg";
import { ReactComponent as Minus } from "@icons/named_exported/minus.svg";
import { ReactComponent as Calendar } from "@icons/named_exported/start-service/calendar.svg";

const ActionBtn: React.FC<IActionBtnProps> = ({
	                                              onClick,
	                                              kind,
	                                              withBorder,
	                                              backgroundColor = 'transparent',
	                                              disabled = false,
	                                              isHovered
                                              }) => {

	const getBtnSvg = () => {
		switch (kind) {
			case 'Edit':
				return <EditIcon
					className={ `${ styles['action__icon'] } ${ styles['icon--edit'] }` }/>;
			case 'Add':
				return <AddIcon
					className={ `${ styles['action__icon'] } ${ styles['icon--add'] }` }/>;
			case 'Close':
				return <CloseIcon
					className={ `${ styles['action__icon'] } ${ styles['icon--close'] }` }/>;
			case 'Delete':
				return <DeleteIcon
					className={ `${ styles['action__icon'] } ${ styles['icon--delete'] }` }/>;
			case 'Navigate Left':
				return <ArrowLeft
					className={ `${ styles['action__icon'] } ${ styles['icon--navigate'] }` }/>;
			case 'Navigate Right':
				return <ArrowRight
					className={ `${ styles['action__icon'] } ${ styles['icon--navigate'] }` }/>;
			case 'Minus':
				return <Minus
					className={ `${ styles['action__icon'] } ${ styles['icon--edit'] }` }/>;
			case 'Calendar':
				return <Calendar
					className={ `${ styles['action__icon'] } ${ styles['icon--edit'] }` }/>;
			case 'Preview':
				return <PreviewIcon className={
					`${ styles['action__icon'] } 
					${ styles['icon--preview'] } 
					${ isHovered && styles['icon--hovered'] }`
				}/>
			default:
				return <></>;
		}
	}

	const handlePointerDown = (e: React.PointerEvent) => {
		e.stopPropagation();
	};

	const getBackgroundColor = () => {
		if (isHovered) {
			return '';
		}
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
			        `${ styles['action'] } 
		            ${ withBorder && styles['action--wb'] } 
		            ${ isHovered && styles['action--active'] }
		            ${ disabled && styles['action--disabled'] }`
		        }>
			{ getBtnSvg() }
		</button>
	);
};

export default ActionBtn;