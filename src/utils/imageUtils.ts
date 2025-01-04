export const parseBase64Image = (dataURL: string | null, defaultFileName: string = 'image') => {
	if (!dataURL?.includes(',')) {
		console.error('Error decoding base64 image from server. Wrong image format.');
		return {blob: null, filename: null};
	}

	const [header, base64] = dataURL.split(',');
	const mimeTypeMatch = RegExp(/:(.*?);/).exec(header);
	const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/octet-stream';

	const byteString = atob(base64);
	const byteNumbers = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		byteNumbers[i] = byteString.charCodeAt(i);
	}
	const blob = new Blob([byteNumbers], { type: mimeType });

	const extension = mimeType.split('/')[1] || 'bin';
	const filename = `${defaultFileName}.${extension}`;

	return {
		blob,
		filename
	};
}