import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import styles from "./BaseEditModal.module.scss";
import ActionBtn from "@ui/button/ActionBtn/ActionBtn.tsx";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { IBaseEditModalProps } from "./baseEditModalTypes.ts";
import { ISaveableChildProps, OnSaveCallback } from "@context/ModalContext/ModalContext.ts";

const BaseEditModal: React.FC<IBaseEditModalProps> = ({
	                                                      title,
	                                                      child,
	                                                      onClose,
	                                                      btnText,
	                                                      btnWithIcon,
	                                                      offset,
	                                                      zIndex,
	                                                      shouldCloseOnSaving,
	                                                      withSaveBtn,
                                                      }) => {

	const onSaveRef = useRef<OnSaveCallback | null>(null);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);

	//local state to handle modal appear animation
	useEffect(() => {
		setIsModalVisible(true);
	}, []);

	const handleClose = useCallback(() => {
		setIsClosing(true);
		setTimeout(onClose, 300);
	}, [onClose]);

	const registerOnSave = (onSave: OnSaveCallback) => {
		onSaveRef.current = onSave;
	};

	const handleSave = () => {
		if (!onSaveRef.current) {
			console.error('onSave callback is not registered');
			return;
		}
		onSaveRef.current();
		if (shouldCloseOnSaving) {
			handleClose();
		}
	};

	//Rendering child with possibility to call it's onSave function while clicking the submit button
	const renderChild = (child: ReactElement<ISaveableChildProps>) => {
		return React.cloneElement(child, {registerOnSave, handleClose});
	};

	return (
		<div
			className={`${styles['modal']} ${isModalVisible && !isClosing ? styles['modal--enter'] : styles['modal--exit']}`}
			style={{
				'--offset': `${offset}%`,
				'--exitOffset': `calc(${offset}% + 100%)`,
				zIndex,
			} as React.CSSProperties}>
			<div className={styles['modal__icon']}>
				<ActionBtn onClick={handleClose} kind={'Close'} withBorder={true}/>
			</div>
			<div className={styles['modal__content']}>
				<h2 className={'title title--modal'}>{title}</h2>
				<div className={styles['modal__body']}>{renderChild(child)}</div>
			</div>
			{withSaveBtn &&
                <footer>
                    <div className={styles['modal__divider']}></div>
                    <div className={styles['modal__btn-wrapper']}>

                        <button className={'btn btn--withIcon'} onClick={handleSave}>
							{btnWithIcon && <AddIcon fill={'#fffff'}/>}
                            <span>{btnText}</span>
                        </button>
                    </div>
                </footer>
			}
		</div>
	);
};

export default BaseEditModal;
