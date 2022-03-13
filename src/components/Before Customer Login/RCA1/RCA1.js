import React,{useState} from 'react'
import "./RCA1.css";
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { customerDetailsAction } from '../../../Redux/customerDetails/customerDetails.action';

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
        margin:"30px 0px 0px 100px",
        fontWeight:"600",
        fontSize:"17px"
        
    }   
 })

 const inputnames = {
    fullName:"",
    emailAddress:"",
    password:"",
    mobileNumber:""

 }

function RCA1({customerDetails,customerDetailsAction}) {
    const classes = useStyles();
    const [inputValues, setInputValues] = useState(inputnames)
  

    
 const changeHandler = (e) => {
   e.preventDefault();
  customerDetailsAction({[e.target.name]:e.target.value})
}
    
  return (
    <div>
       <div className='rca1' >
        <div className='rca1firstHalf' >
        <div className ="rca1HPD"><img src={require("../../../Img/HPD.png")} height="50px" width={"50px"}  /></div>
            
        <h1 className='rca1div1' >Request a Customer Account</h1>
        
        <div className='left-bar' ></div>
        <div className="circle"></div>
        <div className='right-bar' ></div>

        <div  style={{margin:"10px 0px 0px 100px",width:"590px",fontWeight:"300",marginTop:"30px"}} >Your Name and Contact Details</div>       
        <form action="">
          <input className='inputfields' type="text" value={customerDetails.name} onChange={changeHandler} name="name" placeholder ="Full Name" />
          <input className='inputfields' type="email" value={customerDetails.email} onChange={changeHandler} name="email" placeholder ="Email Address" />
          <input className='inputfields' type="password" value={customerDetails.password} onChange={changeHandler} name="password" placeholder ="Password" />
          <input className='inputfields' type="number" value={customerDetails.mobile} onChange={changeHandler} name="mobile" placeholder ="Mobile Number" />

        </form>

        <Link to="/rca2"> <button className="continue">Continue</button> </Link>


        </div>   
        <div class="rca1Rectangle-side"> <img src={require("../../../Img/RCA1.png")} className="couplesideImg" /> </div>
    
    
    </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
  customerDetails:state.cdr
  
})

const mapDispatchToProps = dispatch => ({
 customerDetailsAction:keypair => dispatch(customerDetailsAction(keypair)),

})

export default connect(mapStateToProps,mapDispatchToProps)(RCA1);
