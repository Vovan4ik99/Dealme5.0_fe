import React from "react";
import EditIcon from "../EditIcon/EditIcon";

interface EditButtonProps {
  onClick: () => void;
  className?: string;
}

const EditButton: React.FC<EditButtonProps> = ({
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={className}
    >
      <EditIcon />
    </button>
  );
};

export default EditButton;
