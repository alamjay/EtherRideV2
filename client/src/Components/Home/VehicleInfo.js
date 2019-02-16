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
    },
    SearchGrid: {}
});

class VehicleInfo extends React.Component {

    state = {
        open: false,
        stackId: null, getHireDataKey: null, getVehicleDataKey: null,
        startDateTime: new Date(), endDateTime: null, location: '',
        vehicle: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E'
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;
        const getHireDataKey = contract.methods["getHire"].cacheCall(drizzleState.accounts[0]);
        const getVehicleDataKey = contract.methods["getVehicle"].cacheCall(drizzleState.accounts[0]);
        this.setState({ getHireDataKey });
        this.setState({ getVehicleDataKey });
        // this.setState({ open: true });

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
        const contract = drizzle.contracts.Rideshare;

        contract.methods["setHire"].cacheSend(
            drizzleState.accounts[0],   // something wrong here
            drizzleState.accounts[0], // and here
            this.state.startDateTime,
            this.state.endDateTime,
            this.state.location,
            { from: drizzleState.accounts[0] }
        )

    }

    render() {
        const { classes } = this.props;
        const title = this.props.vehicleData.make + ' ' + this.props.vehicleData.model;
        const price = this.props.vehicleData.price; //hourly rate

        const cost = ((new Date(this.state.endDateTime) - new Date(this.state.startDateTime)) / 3600000) * price; // convert into hours
        console.log(cost);

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
                            <Grid item sm={9}>
                                <Typography>{title}</Typography>
                                <img src={pic} alt=""></img>
                                <Typography>Description</Typography>
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