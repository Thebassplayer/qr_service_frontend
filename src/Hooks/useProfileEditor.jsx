import { useState } from "react";
// React Toastify
import { toast } from "react-toastify";
// React Router
import { useNavigate } from "react-router-dom";

const useProfileEditor = (initialProfile, userImage, onUpdate) => {
  const [profile, setProfile] = useState(initialProfile);

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", profile?.name);
      formData.append("email", profile?.email);
      formData.append("phone", profile?.phone);
      formData.append("bio", profile?.bio);
      if (userImage) {
        formData.append("image", userImage);
      }

      const data = await onUpdate(formData);
      toast.success("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return { profile, setProfile, handleSubmit, handleInputChange };
};

export default useProfileEditor;
