import React, { useState } from "react";
import "./ServiceList.css";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

const ServiceList = () => {
  const list = [
    {
      priority: "H",
      srno: "SR12345678",
      title: "heat pump",
      site_details: "7 covaburn avenue,hamilton ML3 7TR",
      sr_type: "SR Type",
      time: "10/11/2021 05:00 PM",
      status: "luthus working",
    },
    {
      priority: "H",
      srno: "SR12345678",
      title: "heat pump",
      site_details: "7 covaburn avenue,hamilton ML3 7TR",
      sr_type: "SR Type",
      time: "10/11/2021 05:00 PM",
      status: "luthus working",
    },
    {
      priority: "H",
      srno: "SR12345678",
      title: "heat pump",
      site_details: "7 covaburn avenue,hamilton ML3 7TR",
      sr_type: "SR Type",
      time: "10/11/2021 05:00 PM",
      status: "luthus working",
    },
  ];
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="title">My Service Requests</div>
      <hr className="containerhr" />
      <div className="paper">
        <div className="firstrow">
          <div className="names">Joe Bloggs</div>
          <div style={{ fontSize: "small" }}>Heat Pump Scotland,Glasgow</div>
          <hr className="hrFirst" />
        </div>

        <div className="secondrow">
          <div className="outerbox">
            <div className="squarebox">
              <h1>0</h1>
            </div>
            <div className="second-row-text">New</div>
          </div>
          <div className="outerbox">
            <div className="squarebox">
              <h1>1</h1>
            </div>
            <div className="second-row-text">Luths Working</div>
          </div>
          <div className="outerbox">
            <div className="squarebox">
              <h1>2</h1>
            </div>
            <div className="second-row-text">Need Your Attention</div>
          </div>
          <div className="outerbox">
            <div className="squarebox">
              <h1>3</h1>
            </div>
            <div className="second-row-text">Closed</div>
          </div>
        </div>
        <div className="third-row">
          <div className="search-by">Search By</div>
          <div
            style={{
              width: "95%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <select className=" select-box box1">
              <option>Priority</option>
              <option>one</option>
              <option>one</option>
            </select>
            <input
              className="  select-box box1"
              type={"text"}
              placeholder="Service Request No."
            />
            <input className="  select-box box1" placeholder="Title" />
            <select className="  select-box box1">
              <option>Updated</option>
              <option>one</option>
              <option>one</option>
            </select>
          </div>
        </div>
        <div className="fourth-row">
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>
            Service Requests List
          </div>
          <hr className="hrFirst" />
          <hr className="hrFirstline" />
          <hr className="hrSecondline" />
          <hr className="hrThirdline" />
          <table>
            <thead>
              <tr
                className="theadhr"
                style={{ borderBottom: "1.5px solid #f2f3f2 " }}
              >
                <th>Priority</th>
                <th>SR No.</th>
                <th scope="col">Title</th>
                <th scope="col">Site Details</th>
                <th scope="col">SR Type</th>
                <th scope="col">
                  Last Updated
                  <br />
                  Date & Time
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {list &&
                list.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      style={{ borderBottom: "solid 1px #d3d3d3" }}
                    >
                      <td scope="row">
                        {" "}
                        <div className="roundcircle">H</div>{" "}
                      </td>
                      <td>{item.srno}</td>
                      <td>{item.title}</td>
                      <td>{item.site_details}</td>
                      <td>{item.sr_type}</td>
                      <td>{item.time}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <hr className="hrfourth" />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "15px",
         
          }}
        >
          <Pagination
            className="pagination"
            count={3}
            color="primary"
            variant="outlined "
            page={1}
            onChange={() => {}}
          />
        </div>
        <button className="btnjob" onClick={(e) => navigate("/common/createservice")}>
          Create a Service Request
        </button>
      </div>
    </div>
  );
};

export default ServiceList;
