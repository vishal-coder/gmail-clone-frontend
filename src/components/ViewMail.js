import "./viewmail.css";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import ReportOutlinedIcon from "@mui/icons-material/ReportOutlined";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  useNavigate,
  Link,
  useSearchParams,
  useParams,
} from "react-router-dom";
import {
  setLoadInbox,
  setMailList,
  setMailListLoading,
  setPageToken,
  setResultSizeEstimate,
  setViewMail,
} from "../features/mailListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import parse from "html-react-parser";
import Tooltip from "@mui/material/Tooltip";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import { deleteMail } from "../services/DeleteMailService";
import { updateMailLabels } from "../services/LabelService";
import ReportOffIcon from "@mui/icons-material/ReportOff";
import { getMailList } from "../services/MailService";
import { forwardMailService } from "../services/ForwardMailService";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ReplyIcon from "@mui/icons-material/Reply";
import { ValidateEmail } from "../services/utilityservice";

function ViewMail() {
  const { mailList } = useSelector((state) => state.mails);
  const [showForwardOptions, setShowForwardOptions] = useState(false);
  const [forwardMail, setForwardMail] = useState("");
  const [forwardMailBody, setForwardMailBody] = useState("");
  const handleforwardMailChange = (event) => {
    setForwardMail(event.target.value);
  };
  const handleforwardMailBodyChange = (event) => {
    setForwardMailBody(event.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("id inside view mail is", params);
  console.log("id inside view mail is-mailList", mailList);
  let mail = mailList.find((item) => item && item.id === params.id);
  const [isStarred, setIsStarred] = useState(mail.isStarred || false);

  console.log("is starred-mail", mail);

  const sanitizedBody = mail.mailbody.replace(/hidden/gi, "");

  let mailpart = parse(sanitizedBody);
  const { mailListLoading } = useSelector((state) => state.mails);
  const { mailCategory } = useSelector((state) => state.mails);
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
    dispatch(setMailListLoading(false));
    dispatch(setMailList(mails.data));
    dispatch(setPageToken(mails.pageTokenInfo.pageToken));
    dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
  };

  const MailComponent = () => {
    return <div>{mailpart}</div>;
  };

  const handleDeleteMail = (id) => {
    const token = localStorage.getItem("token");
    const deleteResp = deleteMail(token, id);
    console.log("deleteResp", deleteResp);
  };

  const handleUpdateMaillables = (id, addLabel, removeLabel) => {
    const token = localStorage.getItem("token");
    const values = {
      id: id,
      addLabelIds: addLabel,
      removeLabelIds: removeLabel,
    };
    console.log(values);
    updateMailLabels(token, values);
  };

  const handleForwardMail = (id) => {
    const token = localStorage.getItem("token");
    console.log(forwardMail);
    const validEmail = ValidateEmail(forwardMail);
    alert(validEmail);
    if (!validEmail) {
      alert("You have entered an invalid email address!");
      return;
    }

    const values = {
      id: id,
      to: forwardMail,
      body: forwardMailBody,
    };
    const res = forwardMailService(token, values);
    alert("mail forwarded successfully");
    setShowForwardOptions(false);
    setForwardMail("");
    setForwardMailBody("");
    console.log("response of  forward mail is", res);
  };

  return (
    <div className="viewmailwrapper">
      <div className="viewmailtoptions">
        <div>
          <Tooltip title="Back">
            <IconButton aria-label="Back">
              <ArrowBackIcon
                onClick={() => {
                  dispatch(setViewMail(false));
                  handleRefresh();
                  navigate(-1, { replace: true });
                }}
              />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => {
                // navigate(-1, { replace: true });
                dispatch(setViewMail(false));
                dispatch(setMailListLoading(true));
                dispatch(setLoadInbox(true));
                dispatch(
                  setMailList(
                    mailList.filter((item) => !mail.id.includes(item.id))
                  )
                );
                handleDeleteMail(mail.id);
                navigate("/loggedindashboard");
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Unread">
            <IconButton
              aria-label="Unread"
              onClick={() => handleUpdateMaillables(mail.id, "UNREAD", null)}
            >
              <MarkEmailUnreadIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Spam">
            <IconButton
              aria-label="Spam"
              onClick={() => handleUpdateMaillables(mail.id, "SPAM", null)}
            >
              <ReportOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div>
          {" "}
          <Tooltip title="Spam">
            <IconButton
              aria-label="Spam"
              onClick={() => {
                if (isStarred) {
                  return (
                    handleUpdateMaillables(mail.id, null, "STARRED"),
                    setIsStarred(false)
                  );
                } else {
                  return (
                    handleUpdateMaillables(mail.id, "STARRED", null),
                    setIsStarred(true)
                  );
                }
                // mail.isStarred
                //   ? (handleUpdateMaillables(mail.id, null, "STARRED"),
                //     setIsStarred(false))
                //   : (handleUpdateMaillables(mail.id, "STARRED", null),
                //     setIsStarred(true));
              }}
            >
              {isStarred ? (
                <StarRateIcon sx={{ color: "gold" }} />
              ) : (
                <StarBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="viewmailheader">
        <div>
          <h2>{mail.subject}</h2>
          <h4>{mail.lables}</h4>
        </div>
        <div>
          <Button
            variant="contained"
            startIcon={<ReplyIcon />}
            sx={{ marginRight: "2rem" }}
            // onClick={() => handleForwardMail(id)}
          >
            Reply
          </Button>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ marginRight: "2rem" }}
            onClick={
              () => setShowForwardOptions(true)
              // handleForwardMail(mail.id)
            }
          >
            Forward
          </Button>
        </div>
      </div>
      {showForwardOptions && (
        <div className="forwardMailDiv">
          <hr />
          <div>
            <input
              className="fullsizeinput"
              type="email"
              placeholder="enter email of recepient"
              onChange={handleforwardMailChange}
              value={forwardMail}
            />
          </div>
          <hr />
          <div>
            <textarea
              className="fullsizeinput"
              cols={30}
              rows={10}
              type="text"
              placeholder="enter message"
              onChange={handleforwardMailBodyChange}
              value={forwardMailBody}
            />
          </div>
          <div>
            <Button
              size="small"
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ marginRight: "2rem" }}
              onClick={() => handleForwardMail(mail.id)}
            >
              {" "}
              Send
            </Button>
          </div>
          <hr />
        </div>
      )}

      <div className="viewmailbodywrapper">
        <div className="viewmailavatar">
          {" "}
          <Avatar>N</Avatar>
        </div>
        <div className="viewmailBody">
          <div className="viewmailsender">
            <h3>
              {mail.from} <span className="senderemail">{mail.sender}</span>
            </h3>
            <h4>{mail.sendingDate}</h4>
          </div>

          <div className="viewmailinfo">to me</div>
          <div className="mailbodycontent">
            <MailComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewMail;
