import React, { useEffect } from "react";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
// import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import SettingsIcon from "@mui/icons-material/Settings";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputBase from "@mui/material/InputBase";
import { getUserProfile } from "../services/ProfileService.js";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile, setIsLoggedIn } from "../features/user/userSlice.js";
function Header() {
  // const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("token in header is ", token);
    const getProfile = async () => {
      const data = await getUserProfile(token);
      dispatch(setUserProfile(data.profile));
      dispatch(setIsLoggedIn(true));

      console.log("profile in header is", data);
    };
    getProfile();
  }, []);
  return (
    <div className="headerwrapper">
      <div className="left-header">
        <IconButton aria-label="reorder" className="icons">
          <ReorderIcon />
        </IconButton>
        {/* <div className="icons">
          <FontAwesomeIcon icon={faBars} />
        </div> */}
        <div>
          {" "}
          <img
            src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r4.png"
            alt="Gmail Icon"
          />
        </div>
      </div>
      <div className="searchDiv">
        {/* <InputGroup className="mb-3 searchInput">
          {/* <FontAwesomeIcon icon={faMagnifyingGlass} className="searchIcon" /> */}
        {/* <IconButton aria-label="Search">
          <SearchIcon />
        </IconButton> */}
        {/* <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          placeholder="Search in emails"
        /> */}
        {/* </InputGroup> */}
        <IconButton
          sx={{ p: "10px", backgroundColor: "#eef3fc;" }}
          aria-label="menu"
        >
          <SearchIcon />
        </IconButton>
        <InputBase
          className="searchInput"
          sx={{ ml: 1, flex: 0.7, backgroundColor: "white" }}
          placeholder="Search in emails"
          inputProps={{ "aria-label": "search google maps" }}
        />
      </div>
      <div className="profileHeaderDiv">
        <IconButton aria-label="Search">
          <HelpOutlineIcon />
        </IconButton>

        <IconButton aria-label="Search">
          <SettingsIcon />
        </IconButton>
        <IconButton aria-label="Search">
          <AppsIcon />
        </IconButton>

        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
      </div>
    </div>
  );
}

export default Header;
