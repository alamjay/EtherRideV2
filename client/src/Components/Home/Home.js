import React from "react";
import {
    Grid,
    TextField,
    Button,
} from "@material-ui/core";
import CarCard from './CarCard';

const style = {
    SearchGrid: { position: "relative", marginTop: 20 },
    Paper: { padding: 10 },
    grid: { width: "60%" },
    submitBtn: { marginTop: 10, backgroundColor: '#4286f4', color: 'white', marginLeft: 20 },
    resultGrid: { marginTop: 30, marginLeft: 10 },
    wrapper: { paddingLeft: 50, paddingRight: 50 },
    TextField: { maxWidth: 200 },
    random: { width: 200, height: 200, backgroundColor: 'grey', margin: 10 }
};

class Home extends React.Component {
    state = {
        open: false, age: null, selectedDate: null,
        listKey: null, getVehicleDataKey: null, numVehiclesDataKey: null,
        vehiclesCount: 1, vehicles: this.props.vehicles, selectedVehicle: null
    };

    // saveVehicle = (data) => {
    //     const vehicle = { make: '', model: '', price: 0, location: '' };
    //     vehicle.make = data[1];
    //     vehicle.model = data[2];
    //     vehicle.price = data[3];
    //     vehicle.location = data[4];
    //     this.state.vehicles.push(vehicle);
    // }

    showVehicle = () => {
        const show = [];
        for (let i = 0; i < this.state.vehicles.length; i++) {
            // return <CarCard vehicle={this.state.vehicles[i]} openModal={this.onVehicleInfo}/>
            show.push(<Grid item md={3} key={i}><CarCard vehicle={this.state.vehicles[i]} openModal={this.onVehicleInfo} /></Grid>);
        }
        return show;
    }

    onVehicleInfo = (vehicleValue) => {
        this.setState({ selectedVehicle: vehicleValue });
        this.props.onModal(vehicleValue);
    }

    componentDidMount() {
        // const pic = require('./blank.jpg');
        // const dateAndTimePicker = this.props.dateAndTimePicker;
        const { drizzle } = this.props;
        const contract = drizzle.contracts.Vehicleshare;
        const listKey = contract.methods["vehicleList"].cacheCall();
        this.setState({ listKey });
    };

    componentDidUpdate() {
    }

    componentWillUnmount() {
        // this.unsubscribe();        
    }


    handleChange = date => {
        this.setState({ selectedDate: date });
    };

    render() {
        // const contract = this.props.drizzle.contracts.Vehicleshare;
        // const { Vehicleshare } = this.props.drizzleState.contracts;
        // const vehicleList = Vehicleshare.vehicleList[this.state.listKey];
        // console.log(vehicleList && vehicleList.value); // same as console.log(res ? res.value: null);
        // if(vehicleList === undefined) {
        // return <div>Loading...</div>
        // }
        return (
            <div style={style.wrapper}>
                <Grid container style={style.SearchGrid} space={9}>
                    <Grid item xs={2}>
                        <TextField
                            id="location"
                            label="Location"
                            placeholder="Where"
                            InputLabelProps={{ shrink: true, }}
                            style={style.TextField} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="startDateTime"
                            label="Start Date"
                            type="datetime-local"
                            defaultValue="2019-02-07T10:30"
                            className={this.props.dateAndTimePicker}
                            InputLabelProps={{ shrink: true, }}
                            style={style.TextField}
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
                            style={style.TextField}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Button style={style.submitBtn}>Submit</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={24} style={style.resultGrid}>
                        {this.showVehicle()}
                        {/* <div style={style.random}></div> */}
                </Grid>
            </div>
        );

        // return (
        // <div>Something is wrong...</div>
        // );
    }
};

export default Home;
