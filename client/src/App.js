import React, { Component } from "react";
import "./App.css";
import NavBar from "./Components/NavBar";
import RegisterVehicle from './Components/RegisterVehicle';
import Home from "./Components/Home/Home";
import VehicleInfo from "./Components/Home/VehicleInfo";
import { BrowserRouter, Route } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from "@material-ui/core";
import About from "./Components/About";
import Ride from "./Components/Ride";

// style for the loading component
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
  state = {
    loading: true, isUpdate: false, initialLoad: true, drizzleState: null, openModal: false,
    vehicles: JSON.parse(localStorage.getItem('vehicles')), notifications: [], driverNotifications: [],
    address: null, selectedVehicle: null, requestId: null, confirmRequestId: null, rentals: null
  };

  // Updating the states to open the vehicle info component
  onModalOpen = (data) => {
    this.setState({ selectedVehicle: data });
    this.setState(state => ({
      openModal: !state.openModal
    }));
  }

  // Action to show the vehicle info component
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

  // Saving the vehicles data onto the local storage
  saveVehicle = (data) => {
    const vehicle = { id: '', make: '', model: '', price: 0, location: '', img: null };
    vehicle.id = data[0];
    vehicle.make = data[1];
    vehicle.model = data[2];
    vehicle.price = data[3];
    vehicle.location = data[4];
    vehicle.img = data[5] ? data[5] : null;
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    vehicles.push(vehicle);
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }

  // get requests to hire vehicle from the local storage 
  getRequest = data => {
    const request = { rentalId: null, from: null, owner: null, startDate: null, endDate: null };
    request.rentalId = data.rentalId;
    request.from = data.driver;
    request.owner = data.owner;
    request.startDate = data.start_date_time;
    request.endDate = data.end_date_time;
    const storageRequests = JSON.parse(localStorage.getItem('notifyOwner'));
    storageRequests.push(request);
    localStorage.setItem('notifyOwner', JSON.stringify(storageRequests));
  }

  // get requests for the driver to confirm vehicle acess
  getConfirmRequest = data => {
    const confirmRequest = { rentalId: null, make: null, model: null, driver: null, owner: null };
    confirmRequest.rentalId = data.rentalId;
    confirmRequest.make = data.make;
    confirmRequest.model = data.model;
    confirmRequest.driver = data.driver;
    confirmRequest.owner = data.owner;
    if (confirmRequest.rentalId !== null) {
      const storageConfirmRequest = JSON.parse(localStorage.getItem('notifyDriver'));
      storageConfirmRequest.push(confirmRequest);
      localStorage.setItem('notifyDriver', JSON.stringify(storageConfirmRequest));
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
      }
    });
  }

  componentDidUpdate() {
    // event listener for getting new vehicles registered
    this.props.drizzle.contracts.Vehicleshare.events.getVeh().on('data', event => {
      if (event.address !== this.state.address) {
        this.saveVehicle(event.returnValues);
      }
      this.setState({ address: event.address, isUpdate: true });
    });

    // event listener for new requests to reserve vehicle 
    this.props.drizzle.contracts.Vehicleshare.events.notifyOwner().on('data', event => {
      if (event.rentalId !== this.state.requestId) {
        this.getRequest(event.returnValues);
      }
      this.setState({ requestId: event.rentalId, isUpdate: true });
    });

    // event listener for requests to confirm vehicle access by the driver
    this.props.drizzle.contracts.Vehicleshare.events.notifyDriver().on('data', event => {
      if (event.rentalId !== this.state.confirmRequestId) {
        this.getConfirmRequest(event.returnValues);
      }
      this.setState({ confirmRequestId: event.rentalId, isUpdate: true });

    });

    // get data from local storage on update
    if (this.state.isUpdate) {
      this.setState({
        isUpdate: false,
        vehicles: JSON.parse(localStorage.getItem('vehicles')),
        notifications: JSON.parse(localStorage.getItem('notifyOwner')),
        driverNotifications: JSON.parse(localStorage.getItem('notifyDriver'))
      });
    }

    // populating the data when the home component renders
    if (this.state.initialLoad) {
      let getOwnerNotifications = JSON.parse(localStorage.getItem('notifyOwner'));
      getOwnerNotifications = getOwnerNotifications.filter(notification => notification.owner === this.state.drizzleState.accounts[0]);

      let getDriverNotifications = JSON.parse(localStorage.getItem('notifyDriver'));
      getDriverNotifications = getDriverNotifications.filter(notification => notification.owner === this.state.drizzleState.accounts[0]);
      this.setState({
        initialLoad: false,
        notifications: getOwnerNotifications,
        driverNotifications: getDriverNotifications,
        isUpdate: true
      });
    }
  }

  // unsubscribing drizzle  
  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // render the loading component
    if (this.state.loading) return (
      <div style={style.progress}>
        <CircularProgress disableShrink />
        <Typography variant="display1">Loading...</Typography>
      </div>
    );

    // rendering the app component
    return (
      <div className="App">
      
      {/* Router for navigation between components */}
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
              <Ride {...routeProps} notifications={this.state.driverNotifications} drizzle={this.props.drizzle} />
            )} />
          </div>
        </BrowserRouter>
        
        {/* render vehicle info modal  */}
        {this.viewModal()}
      </div>
    );
  }
}

export default App;
