import styles from "./InnerNavbar.module.scss";
import { NAVBAR_SECTIONS } from "@constants/freelancerInnerNavbarSections.ts";
import { Link } from "react-scroll";
import { useEffect } from "react";

const InnerNavbar = () => {

	/**
	 * Necessary check for missing sections to ensure that id in every section is correct and could
	 * be used by that navbar
	 */
	useEffect(() => {
		const missingSections = Object.keys(NAVBAR_SECTIONS).filter(
			(key) => !document.getElementById(key)
		);

		if (missingSections.length > 0) {
			console.warn(`This sections are missing in profile: ${missingSections.join(", ")}`);
		}
	}, []);

	const renderNavbarLinks = () => {
		return Object.entries(NAVBAR_SECTIONS).map(([key, name]) => (
			<Link
				key={key}
				to={key}
				smooth={true}
				duration={300}
				offset={-50}
				className={styles["navbar__item"]}
				activeClass={styles["navbar__item--active"]}
			>
				{name}
			</Link>
		));
	};

	return (
		<nav className={styles.navbar}>
			{renderNavbarLinks()}
		</nav>
	)
};

export default InnerNavbar;