import React , {useState} from 'react';
import {Link} from "react-router-dom";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import "./Sidebar.css";

function Sidebar() {
  const [activeTab,setActiveTab] = useState("Home");
  return (
    <>
      <p className="logo">LOGO</p>
      <div className="sidebar">
        <Link to="/add">
            <p 
              className={`${activeTab === "Add"? "active":""}`}
              onClick={() => setActiveTab("Add")}>
              <PeopleAltIcon className='sidebarIcon'/>Add Students
            </p>
        </Link>

        <Link to="/">
          <p 
            className={`${activeTab === "Home"? "active":""}`}
            onClick={() => setActiveTab("Home")}>
            <ManageSearchIcon className='sidebarIcon'/> Manage Students
          </p>
        </Link>
      </div>
    </>
  )
}

export default Sidebar;