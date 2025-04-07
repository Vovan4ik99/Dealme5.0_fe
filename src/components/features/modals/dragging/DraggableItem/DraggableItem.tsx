import React from "react";
import {IDraggableItem} from "./draggableItemTypes.ts";
import {useSortable} from "@dnd-kit/sortable";

const DraggableItem: React.FC<IDraggableItem> = ({id, children}) => {
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

	const toTransformString = (
		transform: { x: number; y: number; scaleX?: number; scaleY?: number } | null
	) => {
		if (!transform) return undefined;
		const { x = 0, y = 0, scaleX = 1, scaleY = 1 } = transform;
		return `translate3d(${x}px, ${y}px, 0) scale(${scaleX}, ${scaleY})`;
	};

	const style = {
		transform: transform ? toTransformString(transform) : undefined,
		transition,
		cursor: 'grab',
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</div>
	);
}

export default DraggableItem;