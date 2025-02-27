import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import styles from "./FreelancerPortfolio.module.scss";
import React, { ReactElement, useEffect, useState } from "react";
import { useFreelancerPortfolioService } from "@services/freelancer/freelancerPortfolioService.ts";
import { IFreelancerPortfolioProps } from "./freelancerPortfolioTypes.ts";
import { IFreelancerPortfolio } from "@shared/freelancer/portfolio.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";

const FreelancerPortfolio: React.FC<IFreelancerPortfolioProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const SECTION_ID: NavbarSectionKey = 'portfolio';

	const { getPortfolioItems } = useFreelancerPortfolioService();

	const [ portfolioItems, setPortfolioItems ] = useState<IFreelancerPortfolio[]>([]);
	const [ startVisibleItemIndex, setStartVisibleItemIndex ] = useState<number>(0);

	useEffect(() => {
		getPortfolioItems(freelancerId)
			.then(setPortfolioItems)
			.catch(console.error);
	}, [ freelancerId, getPortfolioItems ]);

	const navigateLeft = () => {
		setStartVisibleItemIndex(prev => prev - 1);
	};

	const navigateRight = () => {
		setStartVisibleItemIndex(prev => prev + 1);
	};

	const handleAddPortfolioItem = () => {

	};

	const handleEditPortfolioItem = () => {

	};

	const renderContent = () => {
		const itemsToRender: ReactElement[] = [];

		for (let i = startVisibleItemIndex; i < startVisibleItemIndex + 3; i++) {
			if (i >= portfolioItems.length) break;

			const itemToRender = portfolioItems[i];
			itemsToRender.push(
				<></> //TODO portfolio item should be pushed
			);
		}

		for (let i = itemsToRender.length; i < 3; i++) {
			itemsToRender.push(
				<button key={ i }
				        className={ styles['portfolio__empty'] }
				        style={isLoggedUserProfile ? {cursor: 'pointer'} : {cursor: 'default'}}
				        onClick={ isLoggedUserProfile ? handleAddPortfolioItem : undefined }>
					<AddIcon width={12} height={12}/>
				</button>
			);
		}

		return itemsToRender;
	};

	return (
		<section id={ SECTION_ID } className={ styles['portfolio'] }>
			<header className={ styles['portfolio__header'] }>
				<div className={ styles['portfolio__wrapper'] }>
					<h2 className={ 'title title--profile' }>{ NAVBAR_SECTIONS[SECTION_ID] }</h2>
					{ portfolioItems.length > 0 &&
                        <div className={ styles['portfolio__actions'] }>
                            <ActionBtn kind={ 'Navigate Left' }
                                       onClick={ navigateLeft }
                                       withBorder={ true }
                                       disabled={ startVisibleItemIndex === 0 }
                                       backgroundColor={ 'white' }/>
                            <ActionBtn kind={ 'Navigate Right' }
                                       onClick={ navigateRight }
                                       withBorder={ true }
                                       disabled={ startVisibleItemIndex === portfolioItems.length - 1 }
                                       backgroundColor={ 'white' }/>
                        </div>
					}
				</div>
				{ isLoggedUserProfile &&
                    <div className={ styles['portfolio__actions'] }>
                        <ActionBtn kind={ 'Add' }
                                   onClick={ handleAddPortfolioItem }
                                   withBorder={ true }
                                   backgroundColor={ 'white' }/>
						{ portfolioItems.length > 0 &&
                            <ActionBtn kind={ 'Edit' }
                                       onClick={ handleEditPortfolioItem }
                                       withBorder={ true }
                                       backgroundColor={ 'white' }/>
						}
                    </div>
				}
			</header>
			<div className={ styles['portfolio__content'] }>
				{ portfolioItems.length === 0 &&
                    <AlertItem kind={ 'neutral' }
                               text={ isLoggedUserProfile ?
						           'Nie dodałeś/aś żadnych projektów do portfolio' :
						           'Brak projektów w portfolio' }/>
				}
				<div className={ styles['portfolio__items'] }>
					{ renderContent() }
				</div>
			</div>
		</section>
	);
};

export default FreelancerPortfolio;