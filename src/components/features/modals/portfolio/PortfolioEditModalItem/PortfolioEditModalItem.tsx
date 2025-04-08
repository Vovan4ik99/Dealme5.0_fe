import styles from "./PortfolioEditModalItem.module.scss";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { IFreelancerPortfolio, IFreelancerPortfolioUpdateRequest } from "@shared/freelancer/portfolio.ts";
import { useFreelancerPortfolioService } from "@services/freelancer/freelancerPortfolioService.ts";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import PortfolioAddModalItem
	from "@components/features/modals/portfolio/PortfolioAddModalItem/PortfolioAddModalItem.tsx";
import PortfolioModalItem from "@components/features/modals/portfolio/PortfolioModalItem/PortfolioModalItem.tsx";
import {
	IPortfolioEditModalItemProps
} from "@components/features/modals/portfolio/PortfolioEditModalItem/portfolioEditModalItemTypes.ts";

const PortfolioEditModalItem: React.FC<IPortfolioEditModalItemProps> = ({ onClose }) => {

	const {
		getPortfolioItems,
		addPortfolioItem,
		patchPortfolioItem,
		deletePortfolioItem
	} = useFreelancerPortfolioService();

	const { user } = useContext(AuthContext);
	const { openModal } = useModal();

	const [ portfolioItems, setPortfolioItems ] = useState<IFreelancerPortfolio[]>([]);

	const fetchPortfolioItems = useCallback(() => {
		if (!user) return;
		getPortfolioItems(user.id)
			.then(setPortfolioItems)
			.catch(console.error);
	}, [ getPortfolioItems, user ]);

	useEffect(() => {
		fetchPortfolioItems();
		return () => onClose();
	}, [ fetchPortfolioItems, onClose ]);

	const onPortfolioItemAdd = (item: FormData) => {
		addPortfolioItem(item)
			.then(fetchPortfolioItems)
			.catch(console.error);
	};

	const onPortfolioItemPatch = (item: IFreelancerPortfolioUpdateRequest) => {
		patchPortfolioItem(item)
			.then(fetchPortfolioItems)
			.catch(console.error);
	};

	const onPortfolioItemDelete = (id: number) => {
		deletePortfolioItem(id)
			.then(fetchPortfolioItems)
			.catch(console.error);
	};

	const handleAddPortfolioItem = () => {
		openModal({
			id: 'AddPortfolioModal',
			title: 'Dodaj projekt do portfolio',
			child: <PortfolioAddModalItem onSave={ onPortfolioItemAdd }
			                              isEdit={ false }/>,
			withSaveBtn: true,
			btnWithIcon: true,
			btnText: 'Dodaj projekt',
			shouldCloseOnSaving: false,
		});
	};

	const handlePortfolioItemPatch = (item: IFreelancerPortfolio) => {
		openModal({
			id: 'AddPortfolioModal',
			title: 'Edytuj projekt do portfolio',
			child: <PortfolioAddModalItem onPatch={ onPortfolioItemPatch }
			                              portfolio={ item }
			                              isEdit={ true }/>,
			withSaveBtn: true,
			btnWithIcon: true,
			btnText: 'Zapisz zmiany',
			shouldCloseOnSaving: false,
		});
	};

	const renderPortfolioItems = () => {
		return portfolioItems.map(item => {
			return <PortfolioModalItem key={ item.pictureId }
			                           picture={ item.pictureData }
			                           title={ item.title }
			                           onEdit={ () => handlePortfolioItemPatch(item) }
			                           onDelete={ () => onPortfolioItemDelete(item.pictureId) }/>
		});
	};

	return (
		<div className={ styles['item'] }>
			<div className={ styles['item__content'] }>
				{ renderPortfolioItems() }
			</div>
			<button className={ 'btn btn--modal' } onClick={ handleAddPortfolioItem }>
				<AddIcon/>
				<span>Dodaj kolejne projekty</span>
			</button>
		</div>
	);
};

export default PortfolioEditModalItem;