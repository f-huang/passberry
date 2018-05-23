import React from "react";

import "./BottomNavigationBar.css";


const showTitle = false;
const showIcons = true;


class BottomNavigationItem extends React.Component {
	render() {
		return (
			<li className="BottomNavigationItem" onClick={(e) => this.props.handleClick(e, this.props.item.location)}>
				{(showIcons) && <img className="BottomNavigationItem-icon"
				                     src={this.props.isSelected ? this.props.item.iconSelected : this.props.item.icon}
				                     alt={this.props.item.alt}/>}
				{(showTitle) && <h6 className="BottomNavigationItem-title"> {this.props.item.title}</h6>}
			</li>
		)
	}
}

export default BottomNavigationItem