import React from "react";
import PropTypes from 'prop-types';
import { withRouter } from "react-router-dom";

//ICONS
import iconShop from "../../assets/icons/search-empty.svg";
import iconShopSelected from "../../assets/icons/search-full.svg";
import iconQR from "../../assets/icons/qr-empty.svg";
import iconQRSelected from "../../assets/icons/qr-full.svg";
import iconPass from "../../assets/icons/pass-empty.svg";
import iconPassSelected from "../../assets/icons/pass-full.svg";
import iconProfile from "../../assets/icons/profile-empty.svg";
import iconProfileSelected from "../../assets/icons/profile-full.svg";

//ITEM
import BottomNavigationItem from "./BottomNavigationBarItem";

//CSS
import "./BottomNavigationBar.css";

const items = [
	{
		title: "Shop",
		alt: "shop-icon",
		location: "/shop",
		icon: iconShop,
		iconSelected: iconShopSelected
	},
	{
		title: "QR",
		alt: "qr-code-icon",
		location: "/qr",
		icon: iconQR,
		iconSelected: iconQRSelected
	},
	{
		title: "Pass",
		alt: "pass-icon",
		location: "/pass",
		icon: iconPass,
		iconSelected: iconPassSelected
	},
	{
		title: "Profile",
		alt: "profile-icon",
		location: "/profile",
		icon: iconProfile,
		iconSelected: iconProfileSelected
	},
];

class BottomNavigationBar extends React.Component {
	constructor(props) {
		super(props);
		this.changePage = this.changePage.bind(this);
	}

	changePage(e, location) {
		if (this.props.location.pathname === location)
			return ;
		e.preventDefault();
		this.props.history.push(location);
	}

	render() {

	    return (
            <div className="BottomNavigationBar">
                {
                    items.map((item, i) => {
	                    return <BottomNavigationItem handleClick={this.changePage}
	                                                 history={this.props.history}
	                                                 item={item}
	                                                 key={i}
	                                                 isSelected={this.props.itemSelected === item.title}/>
                    })
                }
            </div>
        )
    };
}

BottomNavigationBar.propTypes = {
	itemSelected: PropTypes.string.isRequired
};

export default withRouter(BottomNavigationBar);