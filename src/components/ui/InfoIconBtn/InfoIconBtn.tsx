import styles from './InfoIconBtn.module.scss';
import {CSSTransition} from "react-transition-group";
import React, {useRef, useState} from "react";
import {IInfoIconBtnProps} from "@ui/InfoIconBtn/infoIconBtnTypes.ts";
import {ReactComponent as InfoIcon} from "@icons/named_exported/info_icon.svg";

const InfoIconBtn: React.FC<IInfoIconBtnProps> = ({text, isLeft = false}) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const modalRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className={styles['info']}>
			<div className={`${styles['info__icon']} ${isLeft && styles['info__icon--mt2']}`} role="button"
			     onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
				<InfoIcon/>
			</div>
			<CSSTransition in={isOpen} timeout={300} unmountOnExit nodeRef={modalRef}
			               classNames={{
				               enter: styles['info__modal-enter'],
				               enterActive: styles['info__modal-enter-active'],
				               exit: styles['info__modal-exit'],
				               exitActive: styles['info__modal-exit-active'],
			               }}>
				<div className={`${styles['info__modal']} ${isLeft && styles['info__modal--left']}`} ref={modalRef}>
					<div className={`${styles['info__modal-arrow']} ${isLeft && styles['info__modal-arrow--left']}`}></div>
					<div className={styles['info__modal-content']}>
						<p className={styles['info__modal-text']}>{text}</p>
					</div>
				</div>
			</CSSTransition>
		</div>
	);
}

export default InfoIconBtn;