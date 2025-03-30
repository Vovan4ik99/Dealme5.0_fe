import SalesToolsList from "@entities/SalesToolsList/SalesToolsList.tsx";
import React, { useCallback, useEffect, useState } from "react";
import {
	ISalesToolsAddModalItemProps
} from "@components/features/EditModal/sales_tools/SalesToolsAddModalItem/salesToolsAddModalItemTypes.ts";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";

const SalesToolsAddModalItem: React.FC<ISalesToolsAddModalItemProps> = ({
	                                                                        salesTools,
	                                                                        registerOnSave,
	                                                                        onSave,
                                                                        }) => {

	const [ selectedTools, setSelectedTools ] = useState<ISalesTool[]>([]);

	const onChange = (newTool: number) => {
		setSelectedTools(prevState => {
			const toolToAdd = salesTools.find(tool => tool.id === newTool);

			if (!toolToAdd) return prevState;

			return prevState.includes(toolToAdd)
				? prevState.filter(tool => tool !== toolToAdd)
				: [ ...prevState, toolToAdd ];
		});
	};

	const handleSave = useCallback(() => {
		if (selectedTools.length <= 0) {
			return;
		}
		onSave(selectedTools);
	}, [ onSave, selectedTools ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<SalesToolsList tools={ salesTools }
		                selectedTools={ selectedTools.map(tool => tool.id) }
		                onChange={ onChange }/>
	);
};

export default SalesToolsAddModalItem;