import React from "react";

export interface IDragAndDropContainerProps<T> {
	items: T[];
	renderItem: (item: T) => React.ReactNode;
	onItemsChange: (items: T[]) => void;
}