export const fitTextIntoBlock =
	(
		items: string[],
		width: number,
		fontSize: number,
		lineHeight: number,
		lines: number
	) => {

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		if (!context) {
			throw new Error('Canvas 2D context is not supported or failed to initialize.');
		}

		context.font = `${fontSize}px "Outfit"`;

		const maxHeight = lines * lineHeight;
		let currentText = '';
		let currentHeight = lineHeight;

		for (let i = 0; i < items.length; i++) {
			const testText = currentText
				? currentText + ', ' + items[i]
				: items[i];
			const textWidth = context.measureText(testText).width;

			if (textWidth > width) {
				currentHeight += lineHeight;
			}

			if (currentHeight > maxHeight) {
				const remainingCount = items.length - i;
				return `${currentText} +${remainingCount}`;
			}

			currentText = testText;
		}

		return currentText;
	}