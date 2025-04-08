import React, { useCallback, useEffect, useState } from "react";
import { IAddSubIndustriesModalItemProps } from "./addSubIndustriesModalItemTypes.ts";
import IndustryList from "@entities/IndustryList/IndustryList.tsx";
import { ISubIndustry } from "@shared/onboarding/freelancerOnboardingTypes.ts";
import styles from './AddSubIndustriesModalItem.module.scss';

const AddSubIndustriesModalItem: React.FC<IAddSubIndustriesModalItemProps> = ({
	                                                                              registerOnSave,
	                                                                              industries,
	                                                                              addSubIndustries
                                                                              }) => {

	const [ selectedSubIndustries, setSelectedSubIndustries ] = useState<ISubIndustry[]>([]);

	const handleSave = useCallback(() => {
		addSubIndustries(selectedSubIndustries);
	}, [ addSubIndustries, selectedSubIndustries ]);

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<div className={ styles['items'] }>
			<IndustryList industries={ industries }
			              selectedSubIndustries={ selectedSubIndustries }
			              setSelectedSubIndustries={ setSelectedSubIndustries }/>
		</div>
	)
};

export default AddSubIndustriesModalItem;