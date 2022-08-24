import React, { useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import { getMailList } from "../services/MailService.js";
import LoadingSpinner from "./LoadingSpinner.js";
import { setMailListLoading, setMailList } from "../features/mailListSlice.js";
import { useDispatch, useSelector } from "react-redux";
import StarRateIcon from "@mui/icons-material/StarRate";

function EmailList() {
  const { mailListLoading } = useSelector((state) => state.mails);
  const { mailList } = useSelector((state) => state.mails);
  console.log("mailListLoading", mailListLoading);
  console.log(mailList);
  const dispatch = useDispatch();
  useEffect(() => {
    const getMails = async () => {
      const token = localStorage.getItem("token");
      const mails = await getMailList(token, {
        mailOption: {
          userId: "me",
          labelIds: "INBOX",
          format: "metadata",
        },
      });
      console.log("mailList in email list is", mails);
      dispatch(setMailListLoading(false));
      dispatch(setMailList(mails.data));
    };
    getMails();
  }, []);
  console.log(mailListLoading);
  console.log(mailList);

  return (
    <div className="emaillist">
      {!mailListLoading ? (
        <>
          {mailList.map((mail) => (
            <div className="emailitem">
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
          {/* <div className="emailitem">
            <Checkbox inputProps={{ "aria-label": "controlled" }} />
            <StarBorderOutlinedIcon />
            <div className="emailSender">sender</div>
            <div className="emailBody">Body of the mail</div>
            <div className="emailDate">18 Aug</div>
          </div>{" "} */}
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
