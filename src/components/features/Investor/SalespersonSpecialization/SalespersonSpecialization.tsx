import { ReactComponent as Border } from "@icons/named_exported/investor/border_icon.svg";
import styles from "./SalespersonSpecialization.module.scss";
import AnimatedStep from "../../Onboarding/steps/AnimatedStep/AnimatedStep";
import InvestorHeader from "../InvestorHeader/InvestorHeader";
import OnboardingSearchBar from "../../Onboarding/items/OnboardingSearchBar/OnboardingSearchBar";
import { useEffect } from "react";
import { useOnboardingService } from "@services/onboardingService";

const BorderIcon = () => <Border style={{ width: "11.67px" }} />;

const SalespersonSpecialization = () => {

  return (
    <AnimatedStep>
      <section>
        <header className={styles["sales__header"]}>
          <InvestorHeader
            onClick={() => console.log("hello")}
            text={"Mam stałą pracę. Chcę zatrudnić handlowca"}
            title={"Wybierz specjalizację handlowca"}
            icon={BorderIcon}
          />
          <div className={styles["sales__bar"]}>
            <OnboardingSearchBar />
          </div>
        </header>
      </section>
    </AnimatedStep>
  );
};

export default SalespersonSpecialization;
