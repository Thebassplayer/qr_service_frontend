import { useState } from "react";

// Icons
import { TiUserAddOutline } from "react-icons/ti";

// Components
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";

// Redux
import { useDispatch } from "react-redux";

// Redux Actions
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice";

// React Router
import { Link, useNavigate } from "react-router-dom";

// Styles
import styles from "./auth.module.scss";

//React Toastify
import { toast } from "react-toastify";

// Services
import { registerUser, validateEmail } from "../../services/authServices";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { username, email, password, confirmPassword } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const register = async e => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("please enter a valid email address");
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

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      username,
      email,
      password,
    };

    setIsLoading(true);
    try {
      const data = await registerUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.username));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form onSubmit={register}>
            <input
              type="text"
              placeholder="Name"
              required
              name="username"
              value={username}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have an account &nbsp;</p>
            <Link to="login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Register;
