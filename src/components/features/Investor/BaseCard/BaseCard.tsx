import styles from "./BaseCard.module.scss";
import { IBaseCardProps } from "./BaseCardTypes";

const BaseCard: React.FC<IBaseCardProps> = ({
  icon,
  title,
  subTitle,
  description,
  iconWidth,
  iconHeight,
}) => {
  return (
    <section className={styles["base-card"]}>
      <img
        style={{ width: iconWidth, height: iconHeight }}
        src={icon}
        alt="icon"
      />
      <div className={styles["base-card__items"]}>
        <div className={styles["base-card__wrapper"]}>
          <h1 className={styles["base-card__text"]}>{title}</h1>
          <h2 className={styles["base-card__text--subText"]}>{subTitle}</h2>
        </div>
        <p className={styles["base-card__item"]}>{description}</p>
      </div>
      <button className="btn btn--tab btn--goNext">
        Wybierz i przejdź dalej
      </button>
    </section>
  );
};
export default BaseCard;
