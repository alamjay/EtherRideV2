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
  state = {
    loading: true, isUpdate: false, initialLoad: true, drizzleState: null, openModal: false,
    vehicles: JSON.parse(localStorage.getItem('vehicles')), notifications: [], driverNotifications: [],
    address: null, selectedVehicle: null, requestId: null, confirmRequestId: null, rentals: null
  };

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
    // this.state.vehicles.push(vehicle);
  }

  // getRental = data => {
  //   const rental = {id: null, driver: null, owner: null, 
  //   startDateTime: null, endDateTime: null, location: null,
  //   price: null, cost: null, notifyOwner: null, notifyDriver: null};
  //   rental.id = data.id;
  //   rental.driver = data.driver;
  //   rental.owner = data.vehicle;
  //   rental.startDateTime = data.start_date_time;
  //   rental.endDateTime = data.end_date_time;
  //   rental.location = data.location;
  //   rental.price = data.price;
  //   rental.cost = data.cost;
  //   rental.notifyOwner = data.notifyOwner;
  //   rental.notifyDriver = data.notifyDriver;
  //   const rentals = JSON.parse(localStorage.getItem('rentals'));
  //   rentals.push(rental);
  //   localStorage.setItem('rentals', JSON.stringify(rentals));
  // }

  getRequest = data => {
    const request = { rentalId: null, from: null, owner: null, startDate: null, endDate: null };
    request.rentalId = data.rentalId;
    request.from = data.driver;
    request.owner = data.owner;
    request.startDate = data.start_date_time;
    request.endDate = data.end_date_time;
    // const request = { rentalId: 1, from: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E', startDate: '19/02/2019 10:30', endDate: '19/02/2019 11:30' };
    // if (request.rentalId !== null) {
    // this.state.notifications.push({ request });
    const storageRequests = JSON.parse(localStorage.getItem('notifyOwner'));
    storageRequests.push(request);
    localStorage.setItem('notifyOwner', JSON.stringify(storageRequests));

    // }
  }

  getConfirmRequest = data => {
    const confirmRequest = { rentalId: null, make: null, model: null, driver: null, owner: null };
    confirmRequest.rentalId = data.rentalId;
    confirmRequest.make = data.make;
    confirmRequest.model = data.model;
    confirmRequest.driver = data.driver;
    confirmRequest.owner = data.owner;
    if (confirmRequest.rentalId !== null) {
      // this.state.driverNotifications.push({ confirmRequest });
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

        // this.props.drizzle.contracts.Vehicleshare.events.getVeh().on('data', event => {
        //   if (event.address !== this.state.address) {
        //     this.saveVehicle(event.returnValues);
        //   }
        //   this.setState({ address: event.address });
        // });

      }

    });

    // Adding vehicles to the local storage
    // this.saveVehicle(['0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E', 'BMW', '3 series', '1', 'London', {vehicleImg: 'images/bmw-3.png'}]);
    // this.saveVehicle(['', 'Mercedes', 'C Class', '2', 'Essex', {vehicleImg: 'images/mercedes-c.jpg'}]);
    // this.saveVehicle(['', 'Audi', 'A7', '3', 'Uxbridge', {vehicleImg: 'images/audi-a7.jpg'}]);
    // this.saveVehicle(['', 'VW', 'Polo', '1', 'Stratford', {vehicleImg: 'images/vw-polo.png'}]);

    // localStorage.setItem('notifyOwner', JSON.stringify([]));
  }

  componentDidUpdate() {
    this.props.drizzle.contracts.Vehicleshare.events.getVeh().on('data', event => {
      if (event.address !== this.state.address) {
        this.saveVehicle(event.returnValues);
      }
      this.setState({ address: event.address, isUpdate: true });
    });

    // this.props.drizzle.contracts.Vehicleshare.events.getRentals().on('data', event => {
    //   if(event.rentalId !== this.state.rentals) {
    //     this.getRental(event.returnValues);
    //   }
    //   this.setState({rentals: event.rentalId});
    // });


    this.props.drizzle.contracts.Vehicleshare.events.notifyOwner().on('data', event => {
      if (event.rentalId !== this.state.requestId) {
        this.getRequest(event.returnValues);
      }
      this.setState({ requestId: event.rentalId, isUpdate: true });
    });

    this.props.drizzle.contracts.Vehicleshare.events.notifyDriver().on('data', event => {
      if (event.rentalId !== this.state.confirmRequestId) {
        this.getConfirmRequest(event.returnValues);
      }
      this.setState({ confirmRequestId: event.rentalId, isUpdate: true });

    });

    if (this.state.isUpdate) {
      this.setState({
        isUpdate: false,
        vehicles: JSON.parse(localStorage.getItem('vehicles')),
        notifications: JSON.parse(localStorage.getItem('notifyOwner')),
        driverNotifications: JSON.parse(localStorage.getItem('notifyDriver'))
      });
    }

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
              <Ride {...routeProps} notifications={this.state.driverNotifications} drizzle={this.props.drizzle} />
            )} />
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
