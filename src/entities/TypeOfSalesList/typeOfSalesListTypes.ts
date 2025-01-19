export interface ITypeOfSalesListProps {
	selectedTypeOfSale: string | null;
	onSelect: (typeOfSale: string) => void;
}