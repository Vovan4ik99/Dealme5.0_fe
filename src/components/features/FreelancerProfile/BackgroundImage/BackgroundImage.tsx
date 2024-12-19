import { useState } from "react";
import ReusableModal from "../EditModals/ReusableModal/ReusableModal";

const ParentComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Otwórz modal</button>
      {isModalOpen && (
        <ReusableModal
          title="Tytuł modala"
          onClose={() => setIsModalOpen(false)}
          onSave={() => console.log("Zapisano!")}
        >
          <p>Treść modala</p>
        </ReusableModal>
      )}
    </div>
  );
};

export default ParentComponent;
