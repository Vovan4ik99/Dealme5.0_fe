import { useFreelancerProfileService } from "@services/freelancerProfileService";
import EditImageModal from "../EditModals/EditImageModal/EditImageModal";

const EditBackground: React.FC<{
  onClose: () => void;
  onSave: (imageBlob: Blob) => void;
  classname: string,
  initialImage: string | undefined;
}> = ({ onClose, onSave, classname, initialImage }) => {
  const { deleteBackgroundPicture } = useFreelancerProfileService();

  return (
    <EditImageModal
      title="Edytuj zdjęcie w tle"
      recommendedSize="1320px na 250px"
      aspect={1320 / 250}
      onClose={onClose}
      onSave={onSave}
      deleteImage={deleteBackgroundPicture}
      classname={classname}
      initialImage={initialImage}
    />
  );
};

export default EditBackground;
