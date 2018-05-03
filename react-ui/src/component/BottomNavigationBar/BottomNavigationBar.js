import React from "react";
import "./BottomNavigationBar.css";

import iconShop from "../../assets/icons/search-empty.svg";
import iconQR from "../../assets/icons/qr-empty.svg";
import iconPass from "../../assets/icons/pass-empty.svg";
import iconProfile from "../../assets/icons/profile-empty.svg";

const items = [
	{title: "Shop", alt: "shop-icon", icon: iconShop},
	{title: "QR", alt: "qr-code-icon", icon: iconQR},
	{title: "Pass", alt: "pass-icon", icon: iconPass},
	{title: "Profile", alt: "profile-icon", icon: iconProfile},
];

const showTitle = false;
const showIcons = true;

class BottomNavigationItem extends React.Component {
    render() {
        return (
            <div className="BottomNavigationItem">
                {(showIcons) && <img className="BottomNavigationItem-icon"
                                     alt={this.props.item.alt}
                                     src={this.props.item.icon}
                                    />}
                {(showTitle) && <h6 className="BottomNavigationItem-title"> {this.props.item.title}</h6>}
            </div>
        )
    }
}


class BottomNavigationBar extends React.Component {
    render() {
        return (
            <div className="BottomNavigationBar">
                {
                    items.map(function(item, i) {
                        // const isSelected = (item === selected);
                        return <BottomNavigationItem item={item} key={i}/>
                    })
                }
            </div>
        )
    }
}

export default BottomNavigationBar;