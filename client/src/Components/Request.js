import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";

const style = {
  container: { paddingTop: 10, marginTop: 10 },
  successBtn: { backgroundColor: "#05b71d", color: "white", margin: 20 },
  rejectBtn: { backgroundColor: "#b70404", color: "white", margin: 20 }
};

class Request extends React.Component {
  state = {
    requestKey: null,
    executeOrder: false,
    requestComponent: this.props.requestComponent,
    cancelRequest: false,
    manageRequest: false
  };

  componentDidMount() {}

  // Find requests that is specific to the user's public key
  componentDidUpdate() {
    let rental = JSON.parse(localStorage.getItem("rentals"));
    rental = rental.find(
      rental => rental.owner === this.props.drizzleState.accounts[0]
    );

    // method to accept driver 
    if (this.state.executeOrder) {
      this.setState({ executeOrder: false });
      this.props.drizzle.contracts.Vehicleshare.methods.acceptDriver.cacheSend(
        this.props.requestData.from,
        this.props.requestData.rentalId
      );
    }

    // cancelling request method call
    if (this.state.cancelRequest) {
      this.setState({ cancelRequest: false, executeOrder: false });
      this.props.drizzle.contracts.Vehicleshare.methods.cancelRequest.cacheSend();

      let notifications = JSON.parse(localStorage.getItem("notifyOwner"));
      notifications = notifications.filter(
        notification =>
          notification.rentalId !== this.props.requestData.rentalId
      );
      localStorage.setItem("notifyOwner", JSON.stringify(notifications));
    }
  }

  handleRequest = () => {
    this.setState({ executeOrder: true, requestComponent: false });
  };

  cancelRequest = () => {
    this.setState({ cancelRequest: true, requestComponent: false });
  };

  render() {
    if (this.state.requestComponent) {
      return (
        <div>
          <Paper style={style.container}>
            <Typography>From: {this.props.requestData.from} </Typography>
            <Typography>Start: {this.props.requestData.startDate}</Typography>
            <Typography>End: {this.props.requestData.endDate}</Typography>
            <Button onClick={this.handleRequest} style={style.successBtn}>
              Accept
            </Button>
            <Button onClick={this.cancelRequest} style={style.rejectBtn}>
              Reject
            </Button>
          </Paper>
        </div>
      );
    }
    return <div />;
  }
}

export default Request;
