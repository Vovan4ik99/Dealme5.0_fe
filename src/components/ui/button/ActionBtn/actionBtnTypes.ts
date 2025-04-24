export interface IActionBtnProps {
	onClick: () => void;
	kind: BtnKind;
	withBorder: boolean;
	backgroundColor?: 'transparent' | 'lightgray' | 'white';
	disabled?: boolean;
	isActive?: boolean;
	isHovered?: boolean;
}

type BtnKind = 'Edit' | 'Add' | 'Delete' | 'Close' | 'Navigate Right' | 'Navigate Left' | 'Preview' | 'Minus' | 'Calendar';