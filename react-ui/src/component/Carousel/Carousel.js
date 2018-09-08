import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import defaultImage from "../../assets/default-image.png";

const Container = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	margin: 0 auto;
`;

const Images = styled.ul`
	margin-left: ${props => -props.index * 100}vw;
	transition: margin-left 1s linear;
	width: 100%;
	height: 30vh;
	display: flex;
	flex-direction: row;
`;

const Image = styled.li`
	display: inline-block;
	text-align: center;
	cursor: pointer;
	flex: 0 0 100%;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background-color: #dddddd;
	background: url(${props => props.image}) no-repeat center center;
	background-size: cover;
`;

const ImageTitle = styled.h2`
	visibility: hidden;
`;

const DotsContainer = styled.ul`
	position: absolute;
	display: flex;
	flex-direction: row;
	bottom: 1vh;
	left: 50%;
	transform: translateX(-50%);
`;

const Dot = styled.li`
	width: 8px;
	height: 8px;
	cursor: pointer;
	border: 1px solid black;
	border-radius: 50%;
	margin: 0 8px;
	
	&:hover {
		background-color: black;
	}
`;


const getCarouselImages = (items) => {
	if (items && items.length > 0)
		return items.map((item, index) =>
			<Image key={item.name + index} image={item.image}>
				<ImageTitle>{item.name}</ImageTitle>
			</Image>
		);
	else
		return <Image image={defaultImage}/>
};


const getCarouselDots = (items, onDotClick, activeIndex) => {
	if (items && items.length > 0)
		return items.map((item, index) =>
			<Dot key={index} style={activeIndex === index ? {backgroundColor: 'black'} : {}}
			    onClick={() => onDotClick(index)}/>

		);
	else
		return <Dot key={0} style={{backgroundColor: 'black'}}
		           onClick={() => onDotClick(0)}/>;
};


class Carousel extends React.Component {
	state = { index: 0 };

	static defaultProps = {
		items: []
	};

	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string,
			image: PropTypes.string.isRequired
		})).isRequired
	};

	constructor(props) {
		super(props);
		this.intervalId = 0;
	}

	componentDidMount() {
		if (this.props.items && this.props.items.length > 0)
			this.intervalId = setInterval(this.onIntervalChange, 3000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	onIntervalChange =  () => {
		const index = this.props.items ? (this.state.index + 1 === this.props.items.length ? 0 : this.state.index + 1) : 0;
		this.setState({index: index});
	};

	switchImage = (index) => {
		clearInterval(this.intervalId);
		this.setState({index: index});
		if (this.props.items && this.props.items.length > 0)
			this.intervalId = setInterval(this.onIntervalChange, 3000);
	};

	clearTimer() {
		clearInterval(this.intervalId);
	}

	render() {
		const images = getCarouselImages(this.props.items);
		const dots = getCarouselDots(this.props.items, this.switchImage, this.state.index);
		return (
			<Container>
				<Images index={this.state.index}>
					{ images }
				</Images>
				<DotsContainer>
					{ dots }
				</DotsContainer>
			</Container>
		);
	}

}

export default Carousel;