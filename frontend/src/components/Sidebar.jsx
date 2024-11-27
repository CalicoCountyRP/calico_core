import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import '../App.css';

function SidebarNav() {
    return (
        <div className='sidenav'>
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/pages/dashboard" />}>Dashboard</MenuItem>
                    <MenuItem component={<Link to="/pages/character" />}>Characters</MenuItem>
                    <MenuItem component={<Link to="/pages/stable" />}>Stable</MenuItem>
                    <SubMenu label="Real Estate" >
                        <MenuItem component={<Link to="/pages/businesses" />}>Businesses</MenuItem>
                        <MenuItem component={<Link to="/pages/properties" />}>Properties</MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to="/pages/government" />}>Government</MenuItem>
                    <SubMenu label="Applications" >
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