import React from "react";
import { IFreelancerProfileActivityProps } from "./freelancerProfileActivityTypes.ts";
import styles from "./FreelancerProfileActivity.module.scss";
import { ReactComponent as LogoIcon } from "@icons/named_exported/logo_icon.svg";
import LevelPicker from "@ui/common/LevelPicker/LevelPicker.tsx";

const FreelancerProfileActivity: React.FC<IFreelancerProfileActivityProps> = ({
	                                                                              name,
	                                                                              level,
	                                                                              ordersCount,
	                                                                              rating
                                                                              }) => {

	const isRatingEmpty = rating <= 0;

	return (
		<div className={ styles['activity'] }>
			<p className={ styles['activity__name'] }>{ name }</p>
			<div className={ styles['activity__content'] }>
				<div className={ styles['activity__wrapper'] }>
					<div className={ `${ styles['activity__icon'] } ${ isRatingEmpty && styles['activity__icon--empty'] }` }>
						<LogoIcon width={ 12 } height={ 14 }/>
					</div>
					<p className={
						`${ styles['activity__rating'] } ${ isRatingEmpty && styles['activity__rating--empty'] }` }>
						{ `${ rating } pkt` }
					</p>
					<p className={ styles['activity__orders'] }>{ `(${ ordersCount } zleceń)` }</p>
				</div>
				<LevelPicker withoutHoverEffect={ true } selectedLevel={ level }/>
			</div>
		</div>
	)
};

export default FreelancerProfileActivity;