import ChooseAndGoNextBtn from "@ui/ChooseAndGoNextBtn/ChooseAndGoNextBtn";
import styles from "./LevelItem.module.scss";
import { ILevelItemProps } from "./LevelItemTypes";

const LevelItem = ({ text, subText }: ILevelItemProps) => {
  return (
    <div className={styles["level-item"]}>
      <div className={styles["level-item__items"]}>
        <h2 className="title title--fs20 title--fs20lh120">{text}</h2>
        <h3 className={styles["level-item__subText"]}>{subText}</h3>
      </div>
      <ChooseAndGoNextBtn />
    </div>
  );
};

export default LevelItem;