import React, { useEffect } from "react";
import "./login.css";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

function GoogleLogin() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    const token = searchParams.get("token");
    console.log("token in google login is", token);

    if (token) {
      // alert("google login");
      localStorage.setItem("token", token);
      localStorage.setItem("loggedin", true);
      navigate("/loggedindashboard");
    }
  }, []);
  const createGoogleAuthLink = async () => {
    try {
      const request = await fetch("http://localhost:5000/auth/createAuthLink", {
        method: "GET",
      });
      const response = await request.json();

      console.log(response);
      window.location.href = response.authUrl;
    } catch (error) {
      console.log("App.js 12 | error", error);
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
          // className="btn btn-outline-dark"
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
