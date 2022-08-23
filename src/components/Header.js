import React, { useEffect, useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";

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
import IconButton from "@mui/material/IconButton";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import InputBase from "@mui/material/InputBase";
import { getUserProfile } from "../services/ProfileService.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserProfile,
  setIsLoggedIn,
  LOG_OUT,
} from "../features/user/userSlice.js";
import Tooltip from "@mui/material/Tooltip";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { logoutUser } from "../services/LogoutService";
function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    alert("clicked");
    dispatch(LOG_OUT());
    const token = localStorage.getItem("token");
    const response = await logoutUser(token);
    console.log(response);
    if (response.success) {
      dispatch(LOG_OUT);
      localStorage.removeItem("token");
      navigate("/");
    } else {
      alert("Please try again later");
    }
  };
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
          <Tooltip title="Gmail">
            <img
              src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r4.png"
              alt="Gmail Icon"
            />
          </Tooltip>
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
        <Tooltip title="Search">
          <IconButton
            sx={{ p: "10px", backgroundColor: "#eef3fc;" }}
            aria-label="menu"
          >
            <SearchIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Enter text to search">
          <InputBase
            className="searchInput"
            sx={{ ml: 1, flex: 0.7, backgroundColor: "white" }}
            placeholder="Search in emails"
            inputProps={{ "aria-label": "search google maps" }}
          />
        </Tooltip>
      </div>
      <div className="profileHeaderDiv">
        <Tooltip title="Support">
          <IconButton aria-label="Support">
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Setting">
          <IconButton aria-label="Setting">
            <SettingsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Google Apps">
          <IconButton aria-label="Google Apps">
            <AppsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={userInfo && userInfo.name ? userInfo.name : userInfo}>
          <Avatar
            alt={userInfo && userInfo.name ? userInfo.name : userInfo}
            // src="https://lh3.googleusercontent.com/a-/AFdZucoT3CTGv5f5g9JSEqCAPiEJ_P8N4CEa-KGYhTxw=s96-c"
            src={
              userInfo && userInfo.picture ? userInfo.picture : userInfo.picture
            }
            onClick={() => setOpen(true)}
            sx={{ cursor: "pointer" }}
          />
        </Tooltip>
        <Menu
          sx={{ marginTop: "2rem" }}
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={true}
          open={open}
          onClose={() => setOpen(false)}
          placement="bottom-start"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
