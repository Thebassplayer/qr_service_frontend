import { useState } from "react";
// Services
import { changePassword } from "../../services/authServices";
// React Router
import { toast } from "react-toastify";
// Components
import Card from "../card/Card";
// React Router
import { useNavigate } from "react-router-dom";
// Styles
import "./ChangePassword.scss";

const initialState = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const { currentPassword, newPassword, confirmPassword } = formData;

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const changePass = async e => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }
    if (
      currentPassword === newPassword ||
      currentPassword === confirmPassword
    ) {
      return toast.error("New password cannot be same as old password");
    }
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const formData = {
      oldPassword: currentPassword,
      password: newPassword,
    };

    try {
      const data = await changePassword(formData);
      toast.success(data);
      navigate("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="change-password">
      <Card cardClass="password-card">
        <h3>Change Password</h3>
        <form onSubmit={changePass} className="--form-control">
          <input
            type="password"
            placeholder="Current password"
            name="currentPassword"
            value={currentPassword}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="New password"
            name="newPassword"
            value={newPassword}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
          <button className="--btn --btn-primary" type="submit">
            Change Password
          </button>
        </form>
      </Card>
    </div>
  );
};

export default ChangePassword;
