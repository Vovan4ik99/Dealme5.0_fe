import React from "react";
import {IStatusItemProps} from "@ui/StatusItem/statusItemTypes.ts";
import styles from './StatusItem.module.scss';
import {ReactComponent as LogoIcon} from "@icons/named_exported/logo_icon.svg";
import limited_availability from "@icons/freelancer_profile/primary_info/limited_availability_icon.svg";

const StatusItem: React.FC<IStatusItemProps> = ({kind}) => {

	const getStatusItem = () => {
		switch (kind) {
			case 'normal account status':
				return <div className={`${styles['item']} ${styles['item--account-normal']}`}>
					<LogoIcon/>
					<span>Polecany przez Dealme</span>
				</div>;
			case 'limited availability':
				return <div className={`${styles['item']} ${styles['item--availability-limited']}`}>
					<img src={limited_availability} alt="limited availability"/>
					<span>Ograniczona dostępność</span>
				</div>;
			default:
				return <></>
		}
	}

	return (
		getStatusItem()
	);
}

export default StatusItem;