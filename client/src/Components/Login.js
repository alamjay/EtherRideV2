import React from "react";
import {TextField, Tabs, Tab} from '@material-ui/core'
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';

class Login extends React.Component {
    state = {
        stackId: null,
        dataKey: null,
        loginEmail: '', loginPassword: '',
        regFName: '',
        regLName: '',
        regEmail: '',
        regPassword: '',
    };

    onRegister = (e) => {
        if (e.keyCode === 13) {
            console.log(e.target.id);
            console.log(e.target.value);
    
            const { drizzle, drizzleState } = this.props;
            const contract = drizzle.contracts.Vehicleshare;
    
            const stackId = contract.methods["setUser"].cacheSend(
                drizzleState.accounts[0],
                e.target.value, 
                e.target.value, 
                e.target.value, 
                e.target.value, 
                {from: drizzleState.accounts[0]});
    
            this.setState({ stackId });   
        }
    };

    componentDidMount() {
        const { drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.Vehicleshare;
        const dataKey = contract.methods["getUser"].cacheCall(drizzleState.accounts[0]);
        this.setState({dataKey});
    }

    render() {
        const { Vehicleshare } = this.props.drizzleState.contracts;
        const res = Vehicleshare.getUser[this.state.dataKey];
        console.log(res && res.value);
        return (
            <div>
            {/* <AppBar position="static"> */}
            <Tabs 
            value={0}
            indicatorColor="primary"
            textColor="primary"
            centered>
                <Tab label="Login"/>
                <Tab label="Register"/>
            </Tabs>
            {/* </AppBar> */}
            <form>
                <label>Email</label>
                <TextField id="email"/>
                <label>Password</label>
                <TextField id="password"/>
            </form>
            <form>
            <label>First Name</label>
                <TextField id="firstName" onKeyDown={e => this.onRegister(e)}/>
                <label>Last Name</label>
                <TextField id="lastName"onKeyDown={e => this.onRegister(e)}/>
                <label>Email</label>
                <TextField id="email" onKeyDown={e => this.onRegister(e)}/>
                <label>Password</label>
                <TextField id="password" onKeyDown={e => this.onRegister(e)}/>
            </form>
            <br/>
            </div>
        );
    }
}

export default Login;
