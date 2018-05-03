import React from "react";
import "./Carousel.css";

class CarouselImage extends React.Component {
	render() {
		const getStyle = (image) => {
			return {
				background: `url(${image}) no-repeat center center fixed`,
				backgroundSize: "cover",
			};
		};

		return(
			<li className="CarouselImage" style={ getStyle(this.props.image) }>
				<h2 className="CarouselImage-title">{this.props.title}</h2>
			</li>
		);
	}
}

const getCarouselImages = (items) =>
	items.map((item, index) =>
		<CarouselImage title={item.title} image={item.image} index={index} key={index}/>
	);

const getCarouselDots = (items, onDotClick, activeIndex) =>
	items.map((item, index) =>
		<li key={index} style={activeIndex === index ? {backgroundColor: 'black'} : {}} onClick={() => onDotClick(index)} />
	);

const styleAnimation = (index) => {
	return 	{
		marginLeft: `${- index * 100}vw`,
		// transform: `translateX(${- index * 100}vw)`,
		transition: "margin-left 1s linear",
	};
};


class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {index: 0};
		this.intervalId = 0;
	}

	componentDidMount() {
		this.intervalId = setInterval(this.onIntervalChange, 3000);
	}

	componentWillUnmount() {
		this.clearTimer();
	}

	onIntervalChange =  () => {
		const index = this.state.index + 1 === this.props.items.length ? 0 : this.state.index + 1;
		this.setState({index: index});
	};

	switchImage = (index) => {
		clearInterval(this.intervalId);
		this.setState({index: index});
		this.intervalId = setInterval(this.onIntervalChange, 3000);
	};

	clearTimer() {
		clearInterval(this.intervalId);
	}

	render() {
		return (
			<div className="Carousel">
				<ul className="Carousel-images" style={styleAnimation(this.state.index)}>
					{ getCarouselImages(this.props.items) }
				</ul>
				<ul className="Carousel-dots">
					{ getCarouselDots(this.props.items, this.switchImage, this.state.index) }
				</ul>
			</div>
		);
	}

}

export default Carousel;