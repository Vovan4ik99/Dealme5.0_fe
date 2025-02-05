import React from "react";
import { IFreelancerProfileActivityProps } from "./freelancerProfileActivityTypes.ts";
import styles from "./FreelancerProfileActivity.module.scss";
import { ReactComponent as LogoIcon } from "@icons/named_exported/logo_icon.svg";
import LevelPicker from "@ui/LevelPicker/LevelPicker.tsx";

const FreelancerProfileActivity: React.FC<IFreelancerProfileActivityProps> = ({
	                                                                              name,
	                                                                              level,
	                                                                              ordersCount,
	                                                                              rating
                                                                              }) => {

	return (
		<div className={ styles['activity'] }>
			<p className={styles['activity__name']}>{name}</p>
			<div className={ styles['activity__content'] }>
				<div className={ styles['activity__wrapper'] }>
					<LogoIcon width={12} height={12}/>
					<p className={
						`${styles['activity__rating']} ${rating <= 0 && styles['activity__rating--empty']}`}>
						{`${rating} pkt`}
					</p>
					<p className={ styles['activity__orders'] }>{`(${ordersCount} zleceń)`}</p>
				</div>
				<LevelPicker withoutHoverEffect={true} selectedLevel={level}/>
			</div>
		</div>
	)
};

export default FreelancerProfileActivity;