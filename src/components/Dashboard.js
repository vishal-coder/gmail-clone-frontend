import React, { useEffect } from "react";
import Compose from "./Compose.js";
import Header from "./Header.js";
import LeftSideBar from "./LeftSideBar.js";
import MainBody from "./MainBody.js";
import { useSelector } from "react-redux";

function Dashboard() {
  const { isOpen } = useSelector((state) => state.composeModal);
  console.log("is open in dashboard", isOpen);

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
      {isOpen && <Compose />}
    </>
  );
}

export default Dashboard;
