import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard, MdOutlineRealEstateAgent } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GiStable, GiScrollQuill } from "react-icons/gi";
import { IoIosLink } from "react-icons/io";
import { LuScrollText } from "react-icons/lu";

import '../App.css';

function SidebarNav() {
    return (
        <div className='sidenav'>
            <Sidebar backgroundColor="rgba(0, 0, 0, 0.0)">
                <Menu className="menu">
                    <MenuItem style={{ color: '#FFFFFF', }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'} className="menu-item" icon={<IoIosLink />} component={<a href="redm://connect/play.calicocountyrp.com:30140" />}>
                        Connect
                    </MenuItem>
                    <MenuItem style={{ color: '#FFFFFF', }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'} className="menu-item" icon={<MdOutlineSpaceDashboard />} component={<Link to="/pages/dashboard" />}>
                        Dashboard
                    </MenuItem>
                    <MenuItem style={{ color: '#FFFFFF', }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'} className="menu-item" icon={<BsPeople />} component={<Link to="/pages/character" />}>
                        Characters
                    </MenuItem>
                    <MenuItem style={{ color: '#FFFFFF', }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'} className="menu-item" icon={<GiStable />} component={<Link to="/pages/stable" />}>
                        Stable
                    </MenuItem>
                    <SubMenu style={{ color: '#FFFFFF', }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'} label="Real Estate" icon={<MdOutlineRealEstateAgent />}>
                        <MenuItem className="menu-item" component={<Link to="/pages/businesses" />}>Businesses</MenuItem>
                        <MenuItem className="menu-item" component={<Link to="/pages/properties" />}>Properties</MenuItem>
                    </SubMenu>
                    <SubMenu style={{ color: '#FFFFFF', }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0)'} label="Applications" icon={<GiScrollQuill />}>
                        <MenuItem className="menu-item" component={<Link to="/pages/applications/staff" />}>Staff Application</MenuItem>
                        <MenuItem className="menu-item" component={<Link to="/pages/applications/developer" />}>Developer Application</MenuItem>
                        <MenuItem className="menu-item" component={<Link to="/pages/applications/tester" />}>Dev Tester Application</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SidebarNav;