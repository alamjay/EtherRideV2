import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography
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
    card: { paddingBottom: 15, marginRight: 20 },
}

const CarCard = () => {

    return (
        <Card style={style.card}>
            <CardActionArea>
                {/* <CardMedia
                    image="./blank.jpg"
                    title="Coming Soon"
                    /> */}
                <img src={pic} style={style.imgResult}></img>
                <CardContent>
                    <Typography style={style.cardTitle}>BMW</Typography>
                    <Typography style={style.cardPrice}>£43</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CarCard;