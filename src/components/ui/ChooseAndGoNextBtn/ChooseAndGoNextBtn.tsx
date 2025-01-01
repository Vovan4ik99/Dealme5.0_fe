import React from "react";

interface EditButtonProps {
  onClick: () => void;
}

const ChooseAndGoNextBtn: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button className="btn btn--tab btn--goNext" onClick={onClick}>
      Wybierz i przejdź dalej{" "}
      <svg
        width="6"
        height="10"
        viewBox="0 0 6 10"
        xmlns="http://www.w3.org/2000/svg"
        style={{ height: "8px", width: "4.7" }}
      >
        <path
          id="XMLID_423_"
          d="M0.277594 1.18939C0.00179307 0.93083 0.00179255 0.482653 0.260356 0.206852C0.398256 0.0689511 0.58787 4.67157e-07 0.760246 4.52087e-07C0.932622 4.37017e-07 1.105 0.068952 1.2429 0.189615L5.72467 4.49901C5.86257 4.63691 5.93152 4.80928 5.93152 4.9989C5.93152 5.18851 5.86257 5.36089 5.72467 5.49879L1.2429 9.80818C0.967098 10.0667 0.536158 10.0667 0.260357 9.79094C0.00179334 9.51514 0.00179378 9.0842 0.277595 8.8084L4.24224 4.9989L0.277594 1.18939Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

export default ChooseAndGoNextBtn;
