import React from 'react'
import { Link } from 'react-router-dom'
import "./CreateListSubmitted.css"

function CreateListSubmitted() {
  
  return (
    <div>
        <div className="clscontainer">
         <div className="clstitle">Create a Service Requests</div>
         <hr className="clscontainerhr"/>
         <div className="clspaper">
         <div className="clsfirstrow">
          <div className="clsnames">Joe Bloggs</div>
          <div style={{ fontSize: "30px",fontWeight:"300" }}>Heat Pump Scotland,Glasgow</div>
          <hr className="clshrFirst"/>

          <div className="clstext" >
          Your enquiry submission is successful. Ref: SR12345678. You can track the status of your service request using <Link to="/common/servicerequest" className="clsspan" > <span >My Service Requests</span></Link>
          </div>
          </div>
        </div>
         
        <div className="clscontrol">
         </div>
         </div>
        
        
    </div>
  )
}

export default CreateListSubmitted