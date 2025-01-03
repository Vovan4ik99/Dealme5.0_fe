import Logo from "@ui/Logo/Logo";
import { NavLink } from "react-router-dom";
import question_mark from "@icons/investor/question_mark.svg";
import styles from "./InvestorNavbar.module.scss"

const InvestorNavbar = () => {
  return (
    <nav className={styles["navbar"]}>
      <Logo />
      <NavLink to={""} className={styles["navbar__items"]}>
        <img src={question_mark} alt="question mark icon" />
        <span className={styles["navbar__text"]}>Potrzebujesz pomocy?</span>
      </NavLink>
    </nav>
  );
};
export default InvestorNavbar;
