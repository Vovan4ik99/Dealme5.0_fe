import { Link } from "react-router-dom";
import logo from "@icons/logo.svg";
import desktop from "@icons/profile_navbar/desktop.svg";
import orders from "@icons/profile_navbar/orders.svg";
import products from "@icons/profile_navbar/products.svg";
import guardian from "@icons/profile_navbar/guardian.svg";
import payments from "@icons/profile_navbar/payments.svg";
import avatar from "@icons/profile_navbar/avatar.svg";
import styles from "./ProfileNavbar.module.scss";

const ProfileNavbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__bg}></div>
      <Link to={"/"} className={styles.navbar__logo}>
        <img src={logo} alt={"logo"} />
      </Link>
      <div className={styles.navbar_items}>
  <a href="/" className={styles.navbar__item}>
    <img src={desktop} alt={"desktop"} />
    <span className={styles.navbar__label}>Pulpit</span>
  </a>
  <a href="/" className={styles.navbar__item}>
    <img src={orders} alt={"orders"} />
    <span className={styles.navbar__label}>Zlecenia</span>
  </a>
  <a href="/" className={styles.navbar__item}>
    <img src={products} alt={"products"} />
    <span className={styles.navbar__label}>Produkty</span>
  </a>
  <a href="/" className={`${styles.navbar__item} ${styles.guardianImg}`}>
    <img src={guardian} alt={"guardian"} />
    <span className={styles.navbar__label}>Opiekun</span>
  </a>
  <a href="/" className={`${styles.navbar__item} ${styles.paymentsImg}`}>
    <img src={payments} alt={"payments"} />
    <span className={styles.navbar__label}>Płatności</span>
  </a>
</div>

      <div className={styles.navbar__wrapper}>
        <a href="/" className={styles.navbar__button}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.navbar__icon}
          >
            <path
              d="M11.25 5.25H6.75V0.75C6.75 0.335789 6.41421 0 6 0C5.58579 0 5.25 0.335789 5.25 0.75V5.25H0.75C0.335789 5.25 0 5.58579 0 6C0 6.41421 0.335789 6.75 0.75 6.75H5.25V11.25C5.25 11.6642 5.58579 12 6 12C6.41421 12 6.75 11.6642 6.75 11.25V6.75H11.25C11.6642 6.75 12 6.41421 12 6C12 5.58579 11.6642 5.25 11.25 5.25Z"
              fill="currentColor"
            />
          </svg>{" "}
          Przyjmij zlecenie
        </a>
        <button className={styles.navbar__profile}>
          <img src={avatar} alt="avatar" className={styles.navbar__avatar} />{" "}
          Adam Gontier
          <svg
            width="10"
            height="10"
            viewBox="0 0 8 6"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.navbar__arrow}
          >
            <path
              d="M7.76578 1.05529C7.69148 0.980952 7.60327 0.92198 7.50618 0.881745C7.40909 0.84151 7.30502 0.820801 7.19992 0.820801C7.09482 0.820801 6.99075 0.84151 6.89366 0.881745C6.79657 0.92198 6.70836 0.980952 6.63407 1.05529L4.18825 3.50058C4.13824 3.55057 4.07043 3.57865 3.99972 3.57865C3.92901 3.57865 3.8612 3.55057 3.81119 3.50058L1.36591 1.05529C1.2159 0.905218 1.01243 0.820879 0.80024 0.820829C0.588053 0.820779 0.384537 0.905022 0.234463 1.05502C0.0843887 1.20503 5.00325e-05 1.4085 2.22535e-08 1.62069C-4.9988e-05 1.83288 0.0841929 2.03639 0.234196 2.18647L2.68001 4.63228C2.85335 4.80564 3.05913 4.94315 3.28561 5.03697C3.5121 5.13079 3.75484 5.17908 3.99999 5.17908C4.24513 5.17908 4.48788 5.13079 4.71436 5.03697C4.94084 4.94315 5.14662 4.80564 5.31996 4.63228L7.76578 2.18647C7.91575 2.03645 8 1.83301 8 1.62088C8 1.40875 7.91575 1.20531 7.76578 1.05529Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};
export default ProfileNavbar;
