import welcome_icon from '../../../../../assets/icons/freelancer_registration_active.svg';
import React from "react";
import styles from "./WelcomeStep.module.scss";
import {IWelcomeStepProps} from "./welcomeStepTypes.ts";

const WelcomeStep: React.FC<IWelcomeStepProps> = ({username, onNext}) => {

	return (
		<div className={styles['welcome']}>
			<img className={styles['welcome__icon']} src={welcome_icon} alt={'welcome icon'}/>
			<h1 className={'title title--lh120'}>Cześć, {username}</h1>
			<p className={styles['welcome__text']}>
				Miło widzieć Cię na pokładzie Dealme. Na początek uzupełnij swój profil niezbędnymi danymi,
				które pomogą dopasować Twoje usługi do inwestorów
			</p>
			<p className={styles['welcome__add-text']}>
				Będziesz mógł zaktualizować te dane później w profilu użytkownika
			</p>
			<button onClick={() => onNext()} className={'btn btn--mw134'}>Zaczynajmy</button>
		</div>
	)
}

export default WelcomeStep;