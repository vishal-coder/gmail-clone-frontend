import React from "react";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";

function EmailType() {
  return (
    <div className="emailtype">
      <div className="emailtypeitem">
        <InboxOutlinedIcon />
        <span>Primary</span>
      </div>
      <div className="emailtypeitem">
        <PeopleAltOutlinedIcon />
        <span>Social</span>
      </div>
      <div className="emailtypeitem">
        <LocalOfferOutlinedIcon />
        <span>Promotion</span>
      </div>
    </div>
  );
}

export default EmailType;
