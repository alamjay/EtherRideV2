import React from "react";
import {
    Grid,
    Paper,
    TextField,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Button,
    Card,
    CardMedia,
    CardHeader,
    CardActionArea,
    CardContent,
    Typography
} from "@material-ui/core";
import CarCard from './CarCard';

const style = {
    SearchGrid: { position: "relative", marginTop: 20 },
    Paper: { padding: 10 },
    grid: { width: "60%" },
    submitBtn: { marginTop: 10 },
    resultGrid: { marginTop: 30, marginLeft: 10 },
    wrapper: { paddingLeft: 50, paddingRight: 50 }
};

class Home extends React.Component {
    state = { age: null, selectedDate: null };

    componentDidMount() {
        const pic = require('./blank.jpg');
        const dateAndTimePicker = this.props.dateAndTimePicker;
    };


    handleChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        return (
            <Grid container md={12} style={style.wrapper}>
                <Grid container style={style.SearchGrid} space={9}>
                    <Grid item xs={2}>
                        <TextField
                            id="location"
                            label="Location"
                            placeholder="Where"
                            InputLabelProps={{ shrink: true, }} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="startDateTime"
                            label="Start Date"
                            type="datetime-local"
                            defaultValue="2019-02-07T10:30"
                            className={this.props.dateAndTimePicker}
                            InputLabelProps={{ shrink: true, }}
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            id="endDateTime"
                            label="End Date"
                            type="datetime-local"
                            defaultValue="2019-02-07T10:30"
                            className={this.props.dateAndTimePicker}
                            InputLabelProps={{ shrink: true, }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button style={style.submitBtn}>Submit</Button>
                    </Grid>
                </Grid>
                <Grid container space={12} style={style.resultGrid}>
                    {/* <Grid md={12}> */}
                        <Grid item md={3}>
                            <CarCard/>
                        </Grid>
                        <Grid item md={3}>
                            <CarCard/>
                        </Grid>
                        <Grid item md={3}>
                            <CarCard/>
                        </Grid>
                    {/* </Grid> */}
                </Grid>
            </Grid>
        );
    }
};

export default Home;
