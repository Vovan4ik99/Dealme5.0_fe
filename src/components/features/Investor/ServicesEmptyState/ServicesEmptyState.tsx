import AnimatedStep from "../../Onboarding/steps/AnimatedStep/AnimatedStep";
import BackToPreviousPage from "../InvestorHeader/InvestorHeader";
import styles from "./ServicesEmptyState.module.scss";
import emptyState from "@icons/investor/empty-state.svg";
const ServicesEmptyState = () => {
  return (
    <AnimatedStep>
      <section>
        <header>
          <BackToPreviousPage
            onClick={() => console.log("hello")}
            text="Przygotowanie do sprzedaży"
            title="Jakich usług potrzebujesz?"
          />
        </header>
        <div className={styles["empty-state"]}>
          <img
            src={emptyState}
            className={styles["empty-state__image"]}
            alt="icon"
          />
          <div className={styles["empty-state__items"]}>
            <div className={styles["empty-state__text"]}>
              <h2 className="title title--fs26">Nie masz dodanych usług</h2>
              <h2 className="title title--fs26 title--semiBold">
                Zdefiniuj usługi aby przejść dalej
              </h2>
            </div>
            <button>Dodaj usługę</button>
          </div>
        </div>
      </section>
    </AnimatedStep>
  );
};

export default ServicesEmptyState;
