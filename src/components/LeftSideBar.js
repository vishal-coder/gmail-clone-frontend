import CreateIcon from "@mui/icons-material/Create";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openComposeModal } from "../features/composeMailSlice";
import {
  setMailCategory,
  setMailList,
  setMailListLoading,
  setPageToken,
  setResultSizeEstimate,
  setViewMail,
} from "../features/mailListSlice.js";
import { getLabelList } from "../services/LabelService.js";
import { getMailList } from "../services/MailService.js";
import LabelList from "./LabelList.js";
import "./leftsidebar.css";

function LeftSideBar() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { userToken } = useSelector((state) => state.user);
  const [labelList, setLabelList] = useState(null);
  useEffect(() => {
    const getLables = async () => {
      const response = await getLabelList(userToken);
      setLabelList(response.data);
      setLoading(false);
    };
    getLables();
  }, []);

  const [active, setActive] = useState("INBOX");

  const getMailByLabel = async (labelType) => {
    dispatch(setMailListLoading(true));
    dispatch(setViewMail(false));

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
    <div className="leftsidebarwrapper">
      <div className="componsebtnDiv">
        <Button
          className="componsebtn"
          variant="contained"
          size="large"
          startIcon={<CreateIcon fontSize="large" />}
          onClick={() => {
            dispatch(openComposeModal());
          }}
        >
          <span>Compose</span>
        </Button>
      </div>
      <div>
        {!loading ? (
          <>
            <div className="labelListWrapper ">
              {labelList.map((labelData) => (
                <div
                  key={labelData.id}
                  // id={labelData.id}
                  className={`labellistitem ${
                    active == labelData.id && "active"
                  }`}
                  onClick={() => {
                    getMailByLabel(labelData.id);
                  }}
                >
                  <LabelList labelData={labelData} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default LeftSideBar;
