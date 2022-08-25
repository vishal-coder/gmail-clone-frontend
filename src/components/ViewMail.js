import "./viewmail.css";
import React from "react";
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
  setViewMail,
} from "../features/mailListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import parse from "html-react-parser";
import Tooltip from "@mui/material/Tooltip";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";
import { deleteMail } from "../services/DeleteMailService";

function ViewMail() {
  const { mailList } = useSelector((state) => state.mails);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  console.log("id inside view mail is", params);
  console.log("id inside view mail is-mailList", mailList);
  let mail = mailList.find((item) => item && item.id === params.id);

  // words.filter((word) => word.length > 6);

  const sanitizedBody = mail.mailbody.replace(/hidden/gi, "");

  let mailpart = parse(sanitizedBody);

  const MailComponent = () => {
    return <div>{mailpart}</div>;
  };

  const handleDeleteMail = (id) => {
    const token = localStorage.getItem("token");
    const deleteResp = deleteMail(token, id);
    console.log("deleteResp", deleteResp);
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
            <IconButton aria-label="Unread">
              <MarkEmailUnreadIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Spam">
            <IconButton aria-label="Spam">
              <ReportOutlinedIcon />
            </IconButton>
          </Tooltip>
        </div>

        <div>
          {" "}
          <Tooltip title="Spam">
            <IconButton aria-label="Spam">
              {mail.isStarred ? (
                <StarRateIcon sx={{ color: "gold" }} />
              ) : (
                <StarBorderOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <div className="viewmailheader">
        <h2>{mail.subject}</h2>
        <h4>{mail.lables}</h4>
      </div>
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
