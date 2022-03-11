import React, { useState,useEffect } from 'react';
import "./OTP.css"
import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

import OtpInput from 'react-otp-input-rc-17';

import { connect } from 'react-redux';

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
        fontSize:"15px",
        width:"420px"
    },
    button:{
        
        margin:"20px 0px 0px 100px ",
        backgroundColor:"black",
        color:"white",
        width:"150px",
        height:"50px",
        borderRadius:"32.5px",
        textTransform:"none",
        "&:hover":{
         background:"black",
         textTransform:"none",
         color:"white"
       } },
    buttons:{
      textTransform:"none",
        margin:"20px 0px 0px 20px ",
        border: "solid 1px #d3d3d3",
        backgroundColor: "#f9f9f9",
        color:" #000",
        width:"200px",
        height:"50px",
        borderRadius:"32.5px",
        "&:hover":{
          backgroundColor: "#f9f9f9",
          textTransform:"none",
          color: "#000"
       } }
 })

 

function OTP({emailNum}) {
    const classes = useStyles();
    const [otp, setOtp] = useState("")
    const [bgotp, setBgOtp] = useState("1234")
    const [status, setStatus] = useState("")

    const changeHandler = (e) => {
      if(otp === ""){
         setOtp(otp+e)
        }
    /*   if(otp.length === 3){
        console.log(otp)
        return
      } */
      setOtp(e)
      
      }
      useEffect(() => {
        if(otp.length<4){
          setStatus("")
        }
        if(otp.length===4){
          if(otp == bgotp){
            setStatus(true);
          }
          else{
            setStatus(false)
          }
        }
      }, [otp])
      
    console.log(status)  
  return (
    <div>
        <div className='otp' >
        <div className='otpfirstHalf' >
        <div className ="otpHPD"><img src={require("../../../Img/HPD.png")} height="50px" width={"50px"}  /></div>
            
        <h1 className="otpdiv1"  >Check your Email</h1>   

        <div  style={{margin:"10px 0px 0px 100px",width:"590px",fontWeight:"300",marginTop:"30px"}} > Enter the code we just sent to {emailNum}</div> 
        <div className="otpdiv">
       <OtpInput  value={otp} onChange= {changeHandler} focusStyle   shouldAutoFocus isInputNum separator={<span> </span>} inputStyle={`otpInput ${status===false?"ootp":""}`}  />
       </div>

       <div className="span" style={{display:`${status===true?"inline-block":"none"}`}}>
       <img src={require("../../../Img/greentick.png")} className="greentick"  />
       <span>Verification Compete</span>
       </div>

       <div className="span" style={{display:`${status===false?"inline-block":"none"}`}}>
       <img src={require("../../../Img/cross.png")} className="greentick"  />
       <span>Invalid Code</span>
       </div>

       <div style={{marginTop:"20px"}} >
       <Button  className={classes.button}   >Back</Button>
       <Button  className={classes.buttons}   >Resend Code</Button>
       </div>
       
        </div>

        <div class="otpRectangle-side"> <img src={require("../../../Img/OTP.png")} className="otpcouplesideImg" /> </div>

        </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
    emailNum:state.fp.emailNum
})

export default connect(mapStateToProps)(OTP);