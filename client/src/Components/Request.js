import React from 'react';
import {Paper, Button, Typography} from '@material-ui/core';

const style = {
    container: { paddingTop: 10, marginTop: 10 },
    successBtn: {backgroundColor: '#05b71d', color: 'white', margin: 20},
    rejectBtn: {backgroundColor: '#b70404', color: 'white', margin: 20},
}

class Request extends React.Component {

    state = {requestKey: null, executeOrder: false, requestComponent: this.props.requestComponent, cancelRequest: false, manageRequest: false}

    componentDidMount() {
        // const contract = drizzle.contracts.Vehicleshare;
        // drizzle.contracts.SimpleStorage.methods.storedData.cacheCall()

        // const requestKey = this.props.drizzle.contracts.Vehicleshare.methods.checkOwnerRequest.cacheCall(
        //     this.props.requestData.owner,
        //     this.props.requestData.rentalId
        // );
        // this.setState({requestKey});
    }

    componentDidUpdate(){
        let rental = JSON.parse(localStorage.getItem('rentals'));
        rental = rental.find(rental => rental.owner === this.props.drizzleState.accounts[0]);
        
        //     let notifications = JSON.parse(localStorage.getItem('notifyOwner'));
        //     notifications = notifications.filter(notification => notification.rentalId !== this.props.requestData.rentalId);
        //     localStorage.setItem('notifyOwner', JSON.stringify(notifications));    
        //     this.setState({requestComponent: false});

        if(this.state.executeOrder) {
            this.setState({executeOrder: false});
            this.props.drizzle.contracts.Vehicleshare.methods.acceptDriver.cacheSend(
                this.props.requestData.from,
                this.props.requestData.rentalId
            );
        };

        if(this.state.cancelRequest) {
            this.setState({cancelRequest: false, executeOrder: false});
            this.props.drizzle.contracts.Vehicleshare.methods.cancelRequest.cacheSend();

            let notifications = JSON.parse(localStorage.getItem('notifyOwner'));
            notifications = notifications.filter(notification => notification.rentalId !== this.props.requestData.rentalId);
            localStorage.setItem('notifyOwner', JSON.stringify(notifications));
        };
    }

    handleRequest = () => {
        // let confirmOwnerActions = JSON.parse(localStorage.getItem('notifyDriver'));
        // confirmOwnerActions = confirmOwnerActions.find(notification => notification.owner === this.props.drizzleState.accounts[0]);
        // if(confirmOwnerActions) {
        //     this.setState({manageRequest});            
        // }
        
        this.setState({executeOrder: true, requestComponent: false});
    }

    cancelRequest = () => {
        this.setState({ cancelRequest: true, requestComponent: false });
    }

    render() {
        // const manageRequest = this.props.drizzleState.contracts.Vehicleshare.checkOwnerRequest[this.state.requestKey];

        // if(manageRequest === undefined) {
        //     return <div></div>;
        // }
        // if(manageRequest.value === false) {
        //     console.log(manageRequest);
        //     // this.setState({manageRequest: manageRequest.value});
        // }
        // if(manageRequest.value === true){ 
        //     console.log(manageRequest);
        // }

        if(this.state.requestComponent) {
            return (
                <div>
                    <Paper style={style.container}>
                        <Typography>From: {this.props.requestData.from} </Typography>
                        <Typography>Start: {this.props.requestData.startDate}</Typography>
                        <Typography>End: {this.props.requestData.endDate}</Typography>
                        <Button onClick={this.handleRequest} style={style.successBtn}>Accept</Button>
                        <Button onClick={this.cancelRequest} style={style.rejectBtn}>Reject</Button>
                    </Paper>    
                </div>
            );
        }
        return <div></div>
    }
}

export default Request;