import styles from "./BgEmptyStateImgWrapper.module.scss";
import office_desk from "@icons/freelancerProfile/background_image/ofifce_d.svg";
import office_feel from "@icons/freelancerProfile/background_image/office_feel.svg";
import forest_mountain from "@icons/freelancerProfile/background_image/forest_mountain.svg";
import React from "react";

const BgEmptyStateImgWrapper = () => {
	return (
		<div className={styles["item"]}>
			<img
				className={`${styles["item__image"]} ${styles["item__image--left"]}`}
				src={office_desk}
				alt="Office desk"
			/>
			<img
				className={`${styles["item__image"]} ${styles["item__image--centered"]}`}
				src={office_feel}
				alt="Office feel"
			/>
			<img
				className={`${styles["item__image"]} ${styles["item__image--right"]}`}
				src={forest_mountain}
				alt="Home desk"
			/>
		</div>
	);
}

export default BgEmptyStateImgWrapper;