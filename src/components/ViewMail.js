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
import { setViewMail } from "../features/mailListSlice";
import { useDispatch, useSelector } from "react-redux";
import { Buffer } from "buffer";
import parse from "html-react-parser";
import Tooltip from "@mui/material/Tooltip";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarRateIcon from "@mui/icons-material/StarRate";

function ViewMail() {
  const { mailList } = useSelector((state) => state.mails);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const mail = mailList.find((item) => item.id === params.id);

  const sanitizedBody = mail.mailbody.replace(/hidden/gi, "");

  let mailpart = parse(sanitizedBody);

  const MailComponent = () => {
    return <div>{mailpart}</div>;
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
            <IconButton aria-label="Delete">
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
