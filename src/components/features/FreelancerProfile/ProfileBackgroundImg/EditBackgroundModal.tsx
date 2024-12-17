import ImageEditModal from "../edit/ImageEditModal/ImageEditModal";
import { useFreelancerProfileService } from "@services/freelancerProfileService";

const EditBackground: React.FC<{ onClose: () => void; onSave: (data: any) => void }> = ({
  onClose,
  onSave,
}) => {
  const { deleteBackgroundPicture } = useFreelancerProfileService();

  return (
    <ImageEditModal
      title="Edytuj zdjęcie w tle"
      recommendedSize="1320px na 250px"
      aspect={1320 / 250}
      onClose={onClose}
      onSave={onSave}
      deleteImage={deleteBackgroundPicture}
    />
  );
};

export default EditBackground;

