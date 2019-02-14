import React from "react";
import { AppBar, Toolbar, Typography, Grid } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const style = {
  navItems: {
    color: 'inherit',
    fontColor: 'white',
    textDecoration: 'none'
  },

  title: {
    color: 'inherit',
    marginLeft: 20,
  }
}

const NavBar = (props) => {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container justify="space-between" spacing={16}>
            <Typography variant="title" style={style.title}>
              EtherRide
          </Typography>
            <Grid container item md={3}>
              <Grid item md={3}>
              <Link to="/" style={style.navItems}>Home</Link>
              </Grid>
              <Grid item md={3}>
              <Link to="/notfound" style={style.navItems}>About</Link>
              </Grid>
              <Grid item md={3}>
              <Link to="/RegisterVehicle" style={style.navItems}>List Car</Link>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
