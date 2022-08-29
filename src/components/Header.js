import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./header.css";
import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ReorderIcon from "@mui/icons-material/Reorder";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import {
  setMailCategory,
  setMailList,
  setMailListLoading,
  setPageToken,
  setResultSizeEstimate,
} from "../features/mailListSlice";
import { LOG_OUT } from "../features/user/userSlice.js";
import { logoutUser } from "../services/LogoutService";
import { getMailList } from "../services/MailService";
function Header() {
  const { userInfo } = useSelector((state) => state.user);
  const { mailCategory } = useSelector((state) => state.mails);
  const [searchText, setSearchText] = useState("");

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(LOG_OUT());
    const token = localStorage.getItem("token");
    const response = await logoutUser(token);
    if (response.success) {
      dispatch(LOG_OUT);
      localStorage.removeItem("token");
      navigate("/");
    } else {
      alert("Please try again later");
    }
  };
  const handleChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = async (e, flag) => {
    if (e.keyCode === 13 || flag) {
      if (!searchText) {
        return;
      }
      dispatch(setMailListLoading(true));
      const token = localStorage.getItem("token");
      dispatch(setMailCategory("INBOX"));

      const mails = await getMailList(token, {
        mailOption: {
          userId: "me",
          labelIds: "INBOX",
          format: "full",
          q: searchText,
        },
      });
      dispatch(setMailListLoading(false));
      dispatch(setMailList(mails.data));
      dispatch(setPageToken(mails.pageTokenInfo.pageToken));
      dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
    }
  };
  return (
    <div className="headerwrapper">
      <div className="left-header">
        <IconButton aria-label="reorder" className="icons">
          <ReorderIcon />
        </IconButton>

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
        <Tooltip title="Search">
          <IconButton
            sx={{ p: "10px", backgroundColor: "#eef3fc;" }}
            aria-label="menu"
            onClick={(e) => {
              handleSearch(e, true);
            }}
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
            onKeyDown={(e) => {
              handleSearch(e, false);
            }}
            onChange={handleChange}
            value={searchText}
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
