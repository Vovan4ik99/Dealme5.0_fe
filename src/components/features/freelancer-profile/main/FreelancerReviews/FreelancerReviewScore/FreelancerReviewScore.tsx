import {
	IFreelancerReviewScoreProps
} from "@components/features/freelancer-profile/main/FreelancerReviews/FreelancerReviewScore/freelancerReviewScoreTypes.ts";
import React from "react";
import styles from "./FreelancerReviewScore.module.scss";
import star from '@icons/freelancer_profile/primary_info/star.svg';

const FreelancerReviewScore: React.FC<IFreelancerReviewScoreProps> = ({procent, score}) => {

	return (
		<div className={styles['score']}>
			<div className={styles['score__wrapper']}>
				<img src={star} alt={'score star'}/>
				<span className={styles['score__point']}>{ score }</span>
			</div>
			<div className={styles['score__bar']}>
				<div style={{width: `${procent}%`}}></div>
			</div>
			<p className={styles['score__procent']}>{`${procent}%`}</p>
		</div>
	)
};

export default FreelancerReviewScore;