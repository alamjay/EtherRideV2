import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Button,
    Grid
} from "@material-ui/core";
import pic from './blank.jpg';

const style = {
    imgResult: {
        backgroundPosition: 'center center',
        bacgrkoundRepeat: 'no-repeat',
        width: '100%',
        height: 'auto'
    },
    cardTitle: { position: 'absolute', left: 15, },
    cardPrice: { position: 'absolute', right: 15, },
    card: { paddingBottom: 30, marginRight: 20 },
}

class CarCard extends React.Component {

    // console.log(props.vehicle);

    handleClick = () => {
        this.props.openModal();
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
                        <img src={pic} style={style.imgResult}></img>
                        </Grid>
                        <Grid item>                        
                        <Typography style={style.cardTitle}>{this.props.vehicle.make}</Typography>
                        <Typography style={style.cardPrice}>{this.props.vehicle.price}</Typography>
                        </Grid>
                    </Grid>
                {/* </CardActionArea>
                </Card> */}
            </Button>
        );
    }
}

export default CarCard;