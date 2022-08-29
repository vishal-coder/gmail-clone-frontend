import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InboxIcon from "@mui/icons-material/Inbox";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import SendIcon from "@mui/icons-material/Send";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import React from "react";

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
  LabelData.Icon = getLabelIcon(LabelData.name);
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
