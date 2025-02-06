import React from "react";
import {
	IFreelancerReviewProps
} from "@components/features/FreelancerProfile/main/FreelancerReviews/FreelancerReview/freelancerReviewTypes.ts";
import styles from "./FreelancerReview.module.scss";
import star from "@icons/freelancer_profile/primary_info/star.svg";
import star_gray from "@icons/freelancer_profile/reviews/star_gray.svg";
import default_avatar from "@icons/profile_navbar/default_avatar.svg";
import calendar from "@icons/freelancer_profile/secondary_info/calendar.svg";

const FreelancerReview: React.FC<IFreelancerReviewProps> = ({ score, date, userAvatar, description, username }) => {

	const renderStars = () => {
		const stars = [];
		for (let i = 1; i < 6; i++) {
			const isGray = i > score;
			stars.push(
				<div className={ styles["review__star"] }>
					<img src={ isGray ? star_gray : star } alt={ 'review star' }/>
				</div>
			);
		}
		return stars;
	};

	const getPolishTimeAgo = () => {
		const now = new Date();
		const reviewDate = new Date(date);
		reviewDate.setHours(0, 0, 0, 0);

		const diffMs = now.getTime() - reviewDate.getTime();
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return "Dzisiaj";
		if (diffDays === 1) return "Wczoraj";

		if (diffDays < 7) return `${ diffDays } dni temu`;

		const diffWeeks = Math.floor(diffDays / 7);
		if (diffWeeks < 4) return diffWeeks === 1 ? "Tydzień temu" : `${diffWeeks} tygodnie temu`;

		const diffMonths = Math.floor(diffDays / 30);
		if (diffMonths < 12) return diffMonths === 1 ? "Miesiąc temu" : `${diffMonths} miesięcy temu`;

		const diffYears = Math.floor(diffMonths / 12);
		if (diffYears === 1) return "Rok temu";

		return reviewDate.toLocaleDateString("pl-PL", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});
	};

	return (
		<div className={ styles["review"] }>
			<div className={ styles["review__rating"] }>
				{ renderStars() }
				<p className={ styles["review__text"] }>
					{ score }
				</p>
			</div>
			<p className={ styles["review__description"] }>
				{ description }
			</p>
			<div className={ styles["review__footer"] }>
				<div className={ styles["review__wrapper"] }>
					<div
						className={ `${ styles["review__avatar"] } ${ !userAvatar && styles["review__avatar--empty"] }` }>
						<img src={ default_avatar } alt="user avatar"/>
					</div>
					<p className={ styles["review__text"] }>
						{ username }
					</p>
				</div>
				<div className={ styles["review__wrapper"] }>
					<div className={ styles['review__'] }>
						<img src={ calendar } alt="review date"/>
					</div>
					<p className={ styles["review__text"] }>
						{ getPolishTimeAgo() }
					</p>
				</div>
			</div>
		</div>
	);
};

export default FreelancerReview;