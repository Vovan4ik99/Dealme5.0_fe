import styles from './SalesToolsEditModalItem.module.scss';
import {ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { ISalesTool } from "@shared/onboardingTypes.ts";
import DragAndDropContainer
	from "@components/features/EditModal/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import SalesToolModalItem from "@components/features/EditModal/sales_tools/SalesToolModalItem/SalesToolModalItem.tsx";
import { getPictureForSalesTools , getToolKindNameByKind} from "@utils/salesToolsUtils.ts";
import { useFreelancerOnboardingService } from "@services/onboarding/freelancerOnboardingService.ts";
import SalesToolsAddModalItem
	from "@components/features/EditModal/sales_tools/SalesToolsAddModalItem/SalesToolsAddModalItem.tsx";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import { ISalesToolsEditModalItemProps } from "@components/features/EditModal/sales_tools/SalesToolsEditModalItem/SalesToolsEditModalItemTypes.ts";

const SalesToolsEditModalItem: React.FC<ISalesToolsEditModalItemProps> = ({ registerOnSave, allSalesTools }) => {

	const { user, getLoggedUserData } = useContext(AuthContext);
	const { openModal } = useModal();
	const { patchSalesTools } = useFreelancerOnboardingService();
	const { getFreelancerSalesTools }= useFreelancerProfileService();

	const [ salesTools, setSalesTools ] = useState<ISalesTool[]>(user?.salesTools || []);

	useEffect(() => {
		if (!user) return;
		getFreelancerSalesTools(user.id)
			.then(setSalesTools)
			.catch(console.error);
	}, [ getFreelancerSalesTools, user ]);

	const handleSave = useCallback(() => {
		patchSalesTools(salesTools.map(tool => tool.id))
			.then(() => getLoggedUserData(localStorage.getItem('token')!))
			.catch(console.error);
	}, [ getLoggedUserData, patchSalesTools, salesTools ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	const renderSalesToolItem = (salesTool: ISalesTool) => {
		return <SalesToolModalItem key={ salesTool.id }
		                           toolName={ salesTool.toolName }
		                           toolImg={ getPictureForSalesTools(salesTool.toolName) }
		                           categoryName={ getToolKindNameByKind(salesTool.kind) }
		                           onDelete={ () => onToolDelete(salesTool) }/>;
	};

	const onToolDelete = (tool: ISalesTool) => {
		setSalesTools((prevState) => prevState.filter(t => t.id !== tool.id));
	};

	const handleToolsChange = (tools: typeof salesTools) => {
		setSalesTools(tools);
	};

	const getSalesToolsToAdd = () => {
		return allSalesTools.filter(tool => !salesTools
			.some(t => t.id === tool.id));
	};

	const onAddNewTools = (newTools: ISalesTool[]) => {
		setSalesTools((prevState) => [ ...prevState, ...newTools ]);
	};

	const handleAddTools = () => {
		openModal({
			id: 'SalesToolsAddModalItem',
			title: 'Dodaj narzędzia sprzedażowe',
			shouldCloseOnSaving: true,
			btnText: 'Dodaj narzędzia sprzedażowe',
			btnWithIcon: true,
			withSaveBtn: true,
			child: <SalesToolsAddModalItem
				salesTools={ getSalesToolsToAdd() }
				onSave={ onAddNewTools }/>
		})
	};

	return (
		<div className={ styles['modal'] }>
			<div className={ styles['modal__content'] }>
				<DragAndDropContainer items={ salesTools }
				                      onItemsChange={ handleToolsChange }
				                      renderItem={ renderSalesToolItem }/>
			</div>
			<button className={ 'btn btn--modal' } onClick={ handleAddTools }>
				<AddIcon/>
				<span>Dodaj kolejne narzędzie</span>
			</button>
		</div>
	);
}

export default SalesToolsEditModalItem;