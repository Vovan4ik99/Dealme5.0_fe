import styles from './SalesToolsEditModalItem.module.scss';
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@context/AuthContext/AuthContext.ts";
import { ISalesTool } from "@shared/onboardingTypes.ts";
import DragAndDropContainer
	from "@components/features/EditModal/dragging/DragAndDropContainer/DragAndDropContainer.tsx";
import {
	ISaveableChildProps,
	useModal
} from "@context/ModalContext/ModalContext.ts";
import SalesToolModalItem
	from "@components/features/EditModal/sales_tools/SalesToolModalItem/SalesToolModalItem.tsx";
import {
	getPictureForSalesTools,
	getToolKindNameByKind
} from "@utils/salesToolsUtils.ts";
import { useOnboardingService } from "@services/onboardingService.ts";
import SalesToolsAddModalItem
	from "@components/features/EditModal/sales_tools/SalesToolsAddModalItem/SalesToolsAddModalItem.tsx";

const SalesToolsEditModalItem: React.FC<ISaveableChildProps> = ({registerOnSave}) => {

	const {user, getLoggedUserData} = useContext(AuthContext);
	const {openModal} = useModal();
	const {getSalesTools} = useOnboardingService();

	const [allSalesTools, setAllSalesTools] = useState<ISalesTool[]>([]);
	const [salesTools, setSalesTools] = useState<ISalesTool[]>(user?.salesTools || []);

	useEffect(() => {
		getSalesTools()
			.then(setAllSalesTools)
			.catch(console.error);
	}, [getSalesTools]);

	const handleSave = useCallback(() => {
		//TODO waiting for fixing PATCH on backend
	}, []);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);

	const renderSalesToolItem = (salesTool: ISalesTool) => {
		return <SalesToolModalItem key={salesTool.id}
		                           toolName={salesTool.toolName}
		                           toolImg={getPictureForSalesTools(salesTool.toolName)}
		                           categoryName={getToolKindNameByKind(salesTool.kind)}
		                           onDelete={() => onToolDelete(salesTool)}/>;
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
		setSalesTools((prevState) => [...prevState, ...newTools]);
	};

	const handleAddTools = () => {
		openModal({
			id: 'unknown',
			title: 'Dodaj narzędzia sprzedażowe',
			shouldCloseOnSaving: true,
			btnText: 'Dodaj narzędzia sprzedażowe',
			btnWithIcon: true,
			child: <SalesToolsAddModalItem
				salesTools={getSalesToolsToAdd()}
				onSave={onAddNewTools}/>
		})
	};

	return (
		<div className={styles['modal']}>
			<div className={styles['modal__content']}>
				<DragAndDropContainer items={salesTools}
				                      onItemsChange={handleToolsChange}
				                      renderItem={renderSalesToolItem}/>
			</div>
			<button className={'btn btn--modal'} onClick={handleAddTools}>
				<AddIcon/>
				<span>Dodaj kolejne narzędzie</span>
			</button>
		</div>
	);
}

export default SalesToolsEditModalItem;