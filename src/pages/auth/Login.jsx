import { useState } from "react";

// Icons
import { BiLogIn } from "react-icons/bi";

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
import { loginUser, validateEmail } from "../../services/authServices";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async e => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }

    if (!validateEmail(email)) {
      return toast.error("please enter a valid email address");
    }

    const userData = {
      email,
      password,
    };

    setIsLoading(true);

    try {
      const data = await loginUser(userData);
      dispatch(SET_LOGIN(true));
      dispatch(SET_NAME(data.username));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>
          <form onSubmit={login}>
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
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>
          <Link to="/forgotpassword">Forgot Password</Link>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Don´t have an account &nbsp;</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
