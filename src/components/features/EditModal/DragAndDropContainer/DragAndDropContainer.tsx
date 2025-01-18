import React from "react";
import {
	closestCenter,
	DndContext,
	DragEndEvent,
	KeyboardSensor, Modifier,
	PointerSensor,
	useSensor,
	useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import DraggableItem from "../DraggableItem/DraggableItem.tsx";
import {IDragAndDropContainerProps} from "./dragAndDropContainerTypes.ts";
import {Transform} from "@dnd-kit/utilities";

const DragAndDropContainer = <T extends { id: number | string }>({
	                                                                 items,
	                                                                 renderItem,
	                                                                 onItemsChange,
                                                                 }: IDragAndDropContainerProps<T>) => {

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const restrictToContainer: Modifier = ({ transform, activeNodeRect, containerNodeRect }) => {
		if (!activeNodeRect || !containerNodeRect) {
			return transform;
		}

		const restrictedX = Math.min(
			Math.max(transform.x, 0),
			containerNodeRect.width - activeNodeRect.width
		);

		const restrictedY = Math.min(
			Math.max(transform.y, -(activeNodeRect.top - containerNodeRect.top)),
			containerNodeRect.height - activeNodeRect.height
		);

		return {
			x: restrictedX,
			y: restrictedY,
			scaleX: transform.scaleX ?? 1,
			scaleY: transform.scaleY ?? 1,
		} as Transform;
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		if (active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);

			onItemsChange(arrayMove(items, oldIndex, newIndex));
		}
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToContainer]}>
			<SortableContext items={items} strategy={verticalListSortingStrategy}>
				{items.map((item) => (
					<DraggableItem key={item.id} id={item.id}>
						{renderItem(item)}
					</DraggableItem>
				))}
			</SortableContext>
		</DndContext>
	);
};

export default DragAndDropContainer;