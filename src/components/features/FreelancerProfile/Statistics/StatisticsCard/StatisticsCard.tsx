import styles from "./StatisticsCard.module.scss";
import { IStatisticsCardProps } from "./StatisticsCardTypes";

const StatisticsCard = ({ value, description, icon }: IStatisticsCardProps) => {
  return (
    <div className={styles.card__content}>
      <div>
        <img src={icon} alt="Icon" className={styles.card__icon} />
      </div>
      <div className={styles.card__textContainer}>
        <div className={styles.card__value}>{value}</div>
        <p className={styles.card__description}>{description}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
