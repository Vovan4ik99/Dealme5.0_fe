import {Link} from "react-router-dom";
import logo from "../../assets/icons/logo.svg";
import styles from './Navbar.module.scss'

const Navbar = () => {

	return (
		<nav className={styles.navbar}>
			<Link to={'/'} className={styles.navbar__logo}>
				<img src={logo} alt={'logo'}/>
			</Link>
			<div className={styles.navbar__wrapper}>
				<p className={styles.navbar__text}>Nie masz konta?</p>
				<Link className={styles.navbar__link} to={'/registration'}>Załóż konto</Link>
			</div>
		</nav>
	)
}

export default Navbar;