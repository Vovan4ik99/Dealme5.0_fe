import React, { ReactNode } from "react";
import styles from "./ReusableModal.module.scss";
import "../../styles/btn.scss";
import "../../styles/title.scss";

interface ReusableModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: ReactNode;
  width?:string;
}

const ReusableModal: React.FC<ReusableModalProps> = ({
  title,
  onClose,
  onSave,
  children,
  width
}) => {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.reusableModal__content}
        style={{width: width ||"600px"}}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.reusableModal__content__mainContent}>
          <button
            className={styles.reusableModal__content__mainContent__closeBtn}
            onClick={onClose}
          >
            <div className={styles.reusableModal__content__mainContent__closeBtn__closeIcon}>
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.24206 8.18189L6.06008 4.99991L9.24206 1.81793C9.53495 1.52503 9.53495 1.05016 9.24206 0.757266C8.94917 0.464375 8.47429 0.464375 8.1814 0.757266L4.99942 3.93925L1.81744 0.757266C1.52455 0.464375 1.04967 0.464375 0.756778 0.757266C0.463887 1.05016 0.463887 1.52503 0.756778 1.81793L3.93876 4.99991L0.756778 8.18189C0.463887 8.47478 0.463887 8.94966 0.756778 9.24255C1.04967 9.53544 1.52455 9.53544 1.81744 9.24255L4.99942 6.06057L8.1814 9.24255C8.47429 9.53544 8.94917 9.53544 9.24206 9.24255C9.53495 8.94966 9.53495 8.47478 9.24206 8.18189Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </button>
          <header className="title title--fs32">{title}</header>
          <div>{children}</div>
        </div>
        <div className={styles.reusableModal__content__footer}>
          <button className="btn btn--mt0" onClick={onSave}>
            Zapisz zmiany
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReusableModal;
