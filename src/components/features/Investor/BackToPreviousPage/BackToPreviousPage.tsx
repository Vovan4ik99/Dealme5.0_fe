import icon_back from "@icons/btn_back_icon.svg";
import styles from "./BackToPreviousPage.module.scss";
import { IBackToPreviosPageProps } from "./BackToPreviousPageTypes";

const Back = ({ onClick, text, icon, title } : IBackToPreviosPageProps) => {
  return (
    <section className={styles.back}>
    <div className={styles.back__wrapper}>
      <button onClick={onClick} className={"btn btn--back"}>
        <img src={icon_back} alt={"button back icon"} />
      </button>
      <div className={styles.items}>
        {icon && <img src={icon} alt={"icon"} />}
        <span className={styles.back__text}>{text}</span>
      </div>
      </div>
      <h1 className={"title title--fs40 title--m32"}>
        {title}
      </h1>
    
    </section>
  );
};

export default Back;
