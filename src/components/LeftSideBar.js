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

function LeftSideBar() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.user);
  const [labelList, setLabelList] = useState(null);
  useEffect(() => {
    const getLables = async () => {
      //const data = await getUserProfile(token);
      const labelsList = await getLabelList(userToken);
      console.log("labelList,labelsList", labelsList);
    };
    getLables();
  }, []);

  const data = [
    { Icon: InboxIcon, label: "Inbox", number: 0, isActive: true },
    { Icon: StarBorderIcon, label: "Starred", number: null },
    { Icon: AccessTimeIcon, label: "Snoozed", number: null },
    { Icon: SendIcon, label: "Sent", number: null },
    { Icon: TaskOutlinedIcon, label: "Drafts", number: null },
    { Icon: LabelImportantOutlinedIcon, label: "Important", number: null },
    { Icon: ChatOutlinedIcon, label: "Chats", number: null },
    { Icon: ScheduleSendOutlinedIcon, label: "Scheduled", number: null },
    { Icon: EmailOutlinedIcon, label: "All Mail", number: null },
    { Icon: ReportOutlinedIcon, label: "Spam", number: null },
  ];
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
        {data.map((labelData) => (
          <LabelList labelData={labelData} />
        ))}
      </div>
    </div>
  );
}

export default LeftSideBar;
