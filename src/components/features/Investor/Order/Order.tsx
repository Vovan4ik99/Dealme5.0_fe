import BaseCard from "../BaseCard/BaseCard";
import styles from "./Order.module.scss";
import suitcase from "@icons/investor/suitcase.svg";
import border from "@icons/investor/border.svg";
import AnimatedStep from "../../Onboarding/steps/AnimatedStep/AnimatedStep";

const Order = () => {
  return (
    <AnimatedStep>
      <section>
        <h1 className={"title title--fs40 title--m32"}>
          W czym możemy Ci pomóc?
        </h1>
        <div className={styles["order"]}>
          <BaseCard
            icon={suitcase}
            title="Mam zlecenie"
            subTitle="Potrzebuję wsparcia"
            description="Opublikuj własne zlecenie a dobierzemy dla Ciebie odpowiedniego handlowca"
            iconWidth={24}
            iconHeight={24}
          />
          <BaseCard
            icon={border}
            title="Mam stałą pracę."
            subTitle="Chcę zatrudnić handlowca"
            description="Opublikuj ofertę pracy a dobierzemy dla Ciebie odpowiedniego handlowca"
            iconWidth={20}
            iconHeight={24}
          />
        </div>
      </section>
    </AnimatedStep>
  );
};

export default Order;
