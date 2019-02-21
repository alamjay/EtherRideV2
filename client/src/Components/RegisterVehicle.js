import React from "react";
import { TextField, Typography, Button, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Card, Grid, Paper } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Request from './Request';
import { isWidthDown } from "@material-ui/core/withWidth";

const style = {
    container: { paddingLeft: 200, paddingRight: 200, margin: 'auto' },
    leftDiv: { display: 'inline-block', maxWidth: '300', verticalAlign: 'top' },
    rightDiv: { display: 'inline-block', maxWidth: '150' },
    inlineDiv: { marginTop: 50 },
    wrapper: { marginTop: 10 }
}

class RegisterVehicle extends React.Component { // Call it list car?
    state = {
        owner: null, make: '', model: '', price: 0, location: '',
        stackId: null, dataKey: null, registered: false, registeredKey: null,
        request: null, notifications: this.props.getNotifications, address: null
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Vehicleshare;
        // const dataKey = contract.methods["getVehicle"].cacheCall(drizzleState.accounts[0]);
        const registeredKey = contract.methods["isRegistered"].cacheCall(drizzleState.accounts[0]);
        // this.setState({ dataKey });
        this.setState({ registeredKey });

    }

    componentDidUpdate() {
        // if (isReg !== this.state.registered && isReg) {
        // this.setState({ registered: true });
        // }
        // this.props.drizzle.contracts.Vehicleshare.events.notifyOwner().on('data', event => {
        //     if (event.address !== this.state.address) {
        //         this.getRequest(event.returnValues);
        //     }
        //     this.setState({ address: event.address });
        // });
    }

    // getRequest = data => {
    //     const request = { rentalId: null, from: '', startDate: '', endDate: '' };
    //     request.rentalId = data.rentalId;
    //     request.from = data.driver;
    //     request.startDate = data.start_date_time;
    //     request.endDate = data.end_date_time;
    //     // const request = { rentalId: 1, from: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E', startDate: '19/02/2019 10:30', endDate: '19/02/2019 11:30' };
    //     if(request.rentalId !== null) {
    //         this.state.notifications.push({ request });
    //     }
    // }   

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Vehicleshare;

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
        return (
            null
        );
    }

    showRequests = () => {
        const show = [];
        console.log(this.state.notifications);
        // if(this.state.notifications.length > 0) {
            for (let i = 0; i < this.state.notifications.length; i++) {
                show.push(<Request requestData={this.state.notifications[i]} drizzle={this.props.drizzle } requestComponent={true} />);
            }   
        // }
        return ( show.length !==0 ? show : <Paper><Typography variant="title">No requests yet</Typography></Paper> );
    }

    render() {
        const { Vehicleshare } = this.props.drizzleState.contracts;
        const isReg = Vehicleshare.isRegistered[this.state.registeredKey];
        if (isReg === undefined) {
            return <div>Loading...</div>
        }
        if (isReg.value === false) { // Check to see whether the user already registered the car
            // if(true) { // Testing
            return (
                // <Button>Register My Vehicle</Button>
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
            return (
                <div style={style.container}>
                    <Grid style={style.inlineDiv}>

                        <Typography variant="display1">Requests</Typography>
                        {this.showRequests()}
                        {/* <Request/> */}
                    </Grid>
                    <Grid style={style.inlineDiv}>

                        <Typography variant="display1">Manage Vehicle</Typography>
                        <ExpansionPanel style={style.wrapper}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subheading">Change My Vehicle</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <form
                                    onSubmit={this.handleSubmit}>
                                    <Typography>Enter the vehicle make: </Typography>
                                    <TextField id="make" onChange={this.handleChange} />

                                    <Typography>Enter the model:  </Typography>
                                    <TextField id="model" onChange={this.handleChange} />

                                    <Typography>Specify the price: </Typography>
                                    <TextField type="number" id="price" onChange={this.handleChange} />
                                    <Button type="submit">Submit</Button>
                                </form>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <ExpansionPanel>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subheading">Change Location</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>Enter the location</Typography>
                                <TextField id="location" onChange={this.handleChange} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </Grid>

                </div>
            );
        }
    }
}

export default RegisterVehicle;
