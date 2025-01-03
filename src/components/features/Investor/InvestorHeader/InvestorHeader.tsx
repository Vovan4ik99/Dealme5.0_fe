import icon_back from "@icons/investor/arrow_left.svg";
import styles from "./InvestorHeader.module.scss";
import { IInvestorHeaderProps } from "./InvestorHeaderTypes";

const Back = ({ onClick, text, icon: Icon, title } : IInvestorHeaderProps) => {
  return (
    <section className={styles.tab}>
    <div className={styles.tab__wrapper}>
      <button onClick={onClick} className={"btn btn--back"}>
        <img src={icon_back} alt={"button back icon"} />
      </button>
      <div className={styles.tab__items}>
      {Icon && <Icon className={styles.tab__icon} />}
        <span className={styles.tab__text}>{text}</span>
      </div>
      </div>
      <h1 className={"title title--fs40 title--m32"}>
        {title}
      </h1>
    
    </section>
  );
};

export default Back;
