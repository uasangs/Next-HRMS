import React from "react";
import "./HomeDashboard.css";

import { FaBirthdayCake, FaCalendarAlt } from "react-icons/fa";
import Arrow  from  "../../assets/Arrow.png";
import Header from "../Header/Header";


const HomeDashboard = () => {
  return (
    <div className="HomeDashboard"> 
    <Header/>
        <h2>Welcome Back</h2>
        <div className="home-checkIn">
            <button>Check In</button>
        </div>
    <div className="widgets-container">
      <div className="widget-column">
         <h3>My Attendance</h3>
        <div className="widget">
         
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Total Hrs</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>9 Jun</td>
                <td>00:00</td>
                <td>00:00</td>
                <td>0:00</td>
                <td className="status ab">AB</td>
              </tr>
              <tr>
                <td>8 Jun</td>
                <td>10:00</td>
                <td>18:45</td>
                <td>8:45</td>
                <td className="status p">P</td>
              </tr>
              <tr>
                <td>7 Jun</td>
                <td>10:00</td>
                <td>02:50</td>
                <td>5:50</td>
                <td className="status hd">HD</td>
              </tr>
              <tr>
                <td>6 Jun</td>
                <td>00:00</td>
                <td>00:00</td>
                <td>0:00</td>
                <td className="status cl">CL</td>
              </tr>
            </tbody>
          </table>
          <div className="calendar-link">
            <FaCalendarAlt className="icon" /> My Attendance Calendar <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
          </div>
        </div>

        <div className="widget link-box">
          Leave Balance <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
        </div>

        <div className="widget birthday-box">
          <FaBirthdayCake className="icon" /> Today's Birthday <span className="count">3</span> <span> <div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div>
          </span>
        </div>
      </div>

      <div className="widget-column">
        <h3>Quick Links</h3>

        <div className="widget holiday-list">
         <div className="Holidays-list-arrowBTN">
          <div>Holidays List </div>
          <div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div>
          </div> 

          <table>
            <tbody>
              <tr>
                <td>15 Aug</td>
                <td>Fri</td>
                <td>Independence Day</td>
              </tr>
              <tr>
                <td>27 Aug</td>
                <td>Wed</td>
                <td>Ganesh Chaturthi</td>
              </tr>
              <tr>
                <td>02 Oct</td>
                <td>Thurs</td>
                <td>Mahatma Gandhi Jayanti</td>
              </tr>
            </tbody>
          </table>
        </div>
<div className="widget link-box"> 
        <div className="widget small-box">
          Leave Request <span className="badge">0</span> <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
        </div>

        <div className="widget small-box">
          <div> 
       <span> Attendance Regularise</span> 
          <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span> 
         
          <span className="small-text">Pending Approval</span>
          <span className="badge">5</span> 
          </div>
        </div>
        </div>

        <div className="widget link-box">
          Company Policy <span><div className="icon-sildebar"> <img src={Arrow} alt="home"  /></div></span>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HomeDashboard;
