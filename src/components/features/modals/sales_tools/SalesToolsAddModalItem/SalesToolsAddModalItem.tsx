import SalesToolsList from "@entities/SalesToolsList/SalesToolsList.tsx";
import React, { useCallback, useEffect, useState } from "react";
import { ISalesToolsAddModalItemProps } from "./salesToolsAddModalItemTypes.ts";
import { ISalesTool } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import styles from './SalesToolsAddModalItem.module.scss';

const SalesToolsAddModalItem: React.FC<ISalesToolsAddModalItemProps> = ({
	                                                                        salesTools,
	                                                                        registerOnSave,
	                                                                        onSave,
                                                                        }) => {

	const [ selectedTools, setSelectedTools ] = useState<ISalesTool[]>([]);

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
		<div className={ styles['items'] }>
			<SalesToolsList tools={ salesTools }
			                selectedTools={ selectedTools }
			                setSelectedTools={ setSelectedTools }/>
		</div>
	);
};

export default SalesToolsAddModalItem;