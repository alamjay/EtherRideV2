import React from "react";
import { TextField, Typography, Button } from "@material-ui/core";

class RegisterVehicle extends React.Component {
    state = {
        owner: null, make: '', model: '', price: 0, location: '',
        stackId: null, dataKey: null
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;
        const dataKey = contract.methods["getVehicle"].cacheCall(drizzleState.accounts[0]);
        this.setState({dataKey});
    }

    handleChange = e => {
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = async e => {
        e.preventDefault();
        const  { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.Rideshare;

            const stackId = contract.methods["setVehicle"].cacheSend(
                drizzleState.accounts[0],
                this.state.make,
                this.state.model,
                this.state.price,
                this.state.location,
                {from: drizzleState.accounts[0]}
           );
           this.setState({stackId});

    }

    render() {
        const { Rideshare } = this.props.drizzleState.contracts;
        const res = Rideshare.getVehicle[this.state.dataKey];
        // console.log('RegisterVehicle');
        // console.log(res && res.value);
        // console.log('data key');
        // console.log(res);

        return (
            <div>
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
                    <TextField id="make" onChange={this.handleChange}/>
                    
                    <Typography>Enter the model:  </Typography>
                    <TextField id="model" onChange={this.handleChange}/>
                    
                    <Typography>Specify the price: </Typography>
                    <TextField type="number" id="price" onChange={this.handleChange}/>
                    
                    <Typography>Enter the location</Typography>
                    <TextField id="location" onChange={this.handleChange}/>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        );
    }
}

export default RegisterVehicle;
