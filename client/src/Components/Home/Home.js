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
import VehicleInfo from "./VehicleInfo";

const style = {
    SearchGrid: { position: "relative", marginTop: 20 },
    Paper: { padding: 10 },
    grid: { width: "60%" },
    submitBtn: { marginTop: 10 },
    resultGrid: { marginTop: 30, marginLeft: 10 },
    wrapper: { paddingLeft: 50, paddingRight: 50 }
};

class Home extends React.Component {
    state = { open: false, age: null, selectedDate: null, 
        getVehicleListDataKey: null, getVehicleDataKey: null, numVehiclesDataKey: null, 
        vehiclesCount: 1, vehicles: []};

    saveVehicle = (data) => {
        const vehicle = { make: '', model: '', price: 0, location: '' };
        vehicle.make = data[1];
        vehicle.model = data[2];
        vehicle.price = data[3];
        vehicle.location = data[4];
        this.state.vehicles.push(vehicle);
    }

    showVehicle = () => {
        for (let i=0; i<this.state.vehicles.length; i++) {
            return <CarCard vehicle={this.state.vehicles[i]} openModal={this.onVehicleInfo}/>
        }
    }

    onVehicleInfo = () => {
        this.props.onModal();
    }

    componentDidMount() {
        const pic = require('./blank.jpg');
        const dateAndTimePicker = this.props.dateAndTimePicker;
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Rideshare;
        const getVehicleListDataKey = contract.methods["getVehicleList"].cacheCall();
        this.setState({ getVehicleListDataKey });

        drizzle.contracts.Rideshare.events.getVeh().on('data', event => {
            // console.log(event.returnValues);
            // this.setState({  });
            this.saveVehicle(event.returnValues);
        });
        // this.saveVehicle( ['', 'BMW', 'M3', 1, 'harlow' ] );
    };

    componentWillUnmount() {
        
    }


    handleChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        const { Rideshare } = this.props.drizzleState.contracts;
        const res = Rideshare.getVehicleList[this.state.getVehicleDataKey];
        // console.log(res && res.value); // same as console.log(res ? res.value: null);

        return (
            <div>
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
                            {this.showVehicle()}
                            {/* <CarCard vehicle={this.state.vehicles[0]} openModal={this.onVehicleInfo}/> */}
                        </Grid>
                    {/* </Grid> */}
                </Grid>
            </Grid>
            </div>
        );
    }
};

export default Home;
