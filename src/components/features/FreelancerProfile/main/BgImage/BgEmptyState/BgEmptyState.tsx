import styles from "./BgEmptyState.module.scss";
import React from "react";
import BgEmptyStateImgWrapper from "../BgEmptyStateImgWrapper/BgEmptyStateImgWrapper.tsx";

const BgEmptyState: React.FC<{ onEditClick: () => void }> = ({onEditClick}) => {
	return (
		<button className={styles["bg-empty"]} onClick={onEditClick}>
			<BgEmptyStateImgWrapper/>
			<p className={`${styles["bg-empty__text"]}`}>
				Stwórz niepowtarzalny styl swojego profilu - dodaj tło stwarzające wyjątkowy klimat
			</p>
		</button>
	);
};

export default BgEmptyState;
