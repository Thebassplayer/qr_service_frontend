import { useState } from "react";

import { toast } from "react-toastify";

const useImageProductUploader = () => {
  const [productImage, setProductImage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = e => {
    const file = e.target.files[0];

    // Check if a file is selected
    if (file) {
      const allowedExtensions = ["jpg", "jpeg", "gif", "png"];
      const extension = file.name.split(".").pop().toLowerCase();

      // Check if the file extension is allowed
      if (allowedExtensions.includes(extension)) {
        setProductImage(file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        // Display an error or show a notification to the user
        toast.error(
          "Invalid image format. Please select a JPG, JPEG, GIF, or PNG file."
        );
      }
    }
  };

  return {
    productImage,
    imagePreview,
    handleImageChange,
    setImagePreview,
  };
};

export default useImageProductUploader;
