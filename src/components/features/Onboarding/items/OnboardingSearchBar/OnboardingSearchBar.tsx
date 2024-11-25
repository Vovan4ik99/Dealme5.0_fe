import search_icon from '@icons/search_icon.svg';
import styles from './OnboardingSearchNavbar.module.scss';
import React from "react";

const OnboardingSearchBar:React.FC<{onSearch: (text: string) => void}> = ({onSearch}) => {

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(event.target.value);
	};

	return (
		<div className={styles['searchbar']}>
			<img src={search_icon} alt={'search icon'}/>
			<input id={'searchbar'} name={'searchbar'} type={'text'} placeholder={'Szukaj'} onChange={handleSearch}/>
		</div>
	)
}

export default OnboardingSearchBar;