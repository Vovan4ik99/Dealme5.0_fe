import "../../../../styles/btn.scss";
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
    <section className={styles["container"]}>
      {BUTTONS.map((button, index) => (
        <button key={index} className="btn btn--tab">
          {button}
        </button>
      ))}
    </section>
  );
};

export default FreelancerProfileButtons;
