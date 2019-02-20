import React from 'react';
import {Paper, Button, Typography} from '@material-ui/core';

const style = {
    container: { paddingTop: 10, marginTop: 10 },
    successBtn: {backgroundColor: '#05b71d', color: 'white', margin: 20},
    rejectBtn: {backgroundColor: '#b70404', color: 'white', margin: 20},
}

class Request extends React.Component {

    state = {requestKey: null}

    componentDidMount() {
        const { drizzle } = this.props;
        const contract = drizzle.contracts.Vehicleshare;
        const requestKey = contract.methods["getVehicle"].cacheCall();
        this.setState({ requestKey });
    }

    handleRequest() {

    }

    render() {
        return (
            <div>
                <Paper style={style.container}>
                    <Typography>From: {this.props.requestData.request.from} </Typography>
                    <Typography>Start: {this.props.requestData.request.startDate}</Typography>
                    <Typography>End: {this.props.requestData.request.endDate}</Typography>
                    <Button onClick={this.handleRequest()} style={style.successBtn}>Accept</Button>
                    <Button style={style.rejectBtn}>Reject</Button>
                </Paper>    
            </div>
        );
    
    }
}

export default Request;