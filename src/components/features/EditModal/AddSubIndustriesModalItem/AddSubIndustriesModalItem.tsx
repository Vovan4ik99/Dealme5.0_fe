import React, {useCallback, useEffect, useState} from "react";
import {IAddSubIndustriesModalItemProps} from "./addSubIndustriesModalItemTypes.ts";
import {useModal} from "@context/ModalContext/ModalContext.ts";
import IndustryList from "@entities/IndustryList/IndustryList.tsx";

const AddSubIndustriesModalItem: React.FC<IAddSubIndustriesModalItemProps> = ({registerOnSave, industries}) => {

	const {updateModalData} = useModal();
	
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	
	const handleSave = useCallback(() => {
		const subIndustries = industries.map(industry => industry.subIndustries).flat()
			.filter(subIndustry => selectedItems.includes(subIndustry.id));
		updateModalData('subIndustriesEdit', {subIndustries: subIndustries})
	}, [industries, selectedItems, updateModalData]);

	const onChange = (newSubIndustry: number) => {
		setSelectedItems(prevState => {
			return prevState?.includes(newSubIndustry)
				? prevState?.filter(item => item !== newSubIndustry)
				: [...prevState, newSubIndustry];
		});
	};

	useEffect(() => {
		registerOnSave!(handleSave);
	}, [handleSave, registerOnSave]);
	
	return (
		<IndustryList industries={industries} selectedSubIndustries={selectedItems} onChange={onChange}/>
	)
};

export default AddSubIndustriesModalItem;