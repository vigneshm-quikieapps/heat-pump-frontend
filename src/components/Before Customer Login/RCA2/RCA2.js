import "./RCA2.css"
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core';
import { Typography,Button } from '@material-ui/core';
import { width } from "@mui/system";
import Radio from '@mui/material/Radio';

import { Link, Navigate } from "react-router-dom";
import {useNavigate} from "react-router-dom";


const useStyles = makeStyles({
    heading:{
      margin:"0px 0px 0px 100px",
      fontSize: "50px",
      fontWeight: "200",
      fontStretch: "normal",
      fontStyle: "normal",
      lineHeight: "normal",
      letterSpacing: "0.41px",
      textAlign: "left",
      color:" #000",
      display:"block",
      fontWeight:"600"
    },
    subtitle:{
        fontSize: "15px",
        fontWeight: "300",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "normal",
        color: "rgb(59,59,59)",
        letterSpacing: "0.03px",
        margin:"25px 0px 0px 100px",
        width:"450px",
        fontWeight:"600",
        fontSize:"17px"
    },
    radio:{
    
        height:"20px",
        width:"20px"
    },
    button:{
       
        left:"100px",
        display:"block",
        backgroundColor:"black",
        color:"white",
        width:"110px",
        height:"40px",
        marginTop:"10px",
        borderRadius:"32.5px",
        "&:hover":{
         background:"black",
         color:"white"
        }
    }
})

const business = {
    registeredName:"",
    tradeName:"",
    type:""
}

const address = {
   postcode:"",
   startAddress:"",
   line1:"",
   line2:"",
   city:""
}

function RCA2() {
    const [inputBusiness, setInputBusiness] = useState(business);
    const [inputAddress, setInputAddress] = useState(address);
    const [checked, setChecked] = useState(false)

    const navigate = useNavigate();
   

    const changeHandler = (e) => {
        e.preventDefault();
        setInputBusiness({...inputBusiness,[e.target.name]:e.target.value})
     }
    
     const changeHandler1 = (e) => {
        e.preventDefault();
        setInputAddress({...inputAddress,[e.target.name]:e.target.value})
     } 

 /*     const verify = () => (
        inputBusiness.registeredName ==="" ? "" : navigate("/rca3")
   
     ) */
  
  
        const classes = useStyles();
  return (
      
    <div>
       <div className="rca2">
           <div className="rca2firstHalf">
           <div className ="rca2HPD"><img src={require("../../../Img/HPD.png")} height="50px" width={"50px"}  /></div>
           <h1 className="rca2div1"  >Request a Customer Account</h1>
               
           <div className='rca2left-bar' ></div>
           <div className="rca2circle"></div>
           <div className='rca2right-bar' ></div>

           <Typography variant='h6' className={classes.subtitle}   >Your Business Details</Typography>
            
            <form action="">
           <input required className='rca2inputfields top' type="text" value={inputBusiness.registeredName} onChange={changeHandler} name="registeredName" placeholder ="Business Registered Name*" />
           <input required className='rca2inputfields' type="text" value={inputBusiness.tradeName} onChange={changeHandler} name="tradeName" placeholder ="Business Trade Name*" />
           <input required className='rca2inputfields' type="text" value={inputBusiness.type} onChange={changeHandler} name="type" placeholder ="Business Type*" />

          <div  className={classes.subtitle} >
              <Typography variant="h6" style={{display:"inline-block",fontSize:"15px",fontWeight:"600"}}  >Address</Typography>
              <div className="right" style={{display:"inline-block",float:"right"}} >
              <Typography variant="h6" style={{display:"inline-block",fontSize:"15px",marginRight:"10px",fontWeight:"600"}} >Enter Address manually</Typography>
              <Radio type="radio" name="radio" className={classes.radio} checked={checked} onClick={() =>{ checked? setChecked(false):setChecked(true)}} />
              </div>
          </div>
   
           <input required style={{display:`${checked?"none":""}`}} className='rca2inputfields top' type="number" value={inputAddress.postcode} onChange={changeHandler1} name="postcode" placeholder ="Postcode*" />
           <input required className='rca2inputfields' type="text" value={inputAddress.startAddress} onChange={changeHandler1} name="startAddress" placeholder ="Start typing address*" />
           <input required className='rca2inputfields' type="text" value={inputAddress.line1} onChange={changeHandler1} name="line1" placeholder ="Address line 1*" />
           <input required className='rca2inputfields' type="text" value={inputAddress.line2} onChange={changeHandler1} name="line2" placeholder ="Address line 2*" />
           <input required className='rca2inputfields' type="text" value={inputAddress.city} onChange={changeHandler1} name="city" placeholder ="City/Town*" />
           <input required style={{display:`${checked?"":"none"}`}} value={inputAddress.postcode} className='rca2inputfields top' type="number" onChange={changeHandler1} name="postcode" placeholder ="Postcode*" />
          
          <Button type="submit" className={classes.button} onClick={()=>  (inputBusiness.registeredName ==="" || inputBusiness.tradeName==="")?"": navigate("/rca3")} >Submit</Button>

          </form>
          </div>
          
          <div class="rca2Rectangle-side"> <img src={require("../../../Img/RCA2.png")} className="rca2couplesideImg" /> </div>

           
           
        
        
        
        
        
        
        </div>
    </div>
  )
}

export default RCA2