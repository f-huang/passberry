import React from "react";
import "./AppBar.css";

class AppBar extends React.Component {
    render() {
        return (
            <div className="AppBar">
                <h1 className="AppBar-title">{this.props.title}</h1>
            </div>
        )
    }
}

AppBar.defaultProps = {
    title: "Title"
};

export default AppBar;