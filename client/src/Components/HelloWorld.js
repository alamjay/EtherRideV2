import React from 'react';

class HelloWorld extends React.Component {
    state = {world: 'world'};
    render() {
        console.log(this.state.world);
        return <div>{this.state.world}</div>
    }
}

export default HelloWorld;