import React from 'react';
import { Card, CardHeader, CardContent, Grid, Modal, Paper, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import pic from './blank.jpg'

// const styles = () => ({
//     modalStyle: { position: 'absolute', top: 30 }
// });

function getModalStyle() {
    const top = 25;
    const left = 25;

    return {
        top: `${top}%`,
        margin: 'auto'
        // left: `${left}%`,
        // transform: `translate(-${top}%, -${left}%)`,
    };
}

const styles = () => ({
    paper: {
        backgroundColor: 'fff'
        // position: 'absolute',
        // width: theme.spacing.unit * 50,
        // backgroundColor: theme.palette.background.paper,
        // boxShadow: theme.shadows[5],
        // padding: theme.spacing.unit * 4,
    },
});

class VehicleInfo extends React.Component {

    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onCheckout = () => {

    }

    getVehicleInfo = () => {
        // Retrieve vehicle info from drizzle
    }


    render() {
        
        
        return (
            <div>
                <Typography>Title</Typography>
                            <Typography>Description</Typography>
                            <img src={pic}></img>
                            <form>

                            </form>
                            <Button onClick={this.onCheckout}>Checkout</Button>
                <Button onClick={this.handleOpen}>Open Modal</Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                >
                    <Slide direction="up" in={this.state.open} mountOnEnter unmountOnExit>
                        <div>
                            <Typography>Title</Typography>
                            <Typography>Description</Typography>
                            <img src="./blank.jpg"></img>
                            <Button>Checkout</Button>
                        </div>
                    </Slide>

                </Modal>
            </div>
        );
    }
}

export default VehicleInfo;