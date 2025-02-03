export const createVideoBlob = (base64VideoUrl: string) => {
	const base64Data = base64VideoUrl.split(",")[1];
	const binary = atob(base64Data);
	const array = new Uint8Array(binary.length);
	for (let i = 0; i < binary.length; i++) {
		array[i] = binary.charCodeAt(i);
	}
	return  new Blob([array], {type: `video/${ base64VideoUrl.split('.').pop() ?? 'mp4' }`});
}