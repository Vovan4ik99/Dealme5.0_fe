import styles from "../../features/FreelancerProfile/ProfileNavbar/ProfileNavbar.module.scss";
import logo from "@icons/logo.svg";
import {Link} from "react-router-dom";

const Logo = () => {

	return (
		<Link to={"/"} className={styles.logo}>
			<img src={logo} alt={"logo"}/>
		</Link>
	);
}

export default Logo;