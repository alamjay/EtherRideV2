import React from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import CarCard from "./CarCard";

const style = {
  SearchGrid: { position: "relative", marginTop: 20 },
  Paper: { padding: 10 },
  grid: { width: "60%" },
  submitBtn: {
    marginTop: 10,
    backgroundColor: "#4286f4",
    color: "white",
    marginLeft: 20
  },
  resultGrid: { marginTop: 30, marginLeft: 10 },
  wrapper: { paddingLeft: 50, paddingRight: 50 },
  TextField: { maxWidth: 200 },
  random: { width: 200, height: 200, backgroundColor: "grey", margin: 10 }
};

class Home extends React.Component {
  state = {
    open: false,
    age: null,
    selectedDate: null,
    listKey: null,
    getVehicleDataKey: null,
    numVehiclesDataKey: null,
    vehiclesCount: 1,
    vehicles: this.props.vehicles,
    selectedVehicle: null
  };

  // Showing each vehicle in a grid using card component
  showVehicle = () => {
    const show = [];
    for (let i = 0; i < this.state.vehicles.length; i++) {
      show.push(
        <Grid item md={3} key={i}>
          <CarCard
            vehicle={this.state.vehicles[i]}
            openModal={this.onVehicleInfo}
          />
        </Grid>
      );
    }
    return show;
  };

  // passing state to show vehicle details component
  onVehicleInfo = vehicleValue => {
    this.setState({ selectedVehicle: vehicleValue });
    this.props.onModal(vehicleValue);
  };

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  // Handling the date
  handleChange = date => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <div style={style.wrapper}>
        <Grid container style={style.SearchGrid} space={9}>
          <Grid item xs={2}>
            <TextField
              id="location"
              label="Location"
              placeholder="Where"
              InputLabelProps={{ shrink: true }}
              style={style.TextField}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="startDateTime"
              label="Start Date"
              type="datetime-local"
              defaultValue="2019-02-07T10:30"
              className={this.props.dateAndTimePicker}
              InputLabelProps={{ shrink: true }}
              style={style.TextField}
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              id="endDateTime"
              label="End Date"
              type="datetime-local"
              defaultValue="2019-02-07T10:30"
              className={this.props.dateAndTimePicker}
              InputLabelProps={{ shrink: true }}
              style={style.TextField}
            />
          </Grid>
          <Grid item xs={2}>
            <Button style={style.submitBtn}>Submit</Button>
          </Grid>
        </Grid>
        <Grid container spacing={24} style={style.resultGrid}>
        {/* Call method to show vehicle */}
          {this.showVehicle()}
        </Grid>
      </div>
    );
  }
}

export default Home;
