import React from 'react';
import {Paper, Button, Typography} from '@material-ui/core';

const style = {
    container: { paddingTop: 10, marginTop: 10 },
    successBtn: {backgroundColor: '#05b71d', color: 'white', margin: 20},
    rejectBtn: {backgroundColor: '#b70404', color: 'white', margin: 20},
}

class Request extends React.Component {

    state = {requestKey: null, executeOrder: false, requestComponent: this.props.requestComponent}

    componentDidMount() {
        // const contract = drizzle.contracts.Vehicleshare;
        // drizzle.contracts.SimpleStorage.methods.storedData.cacheCall()
    }

    componentDidUpdate(){
        if(this.state.executeOrder) {
            this.setState({executeOrder: false});
            this.props.drizzle.contracts.Vehicleshare.methods.acceptDriver.cacheSend(
                this.props.requestData.request.from,
                1
                // this.props.requestData.request.rentalId
            );
        }
    }

    handleRequest = () => {
        this.setState({executeOrder: true, requestComponent: false});
    }

    render() {
        if(this.state.requestComponent) {
            return (
                <div>
                    <Paper style={style.container}>
                        <Typography>From: {this.props.requestData.request.from} </Typography>
                        <Typography>Start: {this.props.requestData.request.startDate}</Typography>
                        <Typography>End: {this.props.requestData.request.endDate}</Typography>
                        <Button onClick={this.handleRequest} style={style.successBtn}>Accept</Button>
                        <Button style={style.rejectBtn}>Reject</Button>
                    </Paper>    
                </div>
            );    
        }
        return <div></div>
    }
}

export default Request;