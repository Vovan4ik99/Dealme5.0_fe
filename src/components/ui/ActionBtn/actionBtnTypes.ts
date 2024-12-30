export interface IActionBtnProps {
	onClick: () => void;
	kind: BtnKind;
	withBorder: boolean;
	backgroundColor?: 'transparent' | 'lightgray';
}

type BtnKind = 'Edit' | 'Add' | 'Delete' | 'Close' | 'Navigate Right' | 'Navigate Left';