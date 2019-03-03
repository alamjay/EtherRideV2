import React from 'react';
import {
    Typography,
    Button,
    Grid
} from "@material-ui/core";
import pic from './blank.jpg';
// import bmw from '../../images/bmw-3.png';

const style = {
    imgResult: {
        backgroundPosition: 'center center',
        bacgrkoundRepeat: 'no-repeat',
        width: 250,
        height: 150
    },
    cardTitle: { position: 'absolute', left: 15, },
    cardPrice: { position: 'absolute', right: 15, },
    card: { paddingBottom: 30, marginRight: 20 },
}

class CarCard extends React.Component {

    state = { pic: pic };

    // console.log(props.vehicle);

    handleClick = () => {
        const value = this.props.vehicle;
        this.props.openModal(value); // pass in the vehicle id
    }

    render() {
        return (
            <Button onClick={this.handleClick} style={style.card}>
                {/* <Card>
                <CardActionArea style={style.card}> */}
                {/* <CardMedia
                        image="./blank.jpg"
                        title="Coming Soon"
                        /> */}
                <Grid>
                    <Grid item>
                        {this.props.vehicle.img === null ?
                            <img src={pic}
                                style={style.imgResult}
                                alt={this.props.vehicle.make} /> :
                            <img
                                src={require(`../../${this.props.vehicle.img.vehicleImg}`)}
                                style={style.imgResult}
                                alt={this.props.vehicle.make} />
                        }
                    </Grid>
                    <Grid item>
                        <Typography style={style.cardTitle}>{this.props.vehicle.make}</Typography>
                        <Typography style={style.cardPrice}>{this.props.vehicle.price} Eth</Typography>
                    </Grid>
                </Grid>
                {/* </CardActionArea>
                </Card> */}
            </Button>
        );
    }
}

export default CarCard;