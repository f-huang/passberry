import React from 'react'

import themes from '../app/themes.js';

let styles = {
    container: {
        backgroundColor: themes.colorPrimary,
        maxHeight: "104px",
        padding: "1.5vh",
        borderBottom: "2px solid #eeeeee"
    },
    title: {
        margin: 0,
        color: themes.colorInverse,
        textAlign: 'center',
        fontSize: '1.5em',
    },
};

class AppBar extends React.Component {
    render() {
        return (
            <div className="AppBar" style={styles.container}>
                <h1 className="AppBar-title" style={styles.title}>{this.props.title}</h1>
            </div>
        )
    }
}

AppBar.defaultProps = {
    title: "Title"
};

export default AppBar