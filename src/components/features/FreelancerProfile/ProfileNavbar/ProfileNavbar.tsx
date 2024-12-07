import {Link} from "react-router-dom";
import logo from "@icons/logo.svg";
import desktop from "@icons/profile_navbar/desktop.svg"
import orders from "@icons/profile_navbar/orders.svg"
import products from "@icons/profile_navbar/products.svg"
import guardian from "@icons/profile_navbar/guardian.svg"
import payments from "@icons/profile_navbar/payments.svg"
import avatar from "@icons/profile_navbar/avatar.svg"
import plus from "@icons/profile_navbar/plus.svg"
import arrow from "@icons/profile_navbar/arrow.svg"
import styles from './ProfileNavbar.module.scss'

const ProfileNavbar = () => {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar__bg}></div>
			<Link to={'/'} className={styles.navbar__logo}>
				<img src={logo} alt={'logo'} />
			</Link>
			<div className={styles.navbar__item}>
				<img src={desktop} alt={'desktop'} />
				<span className={styles.navbar__label}>Pulpit</span>
			</div>
			<div className={styles.navbar__item}>
				<img src={orders} alt={'orders'} />
				<span className={styles.navbar__label}>Zlecenia</span>
			</div>
			<div className={styles.navbar__item}>
				<img src={products} alt={'products'} />
				<span className={styles.navbar__label}>Produkty</span>
			</div>
			<div className={styles.navbar__item}>
				<img src={guardian} alt={'guardian'} />
				<span className={styles.navbar__label}>Opiekun</span>
			</div>
			<div className={styles.navbar__item}>
				<img src={payments} alt={'payments'} />
				<span className={styles.navbar__label}>Płatności</span>
			</div>
			<div className={styles.navbar__wrapper}>
            <button className={styles.navbar__button}>
          <img src={plus} alt="plus" />
          Przyjmij zlecenie
        </button>
        <div className={styles.navbar__profile}>
          <img src={avatar} alt="avatar" />
          Adam Gontier
          <img src={arrow} alt="arrow" />
        </div>
      </div>
		</nav>
	);
};

export default ProfileNavbar;
