import React, { Component } from "react";
import "./App.css";
// import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import RegisterVehicle from './Components/RegisterVehicle';
import Home from "./Components/Home/Home";
import VehicleInfo from "./Components/Home/VehicleInfo";
import { BrowserRouter, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "@material-ui/core";
import About from "./Components/About";
import Ride from "./Components/Ride";

const style = {
  progress: {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 70,
    height: 70,
    textAlign: 'center'
  },
}

class App extends Component {
  state = { loading: true, drizzleState: null, openModal: false, vehicles: [], notifications: [], driverNotifications: [],
    address: null, selectedVehicle: null, requestId: null, confirmRequestId: null };

  onModalOpen = (data) => {
    this.setState({ selectedVehicle: data });
    // this.setState( { openModal: isOpen });
    this.setState(state => ({
      openModal: !state.openModal
    }));
  }

  viewModal() {
    if (this.state.openModal) {
      return (
        <VehicleInfo
          drizzle={this.props.drizzle}
          drizzleState={this.state.drizzleState}
          requestModal={this.onModalOpen}
          openModal={this.state.openModal}
          vehicleData={this.state.selectedVehicle}
        />
      );
    }
  }

  saveVehicle = (data) => {
    const vehicle = { id: '', make: '', model: '', price: 0, location: '' };
    vehicle.id = data[0];
    vehicle.make = data[1];
    vehicle.model = data[2];
    vehicle.price = data[3];
    vehicle.location = data[4];
    this.state.vehicles.push(vehicle);
  }

  getRequest = data => {
    const request = { rentalId: null, from: null, startDate: null, endDate: null };
    request.rentalId = data.rentalId;
    request.from = data.driver;
    request.startDate = data.start_date_time;
    request.endDate = data.end_date_time;
    // const request = { rentalId: 1, from: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E', startDate: '19/02/2019 10:30', endDate: '19/02/2019 11:30' };
    if (request.rentalId !== null) {
      this.state.notifications.push({ request });
      // console.log(request);
    }
  }

  getConfirmRequest = data => {
    const confirmRequest = { rentalId: null, make: null, model: null, driver: null, owner: null };
    confirmRequest.rentalId = data.rentalId;
    confirmRequest.make = data.make;
    confirmRequest.model = data.model;
    confirmRequest.driver = data.driver;
    confirmRequest.owner = data.owner;
    if(confirmRequest.rentalId !== null) {
      this.state.driverNotifications.push({ confirmRequest });
    }
  }

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });

        // this.props.drizzle.contracts.Vehicleshare.events.getVeh().on('data', event => {
        //   if (event.address !== this.state.address) {
        //     this.saveVehicle(event.returnValues);
        //   }
        //   this.setState({ address: event.address });
        // });

      }
    });
    this.saveVehicle(['0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E', 'BMW', '3 series', '1', 'London']);
    this.saveVehicle(['', 'Mercedes', 'C Class', '2', 'Essex']);
    this.saveVehicle(['', 'Audi', 'A7', '3', 'Uxbridge']);
    this.saveVehicle(['', 'VW', 'Polo', '1', 'Stratford']);
    // this.getRequest({rentalId: 0, driver: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E', start_date_time:'19/02/2019 10:30', end_date_time:'19/02/2019 11:30'});
  }

  componentDidUpdate() {
    this.props.drizzle.contracts.Vehicleshare.events.getVeh().on('data', event => {
      if (event.address !== this.state.address) {
        this.saveVehicle(event.returnValues);
      }
      this.setState({ address: event.address });
    });

    this.props.drizzle.contracts.Vehicleshare.events.notifyOwner().on('data', event => {
      if (event.rentalId !== this.state.requestId) {
        this.getRequest(event.returnValues);
      }
      this.setState({ requestId: event.rentalId });
    });

    this.props.drizzle.contracts.Vehicleshare.events.notifyDriver().on('data', event => {
      if (event.rentalId !== this.state.confirmRequestId) {
        this.getConfirmRequest(event.returnValues);
      }
      this.setState({ confirmRequestId: event.rentalId });

    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return (
      <div style={style.progress}>
        <CircularProgress disableShrink />
        <Typography variant="display1">Loading...</Typography>
      </div>
    );
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <NavBar />
            <Route path="/" exact render={(routeProps) => (
              <Home {...routeProps} drizzle={this.props.drizzle}
                drizzleState={this.state.drizzleState}
                DateAndTimePickers={this.props.DateAndTimePickers}
                onModal={this.onModalOpen}
                vehicles={this.state.vehicles} />
            )} />
            <Route path="/registervehicle" exact render={(routeProps) => (
              <RegisterVehicle {...routeProps} drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} getNotifications={this.state.notifications} />
            )} />
            <Route path="/about" exact render={(routeProps) => (
              <About {...routeProps} />
            )} />
            <Route path="/ride" exact render={(routeProps) => (
              <Ride {...routeProps} notifications={this.state.driverNotifications} drizzle={this.props.drizzle}/>
            )}/>
          </div>
        </BrowserRouter>
        {/* <RegisterVehicle drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} /> */}
        {/* <Login drizzle={this.props.drizzle} drizzleState={this.state.drizzleState}/> */}
        {/* <Home 
        drizzle={this.props.drizzle} 
        drizzleState={this.state.drizzleState} 
        DateAndTimePickers={this.props.DateAndTimePickers} 
        onModal={this.onModalOpen} /> */}
        {this.viewModal()}
      </div>
    );
  }
}

export default App;
