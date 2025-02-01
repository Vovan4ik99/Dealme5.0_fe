export const useLoadingStatus = (
	...services: Array<{ loadingStatus: string }>
): boolean => {
	const loadingStatuses = services.map(service => service.loadingStatus);
	return loadingStatuses.includes("loading");
};