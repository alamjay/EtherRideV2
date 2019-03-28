import React from "react";
import { Typography } from "@material-ui/core";
import ConfirmRequest from "./ConfirmRequest";

const style = {
  title: {
    marginTop: 50
  },
  subheading: { position: "relative", marginBottom: 0, marginRight: 1000 }
};

class Ride extends React.Component {
  state = { notifications: this.props.notifications, executeOrder: false };

  componentDidUpdate() {}

  // rendering the number of requests for vehicles
  confirmRequest() {
    const requests = [];
    for (let i = 0; i < this.state.notifications.length; i++) {
      requests.push(
        <ConfirmRequest
          key={i}
          request={this.state.notifications[i]}
          drizzle={this.props.drizzle}
          requestComponent={true}
        />
      );
    }
    return requests !== 0
      ? (
          <Typography variant="display1" style={style.subheading}>
            Waiting Approval
          </Typography>
        ) && requests
      : null;
  }

  render() {
    return (
      <div>
        <Typography variant="display2" style={style.title}>
          My Rides
        </Typography>
        {this.confirmRequest()}
      </div>
    );
  }
}

export default Ride;
