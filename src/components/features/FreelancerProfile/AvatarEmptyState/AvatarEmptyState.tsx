import EditButton from "@ui/EditButtonIcon/EditButton/EditButton";
import styles from "./AvatarEmptyState.module.scss";
import { man, woman } from "@icons/freelancerProfile/avatarImage/avatarImg";
import "@styles/title.scss"
import "@styles/btn.scss"

const BackgroundEmptyState: React.FC<{ onEditClick: () => void }> = ({
  onEditClick,
}) => {
  return (
    <button className={styles["empty-state__wrapper"]} onClick={onEditClick}>
      <div className={styles["empty-state__images"]}>
        <img
          className={`${styles["empty-state__image"]} ${styles["empty-state__image--image1"]}`}
          src={man}
          alt="Man"
        />
        <img
          className={`${styles["empty-state__image"]} ${styles["empty-state__image--image2"]}`}
          src={woman}
          alt="Woman"
        />
      </div>
      <div className="title title--fs15">
        Dodaj awatar
        <div className={`btn btn--editBtn ${styles["empty-state__icon"]}`}>
          <EditButton
            onClick={onEditClick}
            className="edit edit--editButton"
          ></EditButton>
        </div>
      </div>
    </button>
  );
};

export default BackgroundEmptyState;
