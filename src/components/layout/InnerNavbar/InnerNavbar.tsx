import styles from "./InnerNavbar.module.scss";
import {NAVBAR_SECTIONS} from "@constants/freelacnerInnerNavbarSections.ts";
import { Link } from "react-scroll";

const InnerNavbar = () => {

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