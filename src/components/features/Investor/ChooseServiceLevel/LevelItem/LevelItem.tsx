import ChooseAndGoNextBtn from "@ui/ChooseAndGoNextBtn/ChooseAndGoNextBtn";
import styles from "./LevelItem.module.scss";
import tabStyles from "../../InvestorHeader/InvestorHeader.module.scss";
import { ILevelItemProps } from "./LevelItemTypes";
import arrow_right from "@icons/onboarding/arrow_right.svg";
import { useState } from "react";
import AnimatedStep from "../../../Onboarding/steps/AnimatedStep/AnimatedStep";
import { ReactComponent as InfoIcon } from "@icons/named_exported/info_icon.svg";
import { ReactComponent as CircleIcon } from "@icons/named_exported/investor/circle_icon.svg";

const LevelItem = ({
  text,
  subText,
  number,
  firstHeader,
  secondHeader,
  description,
  tab,
  onClick
}: ILevelItemProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={styles["level-item"]}>
      <div className={styles["level-item__header"]}>
        <button
          className={`${styles["level-item__items"]} ${
            isActive ? styles["level-item--active"] : ""
          }`}
          onClick={() => setIsActive((prevState) => !prevState)}
        >
          <div className={styles["level-item__item"]}>
            <div className={styles["level-item__icon"]}>
              <img src={arrow_right} alt={"arrow"} />
            </div>
            <h2 className="title title--fs20 title--fs20lh120">{text}</h2>
          </div>
          <h3 className={styles["level-item__subText"]}>
            <span>Poziom {number}</span>
            <CircleIcon />
            <span>{subText}</span>{" "}
          </h3>
        </button>
        <ChooseAndGoNextBtn onClick={onClick}/>
      </div>

      {isActive && (
        <AnimatedStep>
          <div className={styles["level-item__details"]}>
            <div className={styles["level-item__divider"]}></div>
            <div className={styles["level-item__activeContent"]}>
              <div
                className={`${styles["level-item__content"]} ${styles["level-item--firstContent"]}`}
              >
                <span className={styles["level-item__activeHeader"]}>
                  {firstHeader}
                </span>
                <p className={styles["level-item__paragraph"]}>{description}</p>
              </div>
              <div className={styles["level-item__content"]}>
                <span className={styles["level-item__activeHeader"]}>
                  {secondHeader}
                </span>
                <div className={styles["level-item__tabs"]}>
                  <div
                    className={`${tabStyles["tab__items"]} ${tabStyles["tab--serviceItems"]}`}
                  >
                    {tab} <InfoIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedStep>
      )}
    </div>
  );
};

export default LevelItem;
