import logo from './logo.svg';
import './App.css';


import Login from './components/Before Customer Login/Login/Login';
import RequestACustomerAccount from './components/Before Customer Login/RequestACustomerAccount/RequestACustomerAccount';
import RCA1 from './components/Before Customer Login/RCA1/RCA1';
import RCA2 from './components/Before Customer Login/RCA2/RCA2';
import RCA3 from './components/Before Customer Login/RCA3/RCA3';
import ForgotPassword from './components/Before Customer Login/ForgotPassword/ForgotPassword';
import OTP from './components/Before Customer Login/OTP/OTP';
import NewPassword from './components/Before Customer Login/NewPassword/NewPassword';

import {BrowserRouter,Routes,Route} from "react-router-dom";
import { connect } from 'react-redux';
import { changeName } from './Redux/name/name.action';
import {addName} from "./Redux/name/name.action"
import Common from './components/common/Common';


function App({name,changeName,addName}) {
  return (
    <div className="App">
      <BrowserRouter>
         <Routes>
         <Route path = "/" element={<Login/>} />
         <Route path='/signup' element={<RequestACustomerAccount/>}/>
         <Route path='/rca1' element={<RCA1/>}/>   
         <Route path='/rca2' element={<RCA2/>}/>    
         <Route path='/rca3' element={<RCA3/>}/> 
         <Route path='/forgotpassword' element={<ForgotPassword/>}/>
         <Route path='/otp' element={<OTP/>}/>
         <Route path='/newpassword' element={<NewPassword/>}/>
         <Route path='/common' element={<Common/>}/>
         </Routes>
      </BrowserRouter>
      {/* {name}
      <button onClick={() => changeName("navin") } >Change Name</button>
      <button onClick={() => addName("Kandukuri") } >Add Name</button> */}
    </div>
  );
}


const mapStateToProps = (state) => ({
    name:state.name.presentName
    
})

const mapDispatchToProps = dispatch => ({
changeName:name => dispatch(changeName(name)),
addName:name => dispatch(addName(name))

})

export default connect(mapStateToProps,mapDispatchToProps)(App);