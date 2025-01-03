import ChooseAndGoNextBtn from "@ui/ChooseAndGoNextBtn/ChooseAndGoNextBtn";
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
    <article className={styles["base-card"]}>
      {icon && (
        <img
          style={{ width: iconWidth, height: iconHeight }}
          src={icon}
          alt="icon"
          className={styles["base-card__icon"]}
        />
      )}
      <div className={styles["base-card__items"]}>
        <div className={styles["base-card__wrapper"]}>
          <p className={styles["base-card__text"]}>{title}</p>
          <p className={`${styles["base-card__text"]} ${styles["base-card__text--subText"]}`}>
{subTitle}</p>
        </div>
        <p className={styles["base-card__item"]}>{description}</p>
      </div>
      <ChooseAndGoNextBtn />
    </article>
  );
};
export default BaseCard;
