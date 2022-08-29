import React from "react";
import { useSelector } from "react-redux";
import Compose from "./Compose.js";
import Header from "./Header.js";
import LeftSideBar from "./LeftSideBar.js";
import MainBody from "./MainBody.js";
import ViewMail from "./ViewMail.js";

function Dashboard() {
  const { isOpen } = useSelector((state) => state.composeModal);
  const { viewMail } = useSelector((state) => state.mails);

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
