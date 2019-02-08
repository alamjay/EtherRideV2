import React from "react";
import {AppBar, Toolbar, Typography, Button, Grid} from '@material-ui/core/';

const NavBar = (props) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={16}>
            <Typography variant="title" color="inherit">
              EtherRide
          </Typography>
            <Grid>
              <Button color="inherit">Home</Button>
              <Button color="inherit">About</Button>
              <Button color="inherit">How it works</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
