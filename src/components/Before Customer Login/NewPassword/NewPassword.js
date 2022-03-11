import React from 'react'
import "./NewPassword.css"

import { useState } from 'react';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    heading:{
      margin:"25px 0px 0px 100px",
      fontSize: "50px",
      fontWeight: "200",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "0.41px",
      textAlign: "left",
      color:" #000",
      display:"block"
    },
    subtitle:{
        margin:"20px 0px 0px 100px",
        fontSize:"17px",
        width:"420px"
    },
    button:{
        textTransform:"none",
        margin:"20px 0px 0px 100px ",
        backgroundColor:"black",
        color:"white",
        width:"170px",
        height:"50px",
        borderRadius:"32.5px",
        "&:hover":{
        textTransform:"none",
         background:"black",
         color:"white"
       } },
    buttons:{
        textTransform:"none",
        margin:"20px 0px 0px 20px ",
        border: "solid 1px #d3d3d3",
        backgroundColor: "#f9f9f9",
        color:" #000",
        width:"150px",
        height:"50px",
        borderRadius:"32.5px",
        "&:hover":{
            textTransform:"none",
          backgroundColor: "#f9f9f9",
          color: "#000"
       } }
 })

 const  pass = {
     newPassword:"",
     confirmPassword:""
 } 

function NewPassword() {
  const classes = useStyles();

  const [password, setPassword] = useState(pass);
  const [showpassword, setShowpassword] = useState({istrue:false,type:"password"})
  const [showpassword1, setShowpassword1] = useState({istrue:false,type:"password"})
  const [visibility, setVisibility] = useState("hidden")
  const [color, setColor] = useState("#a4a4a4")

  const changeHandler = (e) => {
      setPassword(state => ({...state,[e.target.name]:e.target.value}))
      setColor("#a4a4a4")
      setVisibility("hidden")
  }

  const togglePassword = () => {
      if(showpassword.istrue){
          setShowpassword(state => ({...state,istrue:false,type:"password"}))
      }
      else{
          setShowpassword(state => ({...state,istrue:true,type:"text"}))
      }
  }
  const togglePassword1 = () => {
    if(showpassword1.istrue){
        setShowpassword1(state => ({...state,istrue:false,type:"password"}))
    }
    else{
        setShowpassword1(state => ({...state,istrue:true,type:"text"}))
    }
}

  const submitHandler = () => {
      if(password.newPassword.length < 8){
          setColor("red")
      }
      if(password.newPassword != password.confirmPassword){
          setVisibility("");
      }
  }

  return (
    <div>
       <div className='newpassword' >
        <div className='npfirstHalf' >
        <div className ="npHPD"><img src={require("../../../Img/HPD.png")} height="50px" width={"50px"}  /></div>
            
        <h1 className="npdiv1">Create New Password?</h1>   

        <div  style={{margin:"10px 0px 0px 100px",width:"390px",fontWeight:"300",marginTop:"30px"}} >Your new password must be different from the previous used passwords.</div>

       <span className="npspan">Password</span>
       <input type={showpassword.type} value={password.newPassword} onChange={changeHandler} className='nppassword' name="newPassword" />
           <img src={require("../../../Img/icon2.png")}  alt="" className='nppasswordIcon' />
           {
           showpassword.istrue?
           <img src={require("../../../Img/iconEyeOpen.png")}  alt="" className='npeyeIconOpen' onClick={togglePassword}  />:
           <img src={require("../../../Img/icon3.png")}  alt="" className='npeyeIcon' onClick={togglePassword } />
           }
        <span className="npspan1" style={{color:`${color}`}} >Must be atleast 8 characters</span>   

        <span className="npspan">Confirm Password</span>
       <input type={showpassword1.type} value={password.confirmPassword} onChange={changeHandler} className='nppassword' name="confirmPassword" />
           <img src={require("../../../Img/icon2.png")}  alt="" className='nppasswordIcon' />
           {
           showpassword1.istrue?
           <img src={require("../../../Img/iconEyeOpen.png")}  alt="" className='npeyeIconOpen' onClick={togglePassword1}  />:
           <img src={require("../../../Img/icon3.png")}  alt="" className='npeyeIcon' onClick={togglePassword1 } />
           }
        <span style={{visibility:`${visibility}`}} className="npspan2">Both passwords should match</span>  
        <div style={{marginTop:"30px"}} >
        <Button  className={classes.button} onClick={submitHandler}  >Reset Password</Button>
       <Button  className={classes.buttons}   >Back</Button>
       </div>
       <hr className='line' />
        <div className="subtitle" >
            <span>Need more help?</span>
            <span className='learnMore'   >Learn More</span>
        </div>
       </div>

       <div class="npRectangle-side"> <img src={require("../../../Img/forgotpassword.png")} className="npcouplesideImg" /> </div>

       </div>
    
    
    </div>
  )
}

export default NewPassword