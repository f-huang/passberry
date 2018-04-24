import React from 'react'
import themes from '../app/themes.js';

let items = {};
let showTitle = false;
let showIcons = true;

let styles = {
    container: {
        width: "100vw",
        height: "60px",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        textColor: themes.textColor,
        fontSize: "1em",
        bottom: 0,
        borderTop: "2px solid #eeeeee"
    },
    item: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 12vw",
        margin: "0 auto"
    },
    selectedItem: {
        backgroundColor: "#f9f9f9"
    },
    image: {
        height: "50%",
        width: "auto"
    },
    title: {
        margin: "0"
    }
};

class BottomNavigationItem extends React.Component {
    render() {
        let divStyle = (this.props.isSelected === true) ? Object.assign({}, styles.item, styles.selectedItem) : styles.item;
        return (
            <div className="BottomNavigationItem" style={divStyle}>
                {(showIcons) && <img className="BottomNavigationItem-icon"
                                     alt={this.props.item.alt}
                                     src={this.props.item.icon}
                                     style={styles.image}/>}
                {(showTitle) && <h6 className="BottomNavigationItem-title" style={styles.title}> {this.props.item.title}</h6>}
            </div>
        )
    }
}


class BottomNavigationBar extends React.Component {
    constructor(props) {
        super(props);
        items = props.items;
        if (props.showTitle)
            showTitle = props.showTitle;
        if (props.showIcons)
            showIcons = props.showIcons;
    }

    render() {
        let selected = this.props.selectedItem;
        return (
            <div className="BottomNavigationBar" style={styles.container}>
                {
                    items.map(function(item, i) {
                        const isSelected = (item === selected);
                        return <BottomNavigationItem item={item} key={i} isSelected={isSelected}/>
                    })
                }
            </div>
        )
    }
}

export default BottomNavigationBar