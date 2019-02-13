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
    state = { age: null, selectedDate: null, getVehicleDataKey: null, numVehiclesDataKey: null, vehiclesCount: 1};

    getVehicles = (vehiclesCount) => {
        for(let i=0; i<vehiclesCount; i++) {
            this.getVehicle(this.props.drizzleState.accounts[0]);
        }
    }

    getVehicle = (vehicleID) => {
        const { Rideshare } = this.props.drizzleState.contracts;
        const res = Rideshare.getVehicle[this.state.getVehicleDataKey];
        //  datakey = this.props.drizzle.contracts.Rideshare.methods.getVehicle.cacheCall(vehicleID);
        // const veh = this.props.drizzle.contracts.Rideshare.methods.getVehicleList().call;
        console.log(res && res.value);    
    }

    componentDidMount() {
        const pic = require('./blank.jpg');
        const dateAndTimePicker = this.props.dateAndTimePicker;
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;
        const getVehicleDataKey = contract.methods["getVehicleList"].cacheCall();
        // const numVehiclesDataKey = contract.methods["getVehiclesCount"].cacheCall();
        this.setState({ getVehicleDataKey });
        // this.setState({ numVehiclesDataKey });
        // const vehicleCount = drizzleState.contracts.Rideshare.getVehiclesCount[this.state.getVehicleDataKey];
        this.getVehicles(1);
    };

    componentWillUnmount() {
        
    }


    handleChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { Rideshare } = this.props.drizzleState.contracts;
        const res = Rideshare.getVehicleList[this.state.getVehicleDataKey];
        // let vehiclesCount = Rideshare.getVehiclesCount[this.state.numVehiclesDataKey];
        // console.log(res && res.value); // same as console.log(res ? res.value: null);

        // for(let i=0; i< vehiclesCount.value; i++) {
            // console.log(vehiclesCount && vehiclesCount.value);
        // }
        return (
            <Grid container style={style.wrapper}>
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
