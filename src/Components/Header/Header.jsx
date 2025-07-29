import React from 'react'
import Notification  from  "../../assets/Notification.png";
import Queries  from  "../../assets/Queries.png";
import ChatForm from './ChatForm';
function Header() {
  return (
    <div>
       <div className="dashboard-header">
             <h4>Employe Self Service</h4> 
             <div className="top-right-icons">
             <div> <p>FD00000</p></div> 
               <div> <img src={Notification} alt="" /></div>  
                 {/* <div> <ChatForm/> </div> */}
             </div>
            
          </div>
    </div>
  )
}

export default Header
