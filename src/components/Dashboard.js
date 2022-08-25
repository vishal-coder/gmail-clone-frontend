import React, { useEffect } from "react";
import Compose from "./Compose.js";
import Header from "./Header.js";
import LeftSideBar from "./LeftSideBar.js";
import MainBody from "./MainBody.js";
import { useDispatch, useSelector } from "react-redux";
import ViewMail from "./ViewMail.js";

function Dashboard() {
  const { isOpen } = useSelector((state) => state.composeModal);
  console.log("is open in dashboard", isOpen);
  const dispatch = useDispatch();
  const { viewMail } = useSelector((state) => state.mails);

  useEffect(() => {}, []);
  return (
    <>
      <Header />
      <div className="mainDashBoard">
        <LeftSideBar />
        {!viewMail ? <MainBody /> : <ViewMail />}
      </div>
      {isOpen && <Compose />}
    </>
  );
}

export default Dashboard;
