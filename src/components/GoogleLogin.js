import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  setIsLoggedIn,
  setUserProfile,
  setUserToken,
} from "../features/user/userSlice.js";
import { getUserProfile } from "../services/ProfileService.js";
import "./login.css";

function GoogleLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      dispatch(setUserToken(token));

      const getProfile = async () => {
        const token = localStorage.getItem("token");

        const data = await getUserProfile(token);
        dispatch(setUserProfile(data.data));
        dispatch(setIsLoggedIn(true));
        navigate("/loggedindashboard");
      };
      getProfile();
    }
  }, []);
  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch(
        `${process.env.REACT_APP_API}/auth/createAuthLink`,
        {
          method: "GET",
        }
      );
      const response = await request.json();
      window.location.href = response.authUrl;
    } catch (error) {
      throw new Error("Issue with Login", error.message);
    }
  };
  return (
    <div className="loginDiv">
      <div>
        <h3>Welcome to Google Clone</h3>
      </div>
      <div></div>
      <hr />
      <div>
        {" "}
        <a
          role="button"
          style={{ textTransform: "none" }}
          className="linkDiv"
          onClick={createGoogleAuthLink}
        >
          <img
            width="20px"
            sx={{ marginBottom: "3px", marginRight: "5px" }}
            alt="Google sign-in"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
          />
          Login with Google
        </a>
      </div>
    </div>
  );
}

export default GoogleLogin;
