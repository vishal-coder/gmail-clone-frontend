import React, { useEffect } from "react";
import Compose from "./Compose.js";
import Header from "./Header.js";
import LeftSideBar from "./LeftSideBar.js";
import MainBody from "./MainBody.js";

function Dashboard() {
  useEffect(() => {
    console.log("onload request made");
  }, []);
  return (
    <>
      <Header />
      <div className="mainDashBoard">
        <LeftSideBar />
        <MainBody />
      </div>
      <Compose />
    </>
  );
}

export default Dashboard;
