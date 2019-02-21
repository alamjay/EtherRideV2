import React from 'react';
import { Grid, Modal, Typography, Button, TextField } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import pic from './blank.jpg';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 100,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    }
});

class VehicleInfo extends React.Component {

    state = {
        open: false,
        stackId: null, getHireDataKey: null, getVehicleDataKey: null,
        startDateTime: null, endDateTime: null, location: '', cost: null,
        vehicle: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E'
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Vehicleshare;
        const getHireDataKey = contract.methods["getHire"].cacheCall(drizzleState.accounts[0]);
        const getVehicleDataKey = contract.methods["getVehicle"].cacheCall(drizzleState.accounts[0]);
        this.setState({ getHireDataKey });
        this.setState({ getVehicleDataKey });
        // this.setState({ open: true });
        
        // console.log(drizzle.web3.sendTransaction({ from: drizzleState.accounts[0], to: contract.address, value: 200000000}));
        console.log(contract.address);
        console.log(drizzle.web3.eth.getBalance(contract.address));
    }
    
    // UNSAFE_componentWillReceiveProps(newProps) {
    //     this.setState({ open: newProps.requestModal });
    // }

    // handleOpen = () => {
    //     console.log(this.props.requestModal);
    //     this.setState({ open: this.props.requestModal });
    // };

    handleClose = () => {
        // this.setState({ open: false });
        this.props.requestModal(false);
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onCheckout = async e => {
        e.preventDefault();
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Vehicleshare;

        const price = this.props.vehicleData.price; //hourly rate
        const cost = ((new Date(this.state.endDateTime) - new Date(this.state.startDateTime)) / 3600000) * price; // convert into hours
        const amountSend = drizzle.web3.utils.toWei(cost.toString(), 'ether');

        contract.methods["setHire"].cacheSend(
            drizzleState.accounts[0],
            this.state.startDateTime,
            this.state.endDateTime,
            { from: drizzleState.accounts[0], value: amountSend } // work out how to add value to payable method
        );

        // contract.methods["makePayment"].cacheSend(
        //     drizzleState.accounts[0],
        //     {value: amountSend }
        // );

    }

    getCost() {
        if(this.state.startDateTime !== null && this.state.endDateTime !== null) {
            const price = this.props.vehicleData.price;
            const cost = ((new Date(this.state.endDateTime) - new Date(this.state.startDateTime)) / 3600000) * price; // convert into hours
            return cost.toFixed(3) + " eth";
        }
    }

    render() {
        const { classes } = this.props;
        const title = this.props.vehicleData.make + ' ' + this.props.vehicleData.model;
        const location = this.props.vehicleData.location;

        // const { Vehicleshare } = this.props.drizzleState.contracts;
        // const getHire = Vehicleshare.getHire[this.state.getHireDataKey];
        // if(getHire !== undefined) {
        //     console.log(getHire && getHire.value);
        // }

        return (
            <div className={classes.root}>
                {/* <Button onClick={this.handleOpen}>Open Modal</Button> */}
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.openModal}
                    onClose={this.handleClose}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    {/* <Slide direction="up" in={this.state.open} mountOnEnter unmountOnExit> */}
                    <div style={getModalStyle()} className={classes.paper}>
                        <Grid container>
                            <Grid item sm={8}>
                                <Typography variant="title">{title}</Typography>
                                <img src={pic} alt=""></img>
                                <Typography variant="display1">{location}</Typography>
                                <Typography></Typography>
                            </Grid>
                            <Grid item sm={3}>
                                <form onSubmit={this.onCheckout}>
                                    <TextField
                                        id="startDateTime"
                                        label="Start Date"
                                        type="datetime-local"
                                        defaultValue="2019-02-07T10:30"
                                        className={this.props.dateAndTimePicker}
                                        InputLabelProps={{ shrink: true, }}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="endDateTime"
                                        label="End Date"
                                        type="datetime-local"
                                        defaultValue="2019-02-07T11:30"
                                        className={this.props.dateAndTimePicker}
                                        InputLabelProps={{ shrink: true, }}
                                        onChange={this.handleChange}
                                    />
                                    <Typography variant="display1" >{this.getCost()}</Typography>
                                    <Button  onClick={this.onCheckout}>Checkout</Button>
                                </form>
                            </Grid>
                        </Grid>
                    </div>
                    {/* </Slide> */}

                </Modal>

            </div>
        );
    }
}

VehicleInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VehicleInfo);