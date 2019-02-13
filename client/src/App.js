import React, { Component } from "react";
import "./App.css";
import ReadString from "./ReadString";
import SetString from "./SetString";
import Login from "./Components/Login";
import NavBar from "./Components/NavBar";
import RegisterVehicle from './Components/RegisterVehicle';
import Home from "./Components/Home/Home";
import VehicleInfo from "./Components/Home/VehicleInfo";
import VehicleInfoWrapped from "./Components/Home/VehicleInfo";
import { withStyles } from '@material-ui/core/styles';

class App extends Component {
  state = { loading: true, drizzleState: null, openModal: false };

  onModalOpen = () => {
    // this.setState( { openModal: isOpen });
    this.setState( state => ({
      openModal: !state.openModal
    }));
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

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Drizzle...";
    return (
      <div className="App">
        <NavBar />
        <RegisterVehicle drizzle={this.props.drizzle} drizzleState={this.state.drizzleState}/>
        {/* <Login drizzle={this.props.drizzle} drizzleState={this.state.drizzleState}/> */}
        <Home 
        drizzle={this.props.drizzle} 
        drizzleState={this.state.drizzleState} 
        DateAndTimePickers={this.props.DateAndTimePickers} 
        onModal={this.onModalOpen} />
        <VehicleInfo 
        drizzle={this.props.drizzle} 
        drizzleState={this.state.drizzleState} 
        requestModal={this.onModalOpen} 
        openModal={this.state.openModal}/>
        {/* <button onClick={this.onModalOpen}>Clic kme</button> */}
      </div>
    );
  }
}

export default App;
