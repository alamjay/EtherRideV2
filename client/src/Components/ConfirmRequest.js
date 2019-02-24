import React from 'react';
import {Card, Grid, CardContent, Typography, Button} from '@material-ui/core';
import pic from './Home/blank.jpg'

const style = {
    card: {
        marginTop: 20,
        marginLeft: 250,
        marginRight: 500
    },
    image: { width: 150 },
    successBtn: {backgroundColor: '#05b71d', color: 'white', margin: 20},
    rejectBtn: {backgroundColor: '#b70404', color: 'white', margin: 20},   
}

class ConfirmRequest extends React.Component {

    state={executeOrder: false, request: this.props.request.confirmRequest, requestComponent: this.props.requestComponent}

    handleRequest = () => {
        this.setState({executeOrder: true, requestComponent: false});
    }

    componentDidUpdate(){
        if(this.state.executeOrder) {
            this.setState({executeOrder: false});
            this.props.drizzle.contracts.Vehicleshare.methods.confirmRequest.cacheSend(
                this.state.request.owner
            );
        }
    }

    render() {

        if(this.state.requestComponent){
            return (
                <div>
                    <Card style={style.card}>
                        <CardContent>
                            <Grid container spacing={24}>
                                <Grid item xs={2}>
                                    <img src={pic} style={style.image} alt="" />
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant="title">{this.state.request.make} {this.state.request.model}</Typography>
                                    <Grid container spacing={16}>
                                    <Grid item xs={10}>
                                    <Button style={style.successBtn} onClick={this.handleRequest}>Accept</Button>
                                    </Grid>
                                    <Grid item xs={1}>
                                    <Button style={style.rejectBtn}>Reject</Button>
                                    </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </div>
            );                
        }
        return<div></div>;
    }

} 
export default ConfirmRequest;