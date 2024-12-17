import ImageEditModal from "../edit/ImageEditModal/ImageEditModal";
import { useFreelancerProfileService } from "@services/freelancerProfileService";

const EditAvatar: React.FC<{ onClose: () => void; onSave: (data: any) => void }> = ({
  onClose,
  onSave,
}) => {
  const { deleteAvatar } = useFreelancerProfileService();

  return (
    <ImageEditModal
      title="Edytuj awatar"
      recommendedSize="160px na 160px"
      aspect={1} 
      onClose={onClose}
      onSave={onSave}
      deleteImage={deleteAvatar}
    />
  );
};

export default EditAvatar;