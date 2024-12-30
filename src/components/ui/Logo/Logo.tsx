import styles from "../../layout/ProfileNavbar/ProfileNavbar.module.scss";
import {Link} from "react-router-dom";
import logo from '@icons/app/logo.svg';

const Logo = () => {

	return (
		<Link to={"/"} className={styles.logo}>
			<img src={logo} alt="logo"/>
		</Link>
	);
}

export default Logo;