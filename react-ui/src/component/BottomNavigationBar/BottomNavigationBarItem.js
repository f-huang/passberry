import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../app/theme";


const showTitle = true;
const showIcons = true;

const Item = styled.li`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 6;
	width: ${props => 100 / props.numberOfItems}vw;
`;

const Icon = styled.img`
	height: 50%;
	width: auto;
`;

const Title = styled.h6`
	margin: 2px 0 0 0;
	font-size: 0.4em;
	font-weight: lighter;
	user-select: none;
	color: ${props => props.isSelected ? theme.colorPrimary : 'inherit'}
`;


class BottomNavigationItem extends React.Component {
	static propTypes = {
		isSelected: PropTypes.bool,
		numberOfItems: PropTypes.number.isRequired
	};
	render() {
		const iconSrc = this.props.isSelected ? this.props.item.iconSelected : this.props.item.icon;
		const item =
			<Item onClick={(e) => this.props.handleClick(e, this.props.item.location)}
			      numberOfItems={this.props.numberOfItems}
			>
				{(showIcons) &&
				<Icon src={iconSrc} alt={this.props.item.alt}/>}
				{(showTitle) &&
				<Title isSelected={this.props.isSelected}> {this.props.item.name}</Title>}
			</Item>;
		return (item);
	}
}

export default BottomNavigationItem