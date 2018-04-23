import React, { Component } from 'react';
import AppBar from "../component/AppBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {name: "Undefined"};
    }

    // getTitle() {
    //     fetch(`/me`, { accept: 'application/json' })
    //         .then((response) => {
	 //            if (response.status >= 200 && response.status < 300) {
		//             return response;
	 //            }
	 //            const error = new Error(`HTTP Error ${response.statusText}`);
	 //            error.status = response.statusText;
	 //            error.response = response;
	 //            console.log(error);
	 //            throw error;
    //         })
    //         .then((response) => { return response.json() })
    //         .then((response) => {
    //         	this.setState({name: response.name})
    //         })
    //     .catch((error) => console.log(`An error occured ${error}`));
    // }

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
