import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import React, { useEffect, useState } from "react";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import styles from "./FreelancerReviews.module.scss";
import FreelancerReview
	from "@components/features/freelancer-profile/main/FreelancerReviews/FreelancerReview/FreelancerReview.tsx";
import FreelancerReviewScore
	from "@components/features/freelancer-profile/main/FreelancerReviews/FreelancerReviewScore/FreelancerReviewScore.tsx";
import { REVIEW_CATEGORIES } from "@constants/reviewCategories.ts";
import star from '@icons/freelancer_profile/primary_info/star.svg';
import AlertItem from "@ui/common/AlertItem/AlertItem.tsx";
import { IFreelancerReview } from "@shared/freelancer/review.ts";
import {
	IFreelancerReviewsProps
} from "@components/features/freelancer-profile/main/FreelancerReviews/freelancerReviewsTypes.ts";

const FreelancerReviews: React.FC<IFreelancerReviewsProps> = ({ isLoggedUserProfile, freelancerId }) => {

	const SECTION_ID: NavbarSectionKey = "reviews";

	const { getFreelancerReviews } = useFreelancerProfileService();

	const [ reviews, setReviews ] = useState<IFreelancerReview[]>([]);
	const [ reviewsCount, setReviewsCount ] = useState<number>(3);

	useEffect(() => {
		getFreelancerReviews(freelancerId)
			.then(setReviews)
			.catch(console.error);
	}, [ freelancerId, getFreelancerReviews ]);

	const countScoresProcent = () => {
		const totalReviews = reviews.length;
		const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

		reviews.forEach(({ score }) => {
			if (ratingCounts[score] !== undefined) {
				ratingCounts[score]++;
			}
		});

		return Object.keys(ratingCounts)
			.reduce((result, key) => {
				const rating = Number(key);
				result[rating] = totalReviews > 0 ? (ratingCounts[rating] / totalReviews) * 100 : 0;
				return result;
			}, {} as Record<number, number>);
	};

	const renderReviews = (reviewsToRender: IFreelancerReview[]) => {
		return reviewsToRender.map(review => {
			return <FreelancerReview key={ review.id }
			                         score={ review.score }
			                         date={ review.date }
			                         username={ review.authorFirstName + ' ' + review.authorLastName }
			                         description={ '' }/>
		});
	};

	const renderScores = () => {
		const scores = countScoresProcent();
		return (
			<>
				{ Object.entries(scores)
					.sort(([ a ], [ b ]) => parseInt(b) - parseInt(a))
					.map(([ score, procent ]) => (
						<FreelancerReviewScore
							key={ score }
							score={ parseInt(score) }
							procent={ procent }
						/>
					)) }
			</>
		);
	};

	const renderCategories = () => {
		return (
			<>
				{ reviews.flatMap(review => review.categoryOpinions)
					.map(category => (
						<div key={ category.id } className={ styles['reviews__category'] }>
							<p className={ styles['reviews__category-name'] }>
								{ REVIEW_CATEGORIES[category.category] }
							</p>
							<div className={ styles['reviews__category-wrapper'] }>
								<img src={ star } alt="review star"/>
								<span className={ styles['reviews__category-point'] }>
									{ category.score }
								</span>
							</div>
						</div>
					)) }
			</>
		);
	};

	return (
		<section className={ styles['reviews'] } id={ SECTION_ID }>
			<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
			{ reviews.length === 0 ?
				<AlertItem kind={ 'neutral' }
				           text={ isLoggedUserProfile ? 'Nie posiadasz żadnych opinii' : 'Brak opinii' }/> :
				<div className={ styles['reviews__content'] }>
					<div>
						<h3 className={ styles['reviews__title'] }>Opinie</h3>
						<div className={ styles['reviews__items'] }>
							{ renderReviews(reviews.slice(0, reviewsCount)) }
						</div>
						{ reviews.length > reviewsCount &&
                            <button onClick={ () => setReviewsCount(reviews.length) } className={ styles["reviews__btn"] }>
								{ `Rozwiń wszystkie +${ reviews.length - reviewsCount }` }
                            </button>
						}
					</div>
					<div>
						<div className={ styles['reviews__scores'] }>
							<h3 className={ styles['reviews__title'] }>Oceny</h3>
							{ renderScores() }
						</div>
						<div className={ styles['reviews__categories'] }>
							<h3 className={ styles['reviews__title'] }>Kategoria</h3>
							{ renderCategories() }
						</div>
					</div>
				</div>
			}
		</section>
	);
};

export default FreelancerReviews;