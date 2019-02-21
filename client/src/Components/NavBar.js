import React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from '@material-ui/core/';
import { Link } from 'react-router-dom';

const style = {
  navItems: {
    color: 'white',
    fontColor: 'white',
    textDecoration: 'none'
  },

  title: {
    color: 'inherit',
    marginLeft: 20,
    marginTop: 10
  },

  bar: {
    backgroundColor: '#4286f4'
  }
}

const NavBar = (props) => {

  return (
    <div>
      <AppBar position="static" style={style.bar}>
        <Toolbar>
          <Grid container justify="space-between" spacing={16}>
            <Typography variant="title" style={style.title}>
              EtherRide
          </Typography>
            <Grid container item md={3}>
              <Grid item md={3}>
              <Button><Link to="/" style={style.navItems}>Home</Link></Button>
              </Grid>
              <Grid item md={3}>
              <Button><Link to="/about" style={style.navItems}>About</Link></Button>
              </Grid>
              <Grid item md={3}>
              <Button><Link to="/RegisterVehicle" style={style.navItems}>My Car</Link></Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
