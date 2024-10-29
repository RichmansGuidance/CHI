import React from 'react';
import {  Button, Drawer, List, ListItem } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <Drawer variant="permanent" anchor="left">
            <List>
                <ListItem>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                </ListItem>
                <ListItem>
                    <Button component={Link} to="/heroes" color="inherit">Heroes</Button>
                </ListItem>
                <ListItem>
                    <Button component={Link} to="/about" color="inherit">About</Button>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Navbar;
