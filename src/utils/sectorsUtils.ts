export const calculateBlocks = (
	items: string[],
	containerWidth = 330,
	padding = 8,
	fontSize = 12,
	lineHeight = 1
) => {
	const fullPadding = padding * 2; // Total padding for a block
	const rows = 2; // Maximum number of rows
	let usedWidth = 0; // Current row width
	let rowCount = 0; // Current row index
	const visibleBlocks: string[] = []; // Blocks that fit
	const remainingBlocks: string[] = []; // Blocks that don't fit

	const calculateTextWidth = (text: string): number => {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');
		if (!context) {
			throw new Error('Canvas 2D context is not supported or failed to initialize.');
		}
		context.font = `${fontSize * lineHeight}px Arial`;
		return context.measureText(text).width;
	};

	const addBlockToRow = (blockWidth: number, item: string) => {
		if (usedWidth + blockWidth <= containerWidth) {
			visibleBlocks.push(item);
			usedWidth += blockWidth;
			return true;
		}
		return false;
	};

	const startNewRow = (blockWidth: number, item: string) => {
		rowCount++;
		if (rowCount < rows) {
			usedWidth = blockWidth;
			visibleBlocks.push(item);
		} else {
			remainingBlocks.push(item);
		}
	};

	const processRemainingBlocks = () => {
		if (remainingBlocks.length === 0) return;

		const remainingText = `+${remainingBlocks.length}`;
		const remainingBlockWidth = calculateTextWidth(remainingText) + fullPadding;

		if (!addBlockToRow(remainingBlockWidth, remainingText)) {
			if (rowCount < rows) {
				rowCount++;
				visibleBlocks.push(remainingText);
			} else {
				visibleBlocks.pop();
				visibleBlocks.push(remainingText);
			}
		}
	};

	// Main loop to process items
	for (const item of items) {
		const textWidth = calculateTextWidth(item);
		const blockWidth = textWidth + fullPadding;

		if (!addBlockToRow(blockWidth, item)) {
			startNewRow(blockWidth, item);
		}
	}

	processRemainingBlocks();

	return {
		visibleBlocks,
		remainingBlocks,
	};
};