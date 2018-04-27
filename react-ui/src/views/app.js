import React, { Component } from 'react';
import AppBar from "../component/AppBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "Undefined"};
    }

	render() {
		return (
			<div className="App">
				<header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
				</header>
				<AppBar title={this.state.name}/>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
