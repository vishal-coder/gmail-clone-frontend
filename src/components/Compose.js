import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import { closeComposeModal } from "../features/composeMailSlice";
import { ValidateEmail } from "../services/utilityservice";
import { sendMailService } from "../services/SendMailService";

function Compose() {
  const dispatch = useDispatch();
  const [mailRecipient, setMailRecipient] = useState("");
  const [mailSubject, setMailSubject] = useState("");
  const [mailBody, setMailBody] = useState("");

  const handleMailRecipient = (event) => {
    setMailRecipient(event.target.value);
  };
  const handleMailSubject = (event) => {
    setMailSubject(event.target.value);
  };
  const handleMailBody = (event) => {
    setMailBody(event.target.value);
  };

  const handleSendMail = async () => {
    alert(mailRecipient);
    alert(mailSubject);
    alert(mailBody);
    const token = localStorage.getItem("token");
    const validEmail = ValidateEmail(mailRecipient);
    if (!validEmail) {
      alert("You have entered an invalid email address!");
      return;
    }

    const values = {
      to: mailRecipient,
      subject: mailSubject,
      body: mailBody,
    };

    const res = await sendMailService(token, values);
    if (res.success) {
      alert("mail sent successfully");
    } else {
      alert("something went wront..please try again later");
    }
    dispatch(closeComposeModal());
  };

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
            <CloseOutlinedIcon
              onClick={() => {
                dispatch(closeComposeModal());
              }}
            />
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
          onChange={handleMailRecipient}
          value={mailRecipient}
        />
        <input
          type="email"
          name="subject-el"
          id="subject"
          className="subject-newmail"
          placeholder="subject"
          onChange={handleMailSubject}
          value={mailSubject}
        />
        <textarea
          name="newmailbody-el"
          id="newmailbody"
          cols="50"
          rows="20"
          className="newmailbody-newmail"
          onChange={handleMailBody}
          value={mailBody}
        ></textarea>
      </div>
      <div className="composefooter">
        <div className="footerleftpart">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className="sendbtn"
            onClick={() => handleSendMail()}
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
