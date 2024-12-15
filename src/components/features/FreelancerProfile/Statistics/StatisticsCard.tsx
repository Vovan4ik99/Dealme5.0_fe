import React from "react";
import styles from "./StatisticsCard.module.scss";

interface StatisticsCardProps {
  value: string | number;
  description: string;
  icon: React.ReactNode;
}

const StatisticsCard = ({ value, description, icon }: StatisticsCardProps) => {
  return (
    <div className={styles.card__content}>
      <div className={styles.card__icon}>{icon}</div>
      <div className={styles.card__textContainer}>
        <div className={styles.card__value}>{value}</div>
        <p className={styles.card__description}>{description}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;
