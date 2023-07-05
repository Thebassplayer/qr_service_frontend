// Redux
import { useDispatch, useSelector } from "react-redux";

// Redux Actions
import { SET_LOGIN, selectName } from "../../redux/features/auth/authSlice";

//Services
import { logoutUser } from "../../services/authServices";

// React Router
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const logout = async () => {
    await logoutUser();
    dispatch(SET_LOGIN(false));
    navigate("/");
  };
  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button className="--btn --btn-danger" onClick={logout}>
          Logout
        </button>
      </div>
      <hr />
    </div>
  );
};

export default Header;
