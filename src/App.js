import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/Before Customer Login/Login/Login";
import RequestACustomerAccount from "./components/Before Customer Login/RequestACustomerAccount/RequestACustomerAccount";
import RCA1 from "./components/Before Customer Login/RCA1/RCA1";
import RCA2 from "./components/Before Customer Login/RCA2/RCA2";
import RCA3 from "./components/Before Customer Login/RCA3/RCA3";
import ForgotPassword from "./components/Before Customer Login/ForgotPassword/ForgotPassword";
import OTP from "./components/Before Customer Login/OTP/OTP";
import NewPassword from "./components/Before Customer Login/NewPassword/NewPassword";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import ServiceList from "./components/After Customer Login/ServiceList/ServiceList";
import CreateList from "./components/After Customer Login/CreateList/CreateList";
import CreateListSubmitted from "./components/After Customer Login/CreateListSubmitted/CreateListSubmitted";

import AccountRequest from "./components/admin/account requests/AccountRequest";

import Common from "./components/common/Common";


function App({ name, changeName, addName }) {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<RequestACustomerAccount />} />
          <Route path="/rca1" element={<RCA1 />} />
          <Route path="/rca2" element={<RCA2 />} />
          <Route path="/rca3" element={<RCA3 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/newpassword" element={<NewPassword />} />
          <Route path="/common" element={<Common />}>
            <Route path="servicerequest" element={<ServiceList />} />
            <Route path="createservice" element={<CreateList />} />
            <Route path="requestsubmitted" element={<CreateListSubmitted />} />
            <Route path="accountrequest" element={<AccountRequest />} />
          </Route>
        </Routes>
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

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
