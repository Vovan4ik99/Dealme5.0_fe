import styles from './InfoIconBtn.module.scss';
import {CSSTransition} from "react-transition-group";
import React, {useRef, useState} from "react";
import {IInfoIconBtnProps} from "@ui/InfoIconBtn/infoIconBtnTypes.ts";

const InfoIconBtn: React.FC<IInfoIconBtnProps> = ({text, isLeft = false}) => {

	const [isOpen, setIsOpen] = useState<boolean>(false);

	const modalRef = useRef<HTMLDivElement | null>(null);

	return (
		<div className={styles['info']}>
			<div className={`${styles['info__icon']} ${isLeft && styles['info__icon--mt2']}`} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
				<svg width="14" height="14" className={styles['icon']} viewBox="0 0 14 14" fill="none"
				     xmlns="http://www.w3.org/2000/svg">
					<g id="Vector">
						<path
							d="M7 0C3.1402 0 0 3.14024 0 7.00004C0 10.8598 3.1402 14 7 14C10.8598 14 14 10.8598 14 7.00004C14 3.14024 10.8598 0 7 0ZM7 12.7273C3.84194 12.7273 1.27273 10.1581 1.27273 7.00004C1.27273 3.84202 3.84194 1.27273 7 1.27273C10.1581 1.27273 12.7273 3.84202 12.7273 7.00004C12.7273 10.1581 10.158 12.7273 7 12.7273Z"
							fill="#75778A"/>
						<path
							d="M6.99992 2.9697C6.53215 2.9697 6.1516 3.3505 6.1516 3.81856C6.1516 4.28621 6.53215 4.66667 6.99992 4.66667C7.46769 4.66667 7.84823 4.28621 7.84823 3.81856C7.84823 3.3505 7.46769 2.9697 6.99992 2.9697Z"
							fill="#75778A"/>
						<path
							d="M7 5.93939C6.64856 5.93939 6.36364 6.22432 6.36364 6.57576V10.3939C6.36364 10.7454 6.64856 11.0303 7 11.0303C7.35144 11.0303 7.63636 10.7454 7.63636 10.3939V6.57576C7.63636 6.22432 7.35144 5.93939 7 5.93939Z"
							fill="#75778A"/>
					</g>
				</svg>
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