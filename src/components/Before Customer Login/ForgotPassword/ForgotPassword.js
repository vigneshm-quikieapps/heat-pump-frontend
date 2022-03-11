import React from 'react'
import "./ForgotPassword.css"

import { Link } from 'react-router-dom';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { changeEmailNum } from '../../../Redux/emailNum/emailNum.action';
import { connect } from 'react-redux';

const useStyles = makeStyles({
    heading:{
      margin:"25px 0px 0px 100px",
      fontSize: "50px",
      fontWeight: "600",
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
        width:"420px",
        fontWeight:"600"
    },
    button:{
        
        margin:"20px 0px 0px 100px ",
        backgroundColor:"black",
        color:"white",
        width:"180px",
        height:"50px",
        borderRadius:"32.5px",
        textTransform:"none",
        "&:hover":{
          textTransform:"none",
         background:"black",
         color:"white"
       } },
    buttons:{
        
        margin:"20px 0px 0px 20px ",
        border: "solid 1px #d3d3d3",
        backgroundColor: "#f9f9f9",
        color:" #000",
        width:"200px",
        height:"50px",
        textTransform:"none",
        borderRadius:"32.5px",
        "&:hover":{
          textTransform:"none",
          backgroundColor: "#f9f9f9",
          color: "#000"
       } }
 })

function ForgotPassword({emailNum,changeEmailNum}) {
    const classes = useStyles();

   
  return (
    <div>
         <div className='forgotpassword' >
        <div className='fpfirstHalf' >
        <div className ="fpHPD"><img src={require("../../../Img/HPD.png")} height="50px" width={"50px"}  /></div>
            
        <h1 className="fpdiv1" >Forgot Password?</h1>   

        <div  style={{margin:"10px 0px 0px 100px",width:"590px",fontWeight:"300",marginTop:"30px"}} >No worries, we’ll send you reset instructions. Enter any email or phone number with country code you've used before and we'll try to find your account.</div>

       <input className='fpinputfield' type="text" value={emailNum} onChange={(e) => changeEmailNum(e.target.value)} name="emailNum" placeholder ="Email or Number" />
        
       <div>
       <Link to="/otp" ><Button className={classes.button} >Reset Password</Button></Link>
       <Button className={classes.buttons} style={{paddingLeft:"50px",position:"relative"}} >Back to Login</Button>
       <ArrowBackIosNewIcon style={{position:"relative",right:"190px",top:"15px",fontSize:"medium"}} />
       </div>

        </div>
          
        <div class="fpRectangle-side"> <img src={require("../../../Img/forgotpassword.png")} className="fpcouplesideImg" /> </div>
         
         

        </div> 
    </div>
  )
}


const mapStateToProps = (state) => ({
    emailNum:state.fp.emailNum
})

const mapDispatchToProps = dispatch => ({
changeEmailNum:emailNum => dispatch(changeEmailNum(emailNum)),


})

export default connect(mapStateToProps,mapDispatchToProps)(ForgotPassword);