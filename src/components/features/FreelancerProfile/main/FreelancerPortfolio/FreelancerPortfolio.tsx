import { NAVBAR_SECTIONS, NavbarSectionKey } from "@constants/freelancerInnerNavbarSections.ts";
import styles from "./FreelancerPortfolio.module.scss";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { useFreelancerPortfolioService } from "@services/freelancer/freelancerPortfolioService.ts";
import { IFreelancerPortfolioProps } from "./freelancerPortfolioTypes.ts";
import { IFreelancerPortfolio } from "@shared/freelancer/portfolio.ts";
import ActionBtn from "@ui/ActionBtn/ActionBtn.tsx";
import AlertItem from "@ui/AlertItem/AlertItem.tsx";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import PortfolioAddModalItem
	from "@components/features/EditModal/portfolio/PortfolioAddModalItem/PortfolioAddModalItem.tsx";
import PortfolioProfileItem
	from "@components/features/FreelancerProfile/main/FreelancerPortfolio/PortfolioProfileItem/PortfolioProfileItem.tsx";
import PreviewGalleryModal from "@ui/PreviewGalleryModal/PreviewGalleryModal.tsx";

const FreelancerPortfolio: React.FC<IFreelancerPortfolioProps> = ({ freelancerId, isLoggedUserProfile }) => {

	const SECTION_ID: NavbarSectionKey = 'portfolio';

	const { getPortfolioItems, addPortfolioItem } = useFreelancerPortfolioService();
	const { openModal } = useModal();

	const [ portfolioItems, setPortfolioItems ] = useState<IFreelancerPortfolio[]>([]);
	const [ startVisibleItemIndex, setStartVisibleItemIndex ] = useState<number>(0);
	const [ isPreviewModalOpened, setIsPreviewModalOpened ] = useState<boolean>(false);
	const [ previewItemIndex, setPreviewItemIndex ] = useState<number>(0);

	const fetchPortfolioItems = useCallback(() => {
		getPortfolioItems(freelancerId)
			.then(setPortfolioItems)
			.catch(console.error);
	}, [ freelancerId, getPortfolioItems ]);

	useEffect(() => {
		fetchPortfolioItems();
	}, [ fetchPortfolioItems ]);

	const navigateLeft = () => {
		setStartVisibleItemIndex(prev => prev - 1);
	};

	const navigateRight = () => {
		setStartVisibleItemIndex(prev => prev + 1);
	};

	const onPortfolioItemAdd = (request: FormData) => {
		addPortfolioItem(request)
			.then(fetchPortfolioItems)
			.catch(console.error);
	};

	const handleAddPortfolioItem = () => {
		openModal({
			id: 'AddPortfolioModal',
			title: 'Dodaj projekt do portfolio',
			child: <PortfolioAddModalItem onSave={ onPortfolioItemAdd }/>,
			withSaveBtn: true,
			btnWithIcon: true,
			btnText: 'Dodaj projekt',
			shouldCloseOnSaving: false,
		});
	};

	const handleEditPortfolioItem = () => {

	};

	const onPortfolioItemEdit = (portfolio: IFreelancerPortfolio) => {
		openModal({
			id: 'AddPortfolioModal',
			title: 'Edytuj projekt do portfolio',
			child: <PortfolioAddModalItem onSave={ onPortfolioItemAdd }
			                              portfolio={ portfolio }/>,
			withSaveBtn: true,
			btnWithIcon: true,
			btnText: 'Zapisz zmiany',
			shouldCloseOnSaving: false,
		});
	};

	const renderContent = () => {
		const itemsToRender: ReactElement[] = [];

		portfolioItems.forEach((portfolioItem, index) => {
			itemsToRender.push(
				<PortfolioProfileItem key={ portfolioItem.id }
				                      picture={ portfolioItem.pictureData }
				                      title={ portfolioItem.title }
				                      comment={ portfolioItem.info }
				                      onPreviewClick={ () => {
					                      setPreviewItemIndex(index);
					                      setIsPreviewModalOpened(true);
				                      } }
				                      onEditClick={ () => onPortfolioItemEdit(portfolioItem) }/>
			);
		});

		for (let i = itemsToRender.length; i < 3; i++) {
			itemsToRender.push(
				<button key={ i + '-empty' }
				        className={ styles['portfolio__empty'] }
				        style={ isLoggedUserProfile ? { cursor: 'pointer' } : { cursor: 'default' } }
				        onClick={ isLoggedUserProfile ? handleAddPortfolioItem : undefined }>
					<AddIcon width={ 12 } height={ 12 }/>
				</button>
			);
		}

		return itemsToRender;
	};

	const getGalleryItems = () => {
		return portfolioItems.map(portfolioItem => {
			return {
				title: portfolioItem.title,
				picture: portfolioItem.pictureData,
				description: portfolioItem.info,
			}
		});
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
                                       disabled={
								           startVisibleItemIndex === portfolioItems.length - 3 ||
								           portfolioItems.length <= 3
							           }
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
				<div
					style={ {
						transform: `translateX(-${ startVisibleItemIndex * (281 + 16) }px)`
					} }
					className={ styles['portfolio__inner'] }>
					{ renderContent() }
				</div>
			</div>
			{ portfolioItems.length > 0 &&
                <PreviewGalleryModal galleryItems={ getGalleryItems() }
                                     isModalOpened={ isPreviewModalOpened }
                                     startIndex={ previewItemIndex }
                                     onClose={ () => setIsPreviewModalOpened(false) }/>
			}
		</section>
	);
};

export default FreelancerPortfolio;