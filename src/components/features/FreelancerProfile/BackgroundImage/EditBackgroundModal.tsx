import { useFreelancerProfileService } from "@services/freelancerProfileService";
import EditImageModal from "../EditModals/EditImageModal/EditImageModal";

const EditBackground: React.FC<{
  onClose: () => void;
  onSave: (imageBlob: Blob) => void;
  classname: string;
  initialImage: string | undefined;
  onDelete: () => void;
}> = ({ onClose, onSave, classname, initialImage, onDelete }) => {
  const { deleteBackgroundPicture } = useFreelancerProfileService();

  const handleDelete = async () => {
    try {
      await deleteBackgroundPicture();
      onDelete();
    } catch (error) {
      console.error("Błąd podczas usuwania obrazu:", error);
    }
  };

  return (
    <EditImageModal
      title="Edytuj zdjęcie w tle"
      recommendedSize="1320px na 250px"
      aspect={1320 / 250}
      onClose={onClose}
      onSave={onSave}
      deleteImage={handleDelete}
      classname={classname}
      initialImage={initialImage}
    />
  );
};

export default EditBackground;
