import React, { Component } from "react";
import "./App.css";
// import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import RegisterVehicle from './Components/RegisterVehicle';
import Home from "./Components/Home/Home";
import VehicleInfo from "./Components/Home/VehicleInfo";
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  state = { loading: true, drizzleState: null, openModal: false, vehicles: [], address: null, selectedVehicle: null };

  onModalOpen = (data) => {
    this.setState({ selectedVehicle: data });
    // this.setState( { openModal: isOpen });
    this.setState(state => ({
      openModal: !state.openModal
    }));
  }

  viewModal() {
        if(this.state.openModal) {
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
    this.saveVehicle(['', 'BMW','M3','1','London']);
  }

  componentDidUpdate() {
    this.props.drizzle.contracts.Vehicleshare.events.getVeh().on('data', event => {
      if (event.address !== this.state.address) {
        this.saveVehicle(event.returnValues);
      }
      this.setState({address: event.address});
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
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
              <RegisterVehicle {...routeProps} drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
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
