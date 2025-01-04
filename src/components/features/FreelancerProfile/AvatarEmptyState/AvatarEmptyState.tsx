import styles from "./AvatarEmptyState.module.scss";
import man from "@icons/freelancer_profile/avatar/man.svg";
import woman from "@icons/freelancer_profile/avatar/woman.svg";
import React from "react";

const BackgroundEmptyState: React.FC<{ onEditClick: () => void }> = ({
	                                                                     onEditClick,
                                                                     }) => {
	return (
		<button className={styles["empty-state__wrapper"]} onClick={onEditClick}>
			<div className={styles["empty-state__images"]}>
				<img
					className={`${styles["empty-state__image"]} ${styles["empty-state__image--image1"]}`}
					src={man}
					alt="Man"
				/>
				<img
					className={`${styles["empty-state__image"]} ${styles["empty-state__image--image2"]}`}
					src={woman}
					alt="Woman"
				/>
			</div>
			<div className="title title--fs15">
				Dodaj awatar
				<div className={`btn btn--editBtn ${styles["empty-state__icon"]}`}>
				</div>
			</div>
		</button>
	);
};

export default BackgroundEmptyState;
