import React,{useState} from 'react'
import "./ManageServiceRequest.css"
function ManageServiceRequest() {

    const [summary, setSummary] = useState({
        priority:"2",
        status:"Luths Working",
        lastUpdated:"25/01/2022 10:00 AM",
        created:"24/01/2022 10:00 AM",
        jobReference:"JR12345678",
        site:"29 Windyridge Hamilton,ML3 7PS"
    })

    const [files, setFiles] = useState(["Attachment 1.pdf","Attachment 2.pdf","Attachment 3.pdf"]);
  return (
    <div>
        <div className="msrcontainer">
      <div className="msrtitle">Manage Service Request</div>
      <hr className="msrcontainerhr" />
      <div className="msrpaper">
             <div className="msrgrid1">
                 <div className="msrtitle1">Service Request Summary</div>
                 <hr className='msrhr1' />
                 <div className="displaygrid">
                     <div className="displaygrid1">Priority</div>
                     <div className="displaygrid1">{summary.priority}</div>
                     <div className="displaygrid1">Status</div>
                     <div className="displaygrid1">{summary.status}</div>
                     <div className="displaygrid1">Last Updated</div>
                     <div className="displaygrid1">{summary.lastUpdated}</div>
                     <div className="displaygrid1">Created</div>
                     <div className="displaygrid1">{summary.created}</div>
                     <div className="displaygrid1">Job Reference</div>
                     <div className="displaygrid1">{summary.jobReference}</div>
                     <div className="displaygrid1">Site</div>
                     <div className="displaygrid1">{summary.site}</div>
                 </div>
                 <div className="msrtitle2">Attachments</div>
                 <hr className='msrhr1' />
                 {files.map(attachmentname =>(
                 <div className="msrattachment">
                     <img src={require("../../../Img/attachIcon1.png")} className="msrattachIcon" />
                      <div className='div-name' >{attachmentname}</div>
                     <img src={require("../../../Img/cross1.png")} className="msrcross1" />
                 </div>))}
             </div>
             <div className="msrgrid2">
             <div className="msrtitle3">SR-1-Clarify Heat Pump Size</div>
             <span className='msrspan1' >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magni ullam facilis nihil cum ipsam impedit officiis, nobis molestiae minus est doloribus maiores reiciendis corporis neque nesciunt illo? Deleniti fuga deserunt, dolor</span>
             <div  style={{marginTop:"80px" }} >
                 <button className='msrbutton1' >Add Update</button>
                 <button className='msrbutton2' >Add Attachments</button>
                 <button className='msrbutton3' >Close SR</button>
             </div>
             </div>
             <div className="msrgrid3">
                <div className="msrupdatesgrid">
                     <div className="image">
                     <img src={require("../../../Img/customerIcon.png")} className="msrCommonIcon" />
                     </div>
                     <div>
                     <span className="msrspan21" >Update from customer</span>
                     <span className="msrspan3" >   25/01/2022 10:00 AM</span>
                     <div className='msrdiv3' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus rerum eius, facilis assumenda velit, fugit consectetur animi veritatis explicabo ab saepe minus</div>
                     </div>
                     
                </div>
                <hr className='msrhr1' />
                <div className="msrupdatesgrid">
                     <div className="image">
                     <img src={require("../../../Img/customerIcon.png")} className="msrCommonIcon" />
                     </div>
                     <div>
                     <span className="msrspan21" >Update from customer</span>
                     <span className="msrspan3" >   25/01/2022 10:00 AM</span>
                     <div className='msrdiv3' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus rerum eius, facilis assumenda velit, fugit consectetur animi veritatis explicabo ab saepe minus</div>
                     </div>
                     
                </div>
                <hr className='msrhr1' />
                <div className="msrupdatesgrid">
                     <div className="image">
                     <img src={require("../../../Img/customerIcon.png")} className="msrCommonIcon" />
                     </div>
                     <div>
                     <span className="msrspan21" >Update from customer</span>
                     <span className="msrspan3" >   25/01/2022 10:00 AM</span>
                     <div className='msrdiv3' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus rerum eius, facilis assumenda velit, fugit consectetur animi veritatis explicabo ab saepe minus</div>
                     </div>
                     
                </div>
                <hr className='msrhr1' />
                <div className="msrupdatesgrid">
                     <div className="image">
                     <img src={require("../../../Img/customerIcon.png")} className="msrCommonIcon" />
                     </div>
                     <div>
                     <span className="msrspan21" >Update from customer</span>
                     <span className="msrspan3" >   25/01/2022 10:00 AM</span>
                     <div className='msrdiv3' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium ducimus rerum eius, facilis assumenda velit, fugit consectetur animi veritatis explicabo ab saepe minus</div>
                     </div>
                     
                </div>
                <hr className='msrhr1' />
             </div>

       </div>
       </div>   
    </div>
  )
}

export default ManageServiceRequest