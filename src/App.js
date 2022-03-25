import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {React,useEffect} from "react";
import Login from "./components/Before Customer Login/Login/Login";
import RequestACustomerAccount from "./components/Before Customer Login/RequestACustomerAccount/RequestACustomerAccount";
import RCA1 from "./components/Before Customer Login/RCA1/RCA1";
import RCA2 from "./components/Before Customer Login/RCA2/RCA2";
import RCA3 from "./components/Before Customer Login/RCA3/RCA3";
import ForgotPassword from "./components/Before Customer Login/ForgotPassword/ForgotPassword";
import OTP from "./components/Before Customer Login/OTP/OTP";
import NewPassword from "./components/Before Customer Login/NewPassword/NewPassword";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useNavigate,Navigate } from "react-router-dom";
import { connect } from "react-redux";
import ServiceList from "./components/After Customer Login/ServiceList/ServiceList";
import CreateList from "./components/After Customer Login/CreateList/CreateList";
import ManageService from "./components/After Customer Login/ManageService/ManageService";


import Common from "./components/common/Common";
import NoPage from "./components/PageNotFound/NoPage";

function App({ name, changeName, addName }) {

  return (
    <div className="App">
      <BrowserRouter>
      <PriorityComponent/>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

function PriorityComponent() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));
  
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={!token?<Login/>:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/signup" element={!token?<RequestACustomerAccount />:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/rca1" element={!token?<RCA1 />:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/rca2" element={!token?<RCA2 />:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/rca3" element={!token?<RCA3 />:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/forgotpassword" element={!token?<ForgotPassword />:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/otp" element={!token?<OTP />:<Navigate to = "/common/servicerequest"/>} />
          <Route path="/newpassword" element={!token?<NewPassword />:<Navigate to = "/common/servicerequest"/>} />

          <Route path="/common" element={token?<Common/>:<Login/>}>
              <Route path="servicerequest" element={<ServiceList />} />
              <Route path="createservice" element={<CreateList />} />
              <Route path="manageservice" element={<ManageService />} />
          </Route>
          <Route path="*" element={<NoPage/>}/>

        </Routes>


    </div>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
