import React, { useState } from "react";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useDispatch } from "react-redux";
import { openComposeModal } from "../features/composeMailSlice";
import { getLabelList } from "../services/LabelService.js";
import {
  setMailCategory,
  setMailList,
  setMailListLoading,
  setPageToken,
  setResultSizeEstimate,
} from "../features/mailListSlice.js";
import { getMailList } from "../services/MailService.js";

function EmailType() {
  const [active, setActive] = useState("INBOX");
  const dispatch = useDispatch();
  const getMailByLabel = async (labelType) => {
    dispatch(setMailListLoading(true));
    setActive(labelType);
    const token = localStorage.getItem("token");
    const mails = await getMailList(token, {
      mailOption: {
        userId: "me",
        labelIds: labelType,
        format: "metadata",
      },
    });
    dispatch(setMailCategory(labelType));
    dispatch(setMailList(mails.data));
    dispatch(setMailListLoading(false));
    dispatch(setPageToken(mails.pageTokenInfo.pageToken));
    dispatch(setResultSizeEstimate(mails.pageTokenInfo.resultSizeEstimate));
  };
  return (
    <div className="emailtype">
      <div
        className={`emailtypeitem ${active == "INBOX" && "activeEmailType"}`}
        onClick={() => {
          getMailByLabel("INBOX");
        }}
      >
        <InboxOutlinedIcon />
        <span>Primary</span>
      </div>
      <div
        className={`emailtypeitem ${
          active == "CATEGORY_SOCIAL" && "activeEmailType"
        }`}
        onClick={() => {
          getMailByLabel("CATEGORY_SOCIAL");
        }}
      >
        <PeopleAltOutlinedIcon />
        <span>Social</span>
      </div>
      <div
        className={`emailtypeitem ${
          active == "CATEGORY_PROMOTIONS" && "activeEmailType"
        }`}
        onClick={() => {
          getMailByLabel("CATEGORY_PROMOTIONS");
        }}
      >
        <LocalOfferOutlinedIcon />
        <span>Promotion</span>
      </div>
    </div>
  );
}

export default EmailType;
