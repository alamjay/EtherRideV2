import React from "react";
import {
  TextField,
  Typography,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Paper
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Request from "./Request";

const style = {
  container: { paddingLeft: 200, paddingRight: 200, margin: "auto" },
  leftDiv: { display: "inline-block", maxWidth: "300", verticalAlign: "top" },
  rightDiv: { display: "inline-block", maxWidth: "150" },
  inlineDiv: { marginTop: 50 },
  wrapper: { marginTop: 10 },
  form: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  textField: {
    marginTop: 5
  }
};

class RegisterVehicle extends React.Component {
  state = {
    owner: null,
    make: "",
    model: "",
    price: 0,
    location: "",
    stackId: null,
    dataKey: null,
    registered: false,
    registeredKey: null,
    request: null,
    notifications: this.props.getNotifications,
    address: null
  };

  // calling method from smart contract to verify if account used has already registered a vehicle
  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Vehicleshare;
    const registeredKey = contract.methods["isRegistered"].cacheCall(
      drizzleState.accounts[0]
    );
    this.setState({ registeredKey });
  }

  componentDidUpdate() {}

  handleChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Vehicleshare;

    const stackId = contract.methods["setVehicle"].cacheSend(
      this.state.make,
      this.state.model,
      this.state.price,
      this.state.location,
      { from: drizzleState.accounts[0] }
    );
    this.setState({ stackId });
  };

  // Showing notifications for vehicle requests
  showRequests = () => {
    const show = [];
    for (let i = 0; i < this.state.notifications.length; i++) {
      show.push(
        <Request
          key={i}
          requestData={this.state.notifications[i]}
          drizzle={this.props.drizzle}
          drizzleState={this.props.drizzleState}
          requestComponent={true}
        />
      );
    }
    return show.length !== 0 ? (
      show
    ) : (
      <Paper>
        <Typography variant="title">No requests yet</Typography>
      </Paper>
    );
  };

  render() {
    const { Vehicleshare } = this.props.drizzleState.contracts;
    let isReg = Vehicleshare.isRegistered[this.state.registeredKey];

    if (isReg === undefined) {
      return <div>Loading...</div>;
    }

    if (!isReg.value) {
      // verify from local storage vehicle is registered
      const vehicles = JSON.parse(localStorage.getItem("vehicles"));
      const checkVehicle = vehicles.find(
        vehicle => vehicle.id === isReg.args[0]
      );
      isReg.value = checkVehicle ? true : false;
    }

    if (isReg.value === false) {
      // Check to see whether the user already registered the car
      return (
        <form onSubmit={this.handleSubmit} style={style.form}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <TextField
                id="make"
                onChange={this.handleChange}
                label="Enter the vehicle make"
                style={style.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="model"
                onChange={this.handleChange}
                label="Enter the model"
                style={style.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="number"
                id="price"
                onChange={this.handleChange}
                label="Specify the price (ETH)"
                style={style.textField}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="location"
                onChange={this.handleChange}
                label="Enter the location"
                style={style.textField}
              />
            </Grid>
            <Grid item xs={12} style={style.textField}>
              <Button type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      );
    } else {
      return (
        <div style={style.container}>
          <Grid style={style.inlineDiv}>
            <Typography variant="display1">Requests</Typography>
            {this.showRequests()}
          </Grid>
          <Grid style={style.inlineDiv}>
            <Typography variant="display1">Manage Vehicle</Typography>
            <ExpansionPanel style={style.wrapper}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subheading">Change My Vehicle</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <form onSubmit={this.handleSubmit}>
                  <Typography>Enter the vehicle make: </Typography>
                  <TextField id="make" onChange={this.handleChange} />

                  <Typography>Enter the model: </Typography>
                  <TextField id="model" onChange={this.handleChange} />

                  <Typography>Specify the price: </Typography>
                  <TextField
                    type="number"
                    id="price"
                    onChange={this.handleChange}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="subheading">Change Location</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>Enter the location</Typography>
                <TextField id="location" onChange={this.handleChange} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Grid>
        </div>
      );
    }
  }
}

export default RegisterVehicle;
