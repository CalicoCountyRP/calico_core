import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard, MdOutlineRealEstateAgent } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GiStable, GiScrollQuill } from "react-icons/gi";
import { LuScrollText } from "react-icons/lu";

import '../App.css';

function SidebarNav() {
    return (
        <div className='sidenav'>
            <Sidebar>
                <Menu className="menu">
                    <MenuItem icon={<MdOutlineSpaceDashboard />} component={<Link to="/pages/dashboard" />}>
                        Dashboard
                    </MenuItem>
                    <MenuItem icon={<BsPeople />} component={<Link to="/pages/character" />}>
                        Characters
                    </MenuItem>
                    <MenuItem icon={<GiStable />} component={<Link to="/pages/stable" />}>
                        Stable
                    </MenuItem>
                    <SubMenu label="Real Estate" icon={<MdOutlineRealEstateAgent />}>
                        <MenuItem component={<Link to="/pages/businesses" />}>Businesses</MenuItem>
                        <MenuItem component={<Link to="/pages/properties" />}>Properties</MenuItem>
                    </SubMenu>
                    <MenuItem icon={<LuScrollText />} component={<Link to="/pages/government" />}>
                        Government
                    </MenuItem>
                    <SubMenu label="Applications" icon={<GiScrollQuill />}>
                        <MenuItem component={<Link to="/pages/applications/staff" />}>Staff Application</MenuItem>
                        <MenuItem component={<Link to="/pages/applications/developer" />}>Developer Application</MenuItem>
                        <MenuItem component={<Link to="/pages/applications/tester" />}>Dev Tester Application</MenuItem>
                    </SubMenu>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SidebarNav;