import earnings from "@icons/freelancerProfile/statistics/earnings.svg";
import watch from "@icons/freelancerProfile/statistics/watch.svg";
import orders from "@icons/freelancerProfile/statistics/orders.svg";
import StatisticsCard from "./StatisticsCard/StatisticsCard";
import styles from "./Statistics.module.scss";

const Statistics = () => {
  return (
    <section className={styles.statistics}>
      <header className={styles.statistics__wrap}>
        <div className={styles.statistics__header}>
          <h2 className="title title--fs20">Statystyki</h2>
          <p className={styles.statistics__subTitle}>
            <svg
              width="21"
              height="16"
              viewBox="0 0 21 16"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.statistics__headerIcon}
            >
              <path
                d="M19.5319 5.40335C17.5083 2.28105 14.0533 0.382075 10.3326 0.347168C6.61202 0.382075 3.15702 2.28105 1.13334 5.40335C0.0668811 6.96845 0.0668811 9.02676 1.13334 10.5919C3.15588 13.7161 6.61108 15.6171 10.3327 15.6531C14.0533 15.6182 17.5083 13.7192 19.532 10.5969C20.6007 9.03065 20.6007 6.96959 19.5319 5.40335ZM17.4612 9.17287C15.9162 11.6235 13.2296 13.1186 10.3326 13.1401C7.4357 13.1187 4.7491 11.6235 3.20403 9.17287C2.72235 8.46522 2.72235 7.53502 3.20403 6.82741C4.74906 4.37679 7.43566 2.88166 10.3326 2.86018C13.2295 2.88162 15.9161 4.37679 17.4612 6.82741C17.9429 7.53502 17.9429 8.46522 17.4612 9.17287Z"
                fill="currentColor"
              />
              <path
                d="M10.3326 11.3508C12.1831 11.3508 13.6833 9.85064 13.6833 8.00012C13.6833 6.14959 12.1831 4.64945 10.3326 4.64945C8.48209 4.64945 6.98195 6.14959 6.98195 8.00012C6.98195 9.85064 8.48209 11.3508 10.3326 11.3508Z"
                fill="currentColor"
              />
            </svg>
            Widoczne tylko dla Ciebie
          </p>
        </div>
        <button className="btn btn--tab btn--separate">
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.25 1.5H10V1.25C10 1.05109 9.92098 0.860322 9.78033 0.71967C9.63968 0.579018 9.44891 0.5 9.25 0.5C9.05109 0.5 8.86032 0.579018 8.71967 0.71967C8.57902 0.860322 8.5 1.05109 8.5 1.25V1.5H5.5V1.25C5.5 1.05109 5.42098 0.860322 5.28033 0.71967C5.13968 0.579018 4.94891 0.5 4.75 0.5C4.55109 0.5 4.36032 0.579018 4.21967 0.71967C4.07902 0.860322 4 1.05109 4 1.25V1.5H3.75C3.02065 1.5 2.32118 1.78973 1.80546 2.30546C1.28973 2.82118 1 3.52065 1 4.25L1 9.75C1 10.4793 1.28973 11.1788 1.80546 11.6945C2.32118 12.2103 3.02065 12.5 3.75 12.5H10.25C10.9793 12.5 11.6788 12.2103 12.1945 11.6945C12.7103 11.1788 13 10.4793 13 9.75V4.25C13 3.52065 12.7103 2.82118 12.1945 2.30546C11.6788 1.78973 10.9793 1.5 10.25 1.5ZM10.25 11H3.75C3.41848 11 3.10054 10.8683 2.86612 10.6339C2.6317 10.3995 2.5 10.0815 2.5 9.75V4.5H11.5V9.75C11.5 10.0815 11.3683 10.3995 11.1339 10.6339C10.8995 10.8683 10.5815 11 10.25 11Z"
              fill="currentColor"
            />
          </svg>
          Ten miesiąc{" "}
          <svg
            width="8"
            height="6"
            viewBox="0 0 8 6"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.76578 1.05529C7.69148 0.980952 7.60327 0.92198 7.50618 0.881745C7.40909 0.84151 7.30502 0.820801 7.19992 0.820801C7.09482 0.820801 6.99075 0.84151 6.89366 0.881745C6.79657 0.92198 6.70836 0.980952 6.63407 1.05529L4.18825 3.50058C4.13824 3.55057 4.07043 3.57865 3.99972 3.57865C3.92901 3.57865 3.8612 3.55057 3.81119 3.50058L1.36591 1.05529C1.2159 0.905218 1.01243 0.820879 0.80024 0.820829C0.588053 0.820779 0.384537 0.905022 0.234463 1.05502C0.0843887 1.20503 5.00325e-05 1.4085 2.22535e-08 1.62069C-4.9988e-05 1.83288 0.0841929 2.03639 0.234196 2.18647L2.68001 4.63228C2.85335 4.80564 3.05913 4.94315 3.28561 5.03697C3.5121 5.13079 3.75484 5.17908 3.99999 5.17908C4.24513 5.17908 4.48788 5.13079 4.71436 5.03697C4.94084 4.94315 5.14662 4.80564 5.31996 4.63228L7.76578 2.18647C7.91575 2.03645 8 1.83301 8 1.62088C8 1.40875 7.91575 1.20531 7.76578 1.05529Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>
      <div className={styles.statistics__cardContainer}>
        <StatisticsCard
          value="3 485,58 PLN"
          description="Zarobki netto"
          icon={earnings}
        />
        <StatisticsCard
          value={173}
          description="Przyjęte zlecenia"
          icon={orders}
        />
        <StatisticsCard
          value="2 648"
          description="Wyświetlenia profilu"
          icon={watch}
        />
      </div>
    </section>
  );
};

export default Statistics;