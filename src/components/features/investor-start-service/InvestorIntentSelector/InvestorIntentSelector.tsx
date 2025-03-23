import styles from "./InvestorIntentSelector.module.scss";
import { ReactComponent as ArrowRight } from "@icons/named_exported/arrow_right.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";

const InvestorIntentSelector = () => {

	const { loadingStatus, loginInvestor } = useContext(AuthContext);

	const navigate = useNavigate();

	const redirectLoggedInUser = (to: 'service' | 'onboarding') => {
		loginInvestor()
			.then(() => {
				const pathToNavigate = `/investor/${ to === 'service' ? 'service' : 'onboarding' }`;
				navigate(pathToNavigate);
			}).catch(console.error);
	};

	if (loadingStatus === 'loading') {
		return <LoadingSpinner/>;
	}

	return (
		<div className={ styles['selector'] }>
			<div className={ styles['selector__item'] }>
				<h2 className={ styles['selector__subtitle'] }>
					<span className={ styles['selector__subtitle--bold'] }>
						Wiem jakiej usługi potrzebuję.<br/>
					</span>
					<span>
						Nie potrzebuję pomocy.
					</span>
				</h2>
				<p className={ styles['selector__text'] }>
					Przejdziesz do definiowania szczegółów usługi
				</p>
				<button className={ styles['selector__btn'] }
				        onClick={ () => redirectLoggedInUser('service') }>
					<span>Wybierz i przejdź dalej</span>
					<ArrowRight width={ 5 } height={ 8 }/>
				</button>
			</div>
			<div className={ styles['selector__item'] }>
				<h2 className={ styles['selector__subtitle'] }>
					<span className={ styles['selector__subtitle--bold'] }>
						Nie wiem jak zdefiniować usługę.<br/>
					</span>
					<span>
						Potrzebuję pomocy.
					</span>
				</h2>
				<p className={ styles['selector__text'] }>
					Przejdziesz do formularza w którym opowiesz nam o swoich potrzebach a
					pomożemy Ci zdefiniować usługę
				</p>
				<button className={ styles['selector__btn'] }
				        onClick={ () => redirectLoggedInUser('onboarding') }>
					<span>Wybierz i przejdź dalej</span>
					<ArrowRight width={ 5 } height={ 8 }/>
				</button>
			</div>
		</div>
	)
};

export default InvestorIntentSelector;