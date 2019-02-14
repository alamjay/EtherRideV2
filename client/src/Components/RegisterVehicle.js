import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";

class RegisterVehicle extends React.Component { // Call it list car?
    state = {
        owner: null, make: '', model: '', price: 0, location: '',
        stackId: null, dataKey: null, registered: false, registeredKey: null
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;
        const dataKey = contract.methods["getVehicle"].cacheCall(drizzleState.accounts[0]);
        const registeredKey = contract.methods["isRegistered"].cacheCall(drizzleState.accounts[0]);
        this.setState({ dataKey });
        this.setState({ registeredKey });
    }

    componentDidUpdate() {

        // if (isReg !== this.state.registered && isReg) {
        // this.setState({ registered: true });
        // }
    }

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;

        const stackId = contract.methods["setVehicle"].cacheSend(
            this.state.make,
            this.state.model,
            this.state.price,
            this.state.location,
            { from: drizzleState.accounts[0] }
        );
        this.setState({ stackId });
    }

    register() {
    }

    render() {
        const { Rideshare } = this.props.drizzleState.contracts;
        const isReg = Rideshare.isRegistered[this.state.registeredKey];
        if (isReg === undefined) {
            return <div>Loading...</div>
        }
        if (isReg.value === false) {
            return (
                <form
                    onSubmit={this.handleSubmit}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)"
                    }}
                >
                    <Typography>Enter the vehicle make: </Typography>
                    <TextField id="make" onChange={this.handleChange} />

                    <Typography>Enter the model:  </Typography>
                    <TextField id="model" onChange={this.handleChange} />

                    <Typography>Specify the price: </Typography>
                    <TextField type="number" id="price" onChange={this.handleChange} />

                    <Typography>Enter the location</Typography>
                    <TextField id="location" onChange={this.handleChange} />
                    <Button type="submit">Submit</Button>
                </form>
            );
        }
        else {
            console.log(isReg.value);
            return (
                <div>

                </div>
            );
        }
    }
}

export default RegisterVehicle;
