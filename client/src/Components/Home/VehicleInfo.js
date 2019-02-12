import React from 'react';
import { Card, CardHeader, CardContent, Grid, Modal, Paper, Typography, Button, TextField } from '@material-ui/core';
import PropTypes, { nominalTypeHack } from 'prop-types';
import Slide from '@material-ui/core/Slide';
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
        backgroundColor: 'fff',
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
        startDateTime: '', endDateTime: '', location: '',
        vehicle: '0x886BA5E2B9025f6378D0A9Eafd256a20D1884d8E'
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;
        const getHireDataKey = contract.methods["getHire"].cacheCall(drizzleState.accounts[0]);
        const getVehicleDataKey = contract.methods["getVehicle"].cacheCall(drizzleState.accounts[0]);
        this.setState({ getHireDataKey });
        this.setState({ getVehicleDataKey });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onCheckout = async e => {
        e.preventDefault();
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;

        const stackId = contract.methods["setHire"].cacheSend(
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
        const { value } = this.state;

        const { Rideshare } = this.props.drizzleState.contracts;
        const res = Rideshare.getHire[this.state.getHireDataKey];
        const resveh = Rideshare.getVehicleList[this.state.getVehicleDataKey];
        // console.log(res && res.value);
        console.log(resveh && resveh.value);
        // const list = drizzle.contracts.Rideshare.methods.getVehicleList.cacheCall();

        return (
            <div className={classes.root}>
                <Button onClick={this.handleOpen}>Open Modal</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    {/* <Slide direction="up" in={this.state.open} mountOnEnter unmountOnExit> */}
                    <div style={getModalStyle()} className={classes.paper}>
                        <Grid container>
                            <Grid item sm={9}>
                                <Typography>Title</Typography>
                                <img src={pic}></img>
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
                                        defaultValue="2019-02-07T10:30"
                                        className={this.props.dateAndTimePicker}
                                        InputLabelProps={{ shrink: true, }}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="location"
                                        label="Location"
                                        type="text"
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