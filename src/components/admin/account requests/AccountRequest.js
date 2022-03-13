import React from 'react';
import './AccountRequest.css';
import { Pagination } from '@mui/material';

const AccountRequest = () => {
    const list = [
        {
          customer_name: "Joe Bloggs",
          mobile_no: "9787668994",
          email: "joe@gmail.com",
          business_name: "Heat Pump Scotland,Glasgow",
          time: "10/11/2021 05:00 PM",
          status: "In Progress",
        },
        {
            customer_name: "Joe Bloggs",
          mobile_no: "9787668994",
          email: "joe@gmail.com",
          business_name: "Heat Pump Scotland,Glasgow",
          time: "10/11/2021 05:00 PM",
          status: "In Progress",
        },
        {
            customer_name: "Joe Bloggs",
          mobile_no: "9787668994",
          email: "joe@gmail.com",
          business_name: "Heat Pump Scotland,Glasgow",
          time: "10/11/2021 05:00 PM",
          status: "In Progress",
        }
      ];
  return (
    <div className="container">
      <div className="title">Customer Account Requests</div>
      <hr className="containerhr"/>
      <div className="paper">
        <div className="secondrow">
          <div className="outerbox">
            <div className="squarebox">
              <h1>1</h1>
            </div>
            <div className="second-row-text" >
              New
            </div>
          </div>
          <div className="outerbox">
            <div className="squarebox">
              <h1>1</h1>
            </div>
            <div className="second-row-text">Inprogress</div>
          </div>
          <div className="outerbox">
            <div className="squarebox">
              <h1>1</h1>
            </div>
            <div className="second-row-text">Active</div>
          </div>
        </div>
        <div className="third-row">
          <div className="search-by">Search By</div>
          <div
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between"
            }}
          >
            <select className="select-box box1" placeholder="Status">
              <option>New</option>
              <option>Inprogress</option>
              <option>Active</option>
            </select>
            <input
              className="select-box box1"
              value={""}
              placeholder="Mobile No."
            />
            <input className="select-box box1" value={""} placeholder="Business Name" />
            
          </div>
        </div>
        <div className="fourth-row">
          <div style={{fontSize:"24px",fontWeight:"bold"}}>Customer Account Requests List</div>
          <hr className="hrFirst"/>
          <table>
            <thead className="thead">
              <tr className="theadhr" style={{borderBottom: "1.5px solid #f2f3f2 "}} >
                <th  >Customer Name</th>
                <th>Mobile Number</th>
                <th scope="col">Email</th>
                <th scope="col">Business Name</th>
                <th scope="col">Submitted Date Time</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {list &&
                list.map((item, index) => {
                  return (
                    <tr key={index} style={{borderBottom: "solid 1px #d3d3d3;"}} >
                      <td scope="row"> {item.customer_name}</td>
                      <td>{item.mobile_no}</td>
                      <td>{item.email}</td>
                      <td>{item.business_name}</td>
                      <td>{item.time}</td>
                      <td>{item.status}</td>
                    </tr>
                    
                  );
                })}
            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "center",marginTop:"15px" }}>
          <Pagination className="pagination" count={3} color="primary"  variant="outlined "page={1} onChange={() => {}} />
        </div>
      </div>
    </div>
  )
}

export default AccountRequest