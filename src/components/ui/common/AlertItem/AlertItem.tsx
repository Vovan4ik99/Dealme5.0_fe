import React, { useEffect, useState } from "react";
import styles from './AlertItem.module.scss';
import { IAlertItemProps } from "@ui/common/AlertItem/alertItemTypes.ts";
import success_icon from "@icons/alert/success_icon.svg";
import danger_icon from "@icons/alert/danger_icon.svg";
import warning_icon from "@icons/alert/warning_icon.svg";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";

const AlertItem: React.FC<IAlertItemProps> = ({kind, text, hasMarginTop}) => {

	const [isVisible, setIsVisible] = useState<boolean>(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), 10);
		return () => clearTimeout(timer);
	}, []);

	const getAlertItemByKind = () => {
		switch (kind) {
			case 'success':
				return <div className={`${styles['item__wrapper']} ${styles['item__wrapper--success']}`}>
					<img src={success_icon} alt="success"/>
					<p className={styles['item__text']}>{text}</p>
				</div>
			case 'neutral':
				return <div className={`${styles['item__wrapper']} ${styles['item__wrapper--neutral']}`}>
					<div className={styles['item__icon']}>
						<InfoIcon width={14} height={14}/>
					</div>
					<p className={styles['item__text']}>{text}</p>
				</div>
			case 'error':
				return <div className={`${styles['item__wrapper']} ${styles['item__wrapper--danger']}`}>
					<img src={danger_icon} alt="danger"/>
					<p className={styles['item__text']}>{text}</p>
				</div>
			case 'info':
				return <div className={`${styles['item__wrapper']} ${styles['item__wrapper--info']}`}>
					<InfoIcon fill={'#00C3DF'}/>
					<p className={styles['item__text']}>{text}</p>
				</div>
			case 'warning':
				return <div className={`${styles['item__wrapper']} ${styles['item__wrapper--warning']}`}>
					<img src={warning_icon} alt="warning"/>
					<p className={styles['item__text']}>{text}</p>
				</div>
			default:
				return <></>;
		}
	}

	return (
		<div style={{marginTop: `${hasMarginTop ? '20px' : '0'} `}}
		     className={`${styles['item']} ${isVisible ? styles['item--enter'] : styles['item--exit']}`}>
			{getAlertItemByKind()}
		</div>
	)
}

export default AlertItem;