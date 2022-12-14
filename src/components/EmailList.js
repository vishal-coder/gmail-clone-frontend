import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { getMailList } from "../services/MailService.js";
import LoadingSpinner from "./LoadingSpinner.js";
import {
  setMailListLoading,
  setMailList,
  setViewMail,
  setLoadInbox,
  setPageToken,
  setResultSizeEstimate,
} from "../features/mailListSlice.js";
import { useDispatch, useSelector } from "react-redux";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { updateMailLabels } from "../services/LabelService.js";

function EmailList() {
  const { mailListLoading } = useSelector((state) => state.mails);
  const { mailList } = useSelector((state) => state.mails);
  const { viewMail } = useSelector((state) => state.mails);
  const { loadInbox } = useSelector((state) => state.mails);
  const { mailCategory } = useSelector((state) => state.mails);

  const dispatch = useDispatch();
  useEffect(() => {
    const getMails = async () => {
      const token = localStorage.getItem("token");
      const mails = await getMailList(token, {
        mailOption: {
          userId: "me",
          labelIds: mailCategory,
          format: "metadata",
        },
      });

      dispatch(setMailListLoading(false));
      dispatch(setMailList(mails.data));
      dispatch(setLoadInbox(false));
      dispatch(setPageToken(mails.pageTokenInfo.pageToken));
      dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
    };
    if (loadInbox) {
      getMails();
    }
  }, []);

  const navigate = useNavigate();
  const viewMailDetails = (id) => {
    dispatch(setViewMail(true));
    const token = localStorage.getItem("token");
    const values = {
      id: id,
      addLabelIds: null,
      removeLabelIds: "UNREAD",
    };
    updateMailLabels(token, values);

    navigate(`/loggedindashboard/viewMail/${id}`);
  };

  const element = <h3>nothing to show</h3>;
  const nonEmptyMailList = mailList.filter(Boolean);

  return (
    <div className="emaillist">
      {!mailListLoading ? (
        <>
          {!(nonEmptyMailList != 0 && nonEmptyMailList != null) ? (
            element
          ) : (
            <></>
          )}

          {nonEmptyMailList.map((mail) => (
            <div
              className={`emailitem ${
                mail.lables.includes("UNREAD") && "unread"
              }`}
              key={mail.id}
              onClick={() => viewMailDetails(mail.id)}
            >
              <Checkbox inputProps={{ "aria-label": "controlled" }} />
              {mail.isStarred ? (
                <StarRateIcon sx={{ color: "gold" }} />
              ) : (
                <StarBorderOutlinedIcon />
              )}
              <div className="emailSender">{mail.from}</div>
              <div className="emailBody">{mail.snippet}</div>
              <div className="emailDate">{mail.date}</div>
            </div>
          ))}
        </>
      ) : (
        <>
          <h3>getting your mails</h3>
          <LoadingSpinner />
        </>
      )}
    </div>
  );
}

export default EmailList;
