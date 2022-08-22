import React from "react";
import "./compose.css";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import HeightOutlinedIcon from "@mui/icons-material/HeightOutlined";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

function Compose() {
  return (
    <div className="composemailwrapper">
      <div className="composeheader">
        <div>New Message</div>
        <div className="composeheaderclosebox">
          <div>
            <RemoveOutlinedIcon />{" "}
          </div>
          <div>
            {" "}
            <HeightOutlinedIcon className="heightaduster" />
          </div>
          <div>
            {" "}
            <CloseOutlinedIcon />
          </div>
        </div>
      </div>
      <div className="composebody">
        <input
          type="email"
          name="recepient-el"
          id="recepient"
          className="recepient-newmail"
          placeholder="recepient"
        />
        <input
          type="email"
          name="subject-el"
          id="subject"
          className="subject-newmail"
          placeholder="subject"
        />
        <textarea
          name="newmailbody-el"
          id="newmailbody"
          cols="50"
          rows="20"
          className="newmailbody-newmail"
        ></textarea>
      </div>
      <div className="composefooter">
        <div className="footerleftpart">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className="sendbtn"
          >
            Send
          </Button>
          <FormatColorTextOutlinedIcon />
          <AttachFileOutlinedIcon />
          <InsertLinkOutlinedIcon />
          <TagFacesOutlinedIcon />
          <AddToDriveOutlinedIcon />
          <MoreVertOutlinedIcon />
        </div>
        <div className="footerrightpart">
          <DeleteOutlineOutlinedIcon />
        </div>
      </div>
    </div>
  );
}

export default Compose;
