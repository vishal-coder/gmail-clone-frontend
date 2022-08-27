import React, { useEffect, useState } from "react";
import "./leftsidebar.css";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";
import LabelList from "./LabelList.js";
import InboxIcon from "@mui/icons-material/Inbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ScheduleSendOutlinedIcon from "@mui/icons-material/ScheduleSendOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import { useDispatch, useSelector } from "react-redux";
import { openComposeModal } from "../features/composeMailSlice";
import { getLabelList } from "../services/LabelService.js";
import {
  setMailCategory,
  setMailList,
  setMailListLoading,
  setPageToken,
  setResultSizeEstimate,
  setViewMail,
} from "../features/mailListSlice.js";
import { getMailList } from "../services/MailService.js";

function LeftSideBar() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userToken } = useSelector((state) => state.user);
  const [labelList, setLabelList] = useState(null);
  useEffect(() => {
    const getLables = async () => {
      //const data = await getUserProfile(token);
      const response = await getLabelList(userToken);
      console.log("labelList,labelsList--", response);
      console.log("labelList,labelsList--", response.data);
      setLabelList(response.data);
      setLoading(false);
      console.log("labelList,labelsList--", response);
      console.log("loading--", loading);
    };
    getLables();
  }, []);

  const [active, setActive] = useState("INBOX");
  console.log("acive is", active);

  const getMailByLabel = async (labelType) => {
    dispatch(setMailListLoading(true));
    dispatch(setViewMail(false));

    setActive(labelType);
    console.log("inside getMailByLabel-left side bar", labelType);
    const token = localStorage.getItem("token");
    const mails = await getMailList(token, {
      mailOption: {
        userId: "me",
        labelIds: labelType,
        format: "metadata",
      },
    });
    console.log("getMailByLabel response is ", mails);

    dispatch(setMailCategory(labelType));
    dispatch(setMailList(mails.data));
    dispatch(setMailListLoading(false));
    dispatch(setPageToken(mails.pageTokenInfo.pageToken));
    dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
  };
  return (
    <div className="leftsidebarwrapper">
      <div className="componsebtnDiv">
        <Button
          className="componsebtn"
          variant="contained"
          size="large"
          startIcon={<CreateIcon fontSize="large" />}
          onClick={() => {
            dispatch(openComposeModal());
          }}
        >
          <span>Compose</span>
        </Button>
      </div>
      <div>
        {!loading ? (
          <>
            <div className="labelListWrapper ">
              {labelList.map((labelData) => (
                <div
                  key={labelData.id}
                  id={labelData.id}
                  className={`labellistitem ${
                    active == labelData.id && "active"
                  }`}
                  onClick={() => {
                    getMailByLabel(labelData.id);
                  }}
                >
                  <LabelList labelData={labelData} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LeftSideBar;
