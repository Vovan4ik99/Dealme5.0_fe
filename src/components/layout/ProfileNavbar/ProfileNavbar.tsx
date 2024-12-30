import {NavLink} from "react-router-dom";
import styles from "./ProfileNavbar.module.scss";
import Logo from "@ui/Logo/Logo.tsx";
import {useContext, useEffect, useState} from "react";
import {useFreelancerProfileService} from "@services/freelancerProfileService.ts";
import LoadingSpinner from "@ui/LoadingSpinner/LoadingSpinner.tsx";
import {ReactComponent as PulpitIcon} from "@icons/named_exported/profile-navbar/desktop.svg";
import {ReactComponent as OrdersIcon} from "@icons/named_exported/profile-navbar/orders.svg";
import {ReactComponent as ProductsIcon} from "@icons/named_exported/profile-navbar/products.svg";
import {ReactComponent as GuardianIcon} from "@icons/named_exported/profile-navbar/guardian.svg";
import {ReactComponent as PaymentsIcon} from "@icons/named_exported/profile-navbar/payments.svg";
import {ReactComponent as AddIcon} from "@icons/named_exported/add_icon.svg";
import {ReactComponent as ArrowDown} from "@icons/named_exported/profile-navbar/arrow-down.svg";
import avatar from "@icons/profile_navbar/default_avatar.svg";
import {AuthContext} from "@context/AuthContext/AuthContext.ts";

const ProfileNavbar = () => {
	const {loadingStatus, getAvatar} = useFreelancerProfileService();
	const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

	const {user} = useContext(AuthContext);

	useEffect(() => {
		getAvatar()
			.then(response => response !== null && setAvatarUrl(response.picture))
			.catch(error => console.error("Failed to fetch avatar:", error));
	}, [avatarUrl, getAvatar]);

	if (loadingStatus === "loading") {
		return <LoadingSpinner/>;
	}

	return (
		<nav className={styles.navbar}>
			<Logo/>
			<div className={styles.navbar__wrapper}>
				<NavLink to="/" className={({isActive}) =>
						`${styles.navbar__item} ${isActive ? styles["navbar__item-active"] : ""}`}>
					<PulpitIcon/>
					Pulpit
				</NavLink>
				<NavLink to="/" className={({isActive}) =>
						`${styles.navbar__item} ${isActive ? styles["navbar__item-active"] : ""}`}>
					<OrdersIcon/>
					Zlecenia
				</NavLink>
				<NavLink to="/" className={({isActive}) =>
						`${styles.navbar__item} ${isActive ? styles["navbar__item-active"] : ""}`}>
					<ProductsIcon/>
					Produkty
				</NavLink>
				<NavLink to="/" className={({isActive}) =>
						`${styles.navbar__item} ${isActive ? styles["navbar__item-active"] : ""}`}>
					<GuardianIcon/>
					Opiekun
				</NavLink>
				<NavLink to="/profile" className={({isActive}) =>
						`${styles.navbar__item} ${isActive ? styles["navbar__item-active"] : ""}`}>
					<PaymentsIcon/>
					Płatności
				</NavLink>
			</div>
			<div className={styles["navbar__add-wrapper"]}>
				<button className={`btn btn--more ${styles["navbar__btn"]}`}>
					<AddIcon/>
					Przyjmij zlecenie
				</button>
				<button className={`btn btn--more ${styles["navbar__btn"]} ${styles["navbar__btn--avatar"]}
				 ${avatarUrl !== null && styles["navbar__btn--pl53"]}`}>
					<div className={`${styles["navbar__avatar"]}`}>
						<img src={avatarUrl ?? avatar} alt="avatar"/>
					</div>
					{user?.firstName} {user?.lastName}
					<ArrowDown/>
				</button>
			</div>
		</nav>
	);
};
export default ProfileNavbar;
