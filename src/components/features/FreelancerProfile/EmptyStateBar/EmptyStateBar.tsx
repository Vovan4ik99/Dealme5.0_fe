import styles from "./EmptyStateBar.module.scss";
import info from "@icons/freelancerProfile/uploadImgModal/info.svg"

const EmptyStateBar = ({ text }: { text: string }) => {
    return (
      <div className={styles.emptyStateBar__wrapper}>
        <div className={styles.emptyStateBar__items}>
          <img src={info} alt="Info" className={styles.emptyStateBar__icon}/>
          <p className={styles.emptyStateBar__text}>{text}</p>
        </div>
      </div>
    );
  };
  
  export default EmptyStateBar;