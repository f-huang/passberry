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
`;

class App extends React.Component {
	static propTypes = {
		title: PropTypes.string,
		itemSelected: PropTypes.string.isRequired
	};

	static defaultProps = {
		title: "Title"
	};

	render() {
		return (
			<Container id="App" style={{position: 'relative'}}>
				<AppBar
					title={ this.props.title }
					backBtn={this.props.backBtn}
					homeBtn={this.props.homeBtn}
					onClickBackBtn={this.props.onClickBackBtn}
				/>
				<ChildrenContainer
					id={"App-container"}
				>
					{this.props.children}
				</ChildrenContainer>
				<BottomNavigationBar itemSelected={ this.props.itemSelected }/>
			</Container>
		);
	}
}

export default App;