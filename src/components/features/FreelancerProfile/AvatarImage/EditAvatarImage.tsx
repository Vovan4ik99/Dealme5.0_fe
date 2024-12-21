import { useFreelancerProfileService } from "@services/freelancerProfileService";
import EditImageModal from "../EditModals/EditImageModal/EditImageModal";

const EditBackground: React.FC<{
  onClose: () => void;
  onSave: (imageBlob: Blob) => void;
  classname: string;
  initialImage: string | undefined;
  onDelete: () => void;
}> = ({ onClose, onSave, classname, initialImage, onDelete }) => {
  const { deleteAvatar } = useFreelancerProfileService();

  const handleDelete = async () => {
    try {
      await deleteAvatar();
      onDelete();
    } catch (error) {
      console.error("Błąd podczas usuwania obrazu:", error);
    }
  };

  return (
    <EditImageModal
      title="Edytuj awatar"
      recommendedSize="512x512px."
      aspect={1}
      onClose={onClose}
      onSave={onSave}
      deleteImage={handleDelete}
      classname={classname}
      initialImage={initialImage}
      header="Awatar (opcjonalnie)"
      hasBackground={true}
    />
  );
};

export default EditBackground;
