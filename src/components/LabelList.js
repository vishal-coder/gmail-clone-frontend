import React, { useEffect, useState } from "react";
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
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function LabelList({ labelData: LabelData }) {
  const getLabelIcon = (name) => {
    switch (LabelData.name) {
      case "CHAT":
        return ChatOutlinedIcon;
        break;
      case "SENT":
        return SendIcon;
        break;
      case "IMPORTANT":
        return AccessTimeIcon;
        break;
      case "TRASH":
        return DeleteOutlineIcon;
        break;
      case "DRAFT":
        return TaskOutlinedIcon;
        break;
      case "SPAM":
        return ReportOutlinedIcon;
        break;
      case "STARRED":
        return StarBorderIcon;
        break;
      case "UNREAD":
        return InboxIcon;
        break;
      case "CATEGORY_FORUMS":
        return InboxIcon;
        break;
      case "CATEGORY_UPDATES":
        return InboxIcon;
        break;
      case "CATEGORY_PERSONAL":
        return InboxIcon;
        break;
      case "CATEGORY_PROMOTIONS":
        return InboxIcon;
        break;
      case "CATEGORY_SOCIAL":
        return InboxIcon;
        break;
      default:
        return InboxIcon;
        break;
    }
  };
  //getLabelIcon();
  LabelData.Icon = getLabelIcon(LabelData.name);
  console.log("getLabelIcon -- ", getLabelIcon(LabelData.name));
  console.log("labelData.Icon -- ", LabelData.Icon);
  return (
    <>
      {" "}
      <div className="sidebarIcon">
        <LabelData.Icon />
        <div></div>
      </div>
      <p>{LabelData.name}</p>
      <div>{LabelData.number}</div>
    </>
  );
}

export default LabelList;
