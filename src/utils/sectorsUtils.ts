export const calculateBlocks = (
	items: string[],
	containerWidth = 330,
	padding = 8,
	flexGap = 4,
	fontSize = 12,
	lineHeight = 1
) => {
	const fullPadding = padding * 2; // Total padding for a block
	const rows = 2; // Maximum number of rows
	let usedWidth = 0; // Current row width
	let rowCount = 1; // Start with the first row
	const visibleBlocks: string[] = []; // Blocks that fit
	const remainingBlocks: string[] = []; // Blocks that don't fit

	for (const item of items) {
		const blockWidth = calculateTextWidth(item, fontSize, lineHeight) + fullPadding;

		if (rowCount > rows) {
			break;
		}

		if (usedWidth + blockWidth <= containerWidth) {
			visibleBlocks.push(item);
			usedWidth += blockWidth + flexGap;
		} else {
			if (rowCount == rows) {
				break;
			}
			rowCount++;
			visibleBlocks.push(item);
			usedWidth = 30 + blockWidth + flexGap;
		}
	}

	remainingBlocks.push(...items.slice(visibleBlocks.length));

	return {
		visibleBlocks,
		remainingBlocks,
	};
};

const calculateTextWidth = (text: string, fontSize: number, lineHeight: number): number => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	if (!context) {
		throw new Error('Canvas 2D context is not supported or failed to initialize.');
	}
	context.font = `${fontSize * lineHeight}px Outfit`;
	return context.measureText(text).width;
};
