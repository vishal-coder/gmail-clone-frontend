import "./App.css";
import Compose from "./components/Compose.js";
import GoogleLogin from "./components/GoogleLogin.js";
import Header from "./components/Header.js";
import LeftSideBar from "./components/LeftSideBar.js";
import MainBody from "./components/MainBody.js";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.js";
// import Dashboard from " ./components/Dashboard.js";
// import Dashboard from " .";

function App() {
  return (
    <div className="App">
      {true ? (
        <GoogleLogin />
      ) : (
        <>
          {/* <Header />
          <div className="mainDashBoard">
            <LeftSideBar />
            <MainBody />
          </div>
          <Compose /> */}
        </>
      )}
      <Routes>
        <Route exact path="/" element={<GoogleLogin />} />
        <Route exact path="/loggedindashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
