import React, { useState } from "react";
import "./mainbody.css";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";

import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import CheckBoxOutlineBlankOutlinedIcon from "@mui/icons-material/CheckBoxOutlineBlankOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EmailType from "./EmailType.js";
import EmailList from "./EmailList.js";
import EmailListFooter from "./EmailListFooter";
import {
  setMailList,
  setMailListLoading,
  setPageToken,
  setResultSizeEstimate,
} from "../features/mailListSlice";
import { getMailList } from "../services/MailService";

function MainBody() {
  const { mailListLoading } = useSelector((state) => state.mails);
  const { mailCategory } = useSelector((state) => state.mails);
  const { pageToken } = useSelector((state) => state.mails);
  const { resultSizeEstimate } = useSelector((state) => state.mails);

  const dispatch = useDispatch();
  const handleRefresh = async () => {
    dispatch(setMailListLoading(true));
    const token = localStorage.getItem("token");
    const mails = await getMailList(token, {
      mailOption: {
        userId: "me",
        labelIds: mailCategory,
        format: "metadata",
      },
    });
    console.log("mailList in email list is", mails);
    console.log("mailList in email list is--@--", mails);
    dispatch(setMailListLoading(false));
    dispatch(setMailList(mails.data));
    dispatch(setPageToken(mails.pageTokenInfo.pageToken));
    dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
  };

  const handleNextPageMails = async () => {
    dispatch(setMailListLoading(true));
    const token = localStorage.getItem("token");
    const mails = await getMailList(token, {
      mailOption: {
        userId: "me",
        labelIds: mailCategory,
        format: "metadata",
        pageToken: pageToken || null,
      },
    });
    console.log("mailList in mainbody handleNextPageMails  is", mails);
    dispatch(setMailListLoading(false));
    dispatch(setMailList(mails.data));
    dispatch(setPageToken(mails.pageTokenInfo.pageToken));
    dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
  };
  return (
    <div className="mainbodywrapper">
      <div className="emailsetting">
        <div>
          <IconButton aria-label="checkbox">
            <CheckBoxOutlineBlankOutlinedIcon />
          </IconButton>
          <IconButton aria-label="arrow-dropdown">
            <ArrowDropDownOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="refresh"
            onClick={() => {
              handleRefresh();
            }}
          >
            <RefreshOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="more"
            onClick={() => {
              handleNextPageMails();
            }}
          >
            <MoreVertOutlinedIcon />
          </IconButton>
        </div>
        <div>
          {/* <p sx={{ display: "block" }}> */}
          {/* <span>1-8</span> of <span></span> */}
          {/* <div>1-8</div>
          <div>of</div>
          <div> {resultSizeEstimate}</div> */}
          {/* </p> */}
          <IconButton
            aria-label="more"
            onClick={() => {
              handleNextPageMails();
            }}
          >
            <ArrowBackIosNewOutlinedIcon />
          </IconButton>
          <IconButton
            aria-label="more"
            onClick={() => {
              handleNextPageMails();
            }}
          >
            <ArrowForwardIosOutlinedIcon />
          </IconButton>
        </div>
      </div>
      <div>
        <EmailType />
      </div>
      <div className="emaillistwrapper">
        <EmailList />
      </div>
      {/* <div>
        <EmailListFooter />
      </div> */}
    </div>
  );
}

export default MainBody;
