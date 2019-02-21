import React from 'react';
import BgImage from './background-image.jpg';
import { Typography } from '@material-ui/core';

const style = {
    container: { paddingLeft: 0, paddingRight: 0 },
    background: {  width: '100%' },
    title: { position: 'relative', top: -550}
}

class About extends React.Component {

    render() {
        return (
            <div style={style.container}>
                <img style={style.background} src={BgImage} alt=""/>
                <Typography variant="display4" component="h1" style={style.title}> EtherRide </Typography>
                </div>
        );
    }

}

export default About;