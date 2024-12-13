import "../../../styles/btn.scss";
import styles from "./FreelancerProfileButtons.module.scss";

const BUTTONS = [
  "O mnie",
  "Doświadczenie",
  "Wykształcenie",
  "Narzędzia sprzedażowe",
  "Wideo",
  "Usługi",
  "Umiejętności",
  "Portfolio",
  "Opinie",
];

const FreelancerProfileButtons = () => {
  return (
    <div className={styles["container"]}>
      {BUTTONS.map((button, index) => (
        <button key={index} className="btn btn--tab">
          {button}
        </button>
      ))}
    </div>
  );
};

export default FreelancerProfileButtons;
