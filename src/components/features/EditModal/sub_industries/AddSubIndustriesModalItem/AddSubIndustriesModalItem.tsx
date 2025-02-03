import React, { useCallback, useEffect, useState } from "react";
import { IAddSubIndustriesModalItemProps } from "./addSubIndustriesModalItemTypes.ts";
import IndustryList from "@entities/IndustryList/IndustryList.tsx";

const AddSubIndustriesModalItem: React.FC<IAddSubIndustriesModalItemProps> = ({
	                                                                              registerOnSave,
	                                                                              industries,
	                                                                              addSubIndustries
                                                                              }) => {

	const [ selectedItems, setSelectedItems ] = useState<number[]>([]);

	const handleSave = useCallback(() => {
		const subIndustries = industries.map(industry => industry.subIndustries).flat()
			.filter(subIndustry => selectedItems.includes(subIndustry.id));
		addSubIndustries(subIndustries);
	}, [addSubIndustries, industries, selectedItems]);

	const onChange = (newSubIndustry: number) => {
		setSelectedItems(prevState => {
			return prevState?.includes(newSubIndustry)
				? prevState?.filter(item => item !== newSubIndustry)
				: [ ...prevState, newSubIndustry ];
		});
	};

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [ handleSave, registerOnSave ]);

	return (
		<IndustryList industries={ industries } selectedSubIndustries={ selectedItems } onChange={ onChange }/>
	)
};

export default AddSubIndustriesModalItem;