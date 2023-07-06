import { useEffect, useState } from "react";
// Components
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
// Styles
import "./Profile.scss";
//Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/authSlice";
// React Router
import { useNavigate } from "react-router-dom";
// React Toastify
import { toast } from "react-toastify";
// Custom Hook
import useImageUserUploader from "../../Hooks/useImageUserUploader";
import useProfileEditor from "../../Hooks/useProfileEditor";
// Services
import { updateUser } from "../../services/authServices";
import ChangePassword from "../../components/changePassword/ChangePassword";

const EditProfile = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector(selectUser);

  const { email } = user;

  useEffect(() => {
    if (!email) {
      navigate("/profile");
    }
  }, [email, navigate]);

  const { userImage, imagePreview, handleImageChange } = useImageUserUploader();

  const { profile, handleSubmit, handleInputChange } = useProfileEditor(
    {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      bio: user?.bio,
      photo: user?.photo,
    },
    userImage,
    async formData => {
      setIsLoading(true);
      try {
        const data = await updateUser(formData);
        setIsLoading(false);
        return data;
      } catch (error) {
        setIsLoading(false);
        throw error;
      }
    }
  );

  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <Card cardClass={"card --flex-dir-column"}>
        {imagePreview != null ? (
          <div className="profile photo">
            <img src={imagePreview} alt="product" />
          </div>
        ) : (
          <span className="profile photo">
            <img src={user?.photo?.url} alt="profilepic" />
          </span>
        )}
        <form className="--form-control --m" onSubmit={handleSubmit}>
          <span className="profile-data">
            <p>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={profile?.name}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={profile?.email}
                disabled
              />
              <br />
              <code>Email cannot be changed.</code>
            </p>
            <p>
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={profile?.phone}
                onChange={handleInputChange}
              />
            </p>
            <p>
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                value={profile?.bio}
                onChange={handleInputChange}
                cols="30"
                rows="10"
              ></textarea>
            </p>
            <p>
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                name="image"
                // id="photo"
                onChange={handleImageChange}
              />
            </p>
            <div>
              <button className="--btn --btn-primary">Save Changes</button>
            </div>
          </span>
        </form>
      </Card>
      <br />
      <ChangePassword />
    </div>
  );
};

export default EditProfile;
