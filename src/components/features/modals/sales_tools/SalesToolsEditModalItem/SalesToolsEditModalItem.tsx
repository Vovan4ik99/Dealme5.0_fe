import styles from './SalesToolsEditModalItem.module.scss';
import { ReactComponent as AddIcon } from "@icons/named_exported/add_icon.svg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import DragAndDropContainer
	from "@components/features/modals/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import { useModal } from "@context/ModalContext/ModalContext.ts";
import SalesToolModalItem from "@components/features/modals/sales_tools/SalesToolModalItem/SalesToolModalItem.tsx";
import { getPictureForSalesTools, getToolKindNameByKind } from "@utils/salesToolsUtils.ts";
import SalesToolsAddModalItem
	from "@components/features/modals/sales_tools/SalesToolsAddModalItem/SalesToolsAddModalItem.tsx";
import { useFreelancerProfileService } from "@services/freelancer/freelancerProfileService.ts";
import {
	ISalesToolsEditModalItemProps
} from "@components/features/modals/sales_tools/SalesToolsEditModalItem/SalesToolsEditModalItemTypes.ts";

const SalesToolsEditModalItem: React.FC<ISalesToolsEditModalItemProps> = ({ registerOnSave, allSalesTools, onSave }) => {

	const { user } = useContext(AuthContext);

	const { openModal } = useModal();

	const { getFreelancerSalesTools }= useFreelancerProfileService();

	const [ salesTools, setSalesTools ] = useState<ISalesTool[]>([]);

	const handleSave = useCallback(() => {
		onSave(salesTools);
	}, [ onSave, salesTools ]);

	useEffect(() => {
		if (!user) return;

		getFreelancerSalesTools(user.id)
			.then(setSalesTools)
			.catch(console.error);
	}, [ getFreelancerSalesTools, user ]);

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
			<button className={ styles["modal__btn"] } onClick={ handleAddTools }>
				<AddIcon/>
				<span>Dodaj kolejne narzędzie</span>
			</button>
		</div>
	);
}

export default SalesToolsEditModalItem;