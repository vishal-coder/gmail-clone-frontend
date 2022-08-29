import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "@mui/material/Button";
import React, { useState } from "react";
import "./compose.css";

import AddToDriveOutlinedIcon from "@mui/icons-material/AddToDriveOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import InsertLinkOutlinedIcon from "@mui/icons-material/InsertLinkOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SendIcon from "@mui/icons-material/Send";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import { useDispatch } from "react-redux";
import { closeComposeModal } from "../features/composeMailSlice";
import { sendMailService } from "../services/SendMailService";
import { ValidateEmail } from "../services/utilityservice";

function Compose() {
  const dispatch = useDispatch();
  const [mailRecipient, setMailRecipient] = useState("");
  const [mailccRecipient, setMailccRecipient] = useState("");
  const [mailbccRecipient, setMailbccRecipient] = useState("");

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

  const handleMailccRecipient = (event) => {
    setMailccRecipient(event.target.value);
  };

  const handleMailbccRecipient = (event) => {
    setMailbccRecipient(event.target.value);
  };

  const handleSendMail = async () => {
    const token = localStorage.getItem("token");
    const validEmail = ValidateEmail(mailRecipient);
    if (!validEmail) {
      alert("You have entered an invalid email address!");
      return;
    }
    const validEmailCC = ValidateEmail(mailccRecipient);
    if (!validEmailCC) {
      alert("You have entered an invalid Cc email address!");
      return;
    }

    const validEmailBCC = ValidateEmail(mailbccRecipient);
    if (!validEmailBCC) {
      alert("You have entered an invalid Bcc email address!");
      return;
    }

    const values = {
      to: mailRecipient,
      Cc: mailccRecipient || "",
      Bcc: mailbccRecipient || "",
      subject: mailSubject,
      body: mailBody,
    };

    const res = await sendMailService(token, values);
    setMailRecipient("");
    setMailbccRecipient("");
    setMailccRecipient("");
    setMailBody("");
    setMailSubject("");
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
          <div>{/* <RemoveOutlinedIcon />{" "} */}</div>
          <div> {/* <HeightOutlinedIcon className="heightaduster" /> */}</div>
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
          placeholder="To"
          onChange={handleMailRecipient}
          value={mailRecipient}
        />
        <input
          type="email"
          name="cc-recepient-el"
          id="cc-recepient"
          className="recepient-newmail"
          placeholder="Cc"
          onChange={handleMailccRecipient}
          value={mailccRecipient}
        />
        <input
          type="email"
          name="bcc-recepient-el"
          id="bcc-recepient"
          className="recepient-newmail"
          placeholder="Bcc"
          onChange={handleMailbccRecipient}
          value={mailbccRecipient}
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
