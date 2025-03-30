import styles from './OnboardingSearchNavbar.module.scss';
import React from "react";
import { ReactComponent as SearchIcon } from "@icons/named_exported/onboarding/search_icon.svg";

const OnboardingSearchBar:React.FC<{onSearch: (text: string) => void}> = ({onSearch}) => {

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(event.target.value);
	};

	return (
		<div className={styles['searchbar']}>
			<SearchIcon width={16} height={16}/>
			<input id={'searchbar'} name={'searchbar'} type={'text'} placeholder={'Szukaj'} onChange={handleSearch}/>
		</div>
	)
}

export default OnboardingSearchBar;