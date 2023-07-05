import { useEffect, useState } from "react";
//Components
import { SpinnerImg } from "../../components/loader/Loader";
import Card from "../../components/card/Card";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../services/authServices";
import { SET_NAME, SET_USER } from "../../redux/features/auth/authSlice";
// Custom Hooks
import useRedirectLoggedOutUser from "../../Hooks/useRedirectLoggedOutUser";
// Styles
import "./Profile.scss";
import { Link } from "react-router-dom";

const Profile = () => {
  useRedirectLoggedOutUser("/login");
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const getProfile = async () => {
      const data = await getUser();

      setProfile(data);
      setIsLoading(false);
      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.username));
    };
    getProfile();
  }, [dispatch]);
  return (
    <div className="profile --my2">
      {isLoading && <SpinnerImg />}
      <>
        {!isLoading && profile === null ? (
          <p>Something whent wrong, reload page...</p>
        ) : (
          <Card cardClass={"card --flex-dir-column"}>
            <span className="profile photo">
              <img src={profile?.photo?.url} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name : </b>
                {profile?.username}
              </p>
              <p>
                <b>Email : </b>
                {profile?.email}
              </p>
              <p>
                <b>Phone : </b>
                {profile?.phone}
              </p>
              <p>
                <b>Bio : </b>
                {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
