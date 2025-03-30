import React, { useCallback, useContext, useEffect, useState } from "react";
import { IActivitiesStepProps } from "./activityStepTypes.ts";
import { IActivity, IActivityRequest } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import styles from "../../Onboarding.module.scss";
import InputError from "@ui/InputError/InputError.tsx";
import AnimatedStep from "../AnimatedStep/AnimatedStep.tsx";
import ActivityItem
	from "@components/features/onboarding/components/freelancer/9_ActivitiesStep/ActivityItem/ActivityItem.tsx";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";

const ActivitiesStep: React.FC<IActivitiesStepProps> = ({ userActivities, onNext }) => {

	const { user } = useContext(AuthContext);

	const [ filledInActivities, setFilledInActivities ] = useState<Map<number, number>>(new Map());
	const [ activities, setActivities ] = useState<IActivity[]>([]);
	const [ localError, setLocalError ] = useState<string | null>(null);

	const { loadingStatus, errorMessage, getActivities, patchActivities } = useFreelancerOnboardingService();

	const onSelect = (activityId: number, level: number) => {
		setFilledInActivities((prevState) => {
			const updatedMap = new Map(prevState);
			updatedMap.set(activityId, level);
			return updatedMap;
		});
	};

	useEffect(() => {
		if (!user) return;
		getActivities()
			.then(activities => setActivities(activities))
			.catch(error => console.error(error));
	}, [ getActivities, user ]);

	useEffect(() => {
		if (userActivities.length > 0) {
			setFilledInActivities((prevState) => {
				const updatedMap = new Map(prevState);
				for (const key in userActivities) {
					updatedMap.set(userActivities[key].activityId, userActivities[key].level);
				}
				return updatedMap;
			});
		}
	}, [ userActivities ]);

	const onSubmit = () => {
		if (filledInActivities.size < 1) {
			setLocalError('Aby kontynuować, proszę wybrać ocenę dla przynajmniej jednej z umiejętności');
			return;
		}
		const activityArray: IActivityRequest[] = Array.from(filledInActivities,
			([ activityId, level ]) => ({
				activityId,
				level,
			}));
		patchActivities(activityArray)
			.then(() => {
				onNext();
			}).catch(error => console.error(error));
	}

	const renderActivities = useCallback(() => {
		if (activities.length > 0) {
			return activities.map(activity => {
				return <ActivityItem key={ activity.id }
				                     { ...activity }
				                     level={ filledInActivities.has(activity.id) ? filledInActivities.get(activity.id)! : 0 }
				                     onSelect={ onSelect }/>;
			})
		}
	}, [ activities, filledInActivities ]);

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<AnimatedStep>
			<h1 className={ 'title title--fs40' }>Oceń swoje umiejętności</h1>
			<div className={ styles['onboarding-step__items'] }>
				{ renderActivities() }
			</div>
			<button onClick={ () => onSubmit() }
			        className={ 'btn' }>Przejdż dalej
			</button>
			{ errorMessage && <InputError text={ errorMessage }/> }
			{ localError && <InputError text={ localError }/> }
		</AnimatedStep>
	);
}

export default ActivitiesStep;