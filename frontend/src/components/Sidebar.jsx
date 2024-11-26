import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import '../App.css';

function SidebarNav() {
    return (
        <div className='sidenav'>
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/dashboard" />}>Dashboard</MenuItem>
                    <MenuItem component={<Link to="/character" />}>Characters</MenuItem>
                    <MenuItem component={<Link to="/stable" />}>Stable</MenuItem>
                    <SubMenu label="Real Estate">
                        <MenuItem component={<Link to="/businesses" />}>Businesses</MenuItem>
                        <MenuItem component={<Link to="/properties" />}>Properties</MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to="/government" />}>Government</MenuItem>
                </Menu>
            </Sidebar>
        </div>
    )
}

export default SidebarNav;