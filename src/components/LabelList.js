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

function LabelList({ labelData }) {
  return (
    <div className={`labellistitem ${labelData.isActive && "listitem-active"}`}>
      <div className="sidebarIcon">{/* <  getLabelIcon()/> */}</div>

      <p>{labelData.name}</p>
      <div>{labelData.number}</div>
    </div>
  );
}

export default LabelList;
