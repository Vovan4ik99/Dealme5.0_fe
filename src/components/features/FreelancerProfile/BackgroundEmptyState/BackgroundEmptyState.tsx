import EditButton from "@ui/EditButtonIcon/EditButton/EditButton";
import styles from "./BackgroundEmptyState.module.scss";
import { forest_mountain, office_desk, office_feel } from "@icons/freelancerProfile/backgroundImage/backgroundImg";


const BackgroundEmptyState: React.FC<{ onEditClick: () => void }> = ({
  onEditClick,
}) => {
  return (
    <div className={styles["empty-state__wrapper"]}>
      <div className={styles["empty-state__images"]}>
        {/* <img
          className={styles["empty-state__image"]}
          src={office_desk}
          alt="Office desk"
        />
        <img
          className={styles["empty-state__image"]}
          src={office_feel}
          alt="Office feel"
        />
        <img
          className={styles["empty-state__image"]}
          src={forest_mountain}
          alt="Home desk"
        /> */}
      </div>
      <div className={styles["empty-state__text"]}>
        Stwórz niepowtarzalny styl swojego profilu - dodaj tło stwarzające
        wyjątkowy klimat
        <div className={styles["empty-state__icon"]}>
          <EditButton
            onClick={onEditClick}
            className="edit edit--editButton"
          ></EditButton>
        </div>
      </div>
    </div>
  );
};

export default BackgroundEmptyState;
