import { useState, useEffect } from "react";

// Redux
import { useDispatch } from "react-redux";

import { SET_LOGIN } from "../redux/features/auth/authSlice.js";

// React Router
import { useNavigate } from "react-router-dom";

//Services
import { getLoginStatus } from "../services/authServices.js";

// React Toastify
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = path => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const isLoggedIn = await getLoginStatus();
      dispatch(SET_LOGIN(isLoggedIn));

      if (!isLoggedIn) {
        toast.info("Session expired, please login to continue");
        navigate(path);
        return;
      }
    };
    redirectLoggedOutUser();
  }, [navigate, path, dispatch]);
};

export default useRedirectLoggedOutUser;
