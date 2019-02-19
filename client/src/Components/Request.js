import React from 'react';
import {Paper, Button, Typography} from '@material-ui/core';

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
                <Paper>
                    <Typography>From: {this.props.requestData.request.from} </Typography>
                    <Typography>Start: {this.props.requestData.request.startDate}</Typography>
                    <Typography>End: {this.props.requestData.request.endDate}</Typography>
                    <Button onClick={this.handleRequest()}>Accept</Button>
                    <Button>Reject</Button>
                </Paper>    
            </div>
        );
    
    }
}

export default Request;