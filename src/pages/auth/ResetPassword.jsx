import { useState } from "react";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";

// React Router
import { Link, useParams, useNavigate } from "react-router-dom";

//React Toastify
import { toast } from "react-toastify";

import styles from "./auth.module.scss";
import { resetPassword } from "../../services/authServices";

const initialState = {
  password: "",
  password2: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialState);
  const { password, password2 } = formData;

  const { resetToken } = useParams();

  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const reset = async e => {
    e.preventDefault();

    if (!password || !password2) {
      return toast.error("All fields are required");
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    ) {
      return toast.error(
        "Password must be at least 8 characters, contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    if (password !== password2) {
      return toast.error("Passwords must be equal");
    }

    const userData = {
      password,
      password2,
    };

    try {
      const data = await resetPassword(userData, resetToken);
      toast.success(data.message);
      navigate("/login");
    } catch (error) {}
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Passwotd
            </button>

            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default ResetPassword;
