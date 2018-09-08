import React from 'react';
import PropTypes from "prop-types";
import styled from "styled-components";
import AppBar from "./component/AppBar/AppBar";
import BottomNavigationBar from "./component/BottomNavigationBar/BottomNavigationBar";


const Container = styled.div`
	position: relative;
	height: 100%;
	overflow: hidden;
`;

const ChildrenContainer = styled.div`
	overflow-y: scroll;
	z-index: 4;
	// margin-bottom: ${props => props.bottomBarHeight};
	height: calc(100% - ${props => props.appBarHeight}px - ${props => props.bottomBarHeight}px);
`;

class App extends React.Component {
	state = {
		appBarHeight: 0,
		bottomBarHeight: 0
	};

	static propTypes = {
		title: PropTypes.string,
		itemSelected: PropTypes.string.isRequired
	};

	static defaultProps = {
		title: "Title"
	};

	updateAppBarHeight = (height) => {
		this.setState({appBarHeight: height});
	};

	updateBottomBarHeight = (height) => {
		this.setState({bottomBarHeight: height});
		if (this.props.updateBarHeight !== undefined)
			this.props.updateBarHeight(height);
	};

	render() {
		return (
			<Container id="App" style={{position: 'relative'}}>
				<AppBar
					title={ this.props.title }
					onMount={this.updateAppBarHeight}
					backBtn={this.props.backBtn}
					homeBtn={this.props.homeBtn}
					onClickBackBtn={this.props.onClickBackBtn}
				/>
				<ChildrenContainer
					id={"App-container"}
					appBarHeight={this.state.appBarHeight}
					bottomBarHeight={this.state.bottomBarHeight}
				>
					{this.props.children}
				</ChildrenContainer>
				<BottomNavigationBar itemSelected={ this.props.itemSelected } onMount={this.updateBottomBarHeight}/>
			</Container>
		);
	}
}

export default App;