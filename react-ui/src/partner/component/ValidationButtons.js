import React from 'react'
import themes from '../../../app/themes';
import Button from './Button'
import { withRouter } from 'react-router-dom'

const styles = {
    container: {
        margin: "0 2vw",
        display: "flex",
        justifyContent: "center"
    },
    button: {
        border: "2px solid " + themes.colorPrimary,
        margin: "2vw",
        fontSize: "1.2em",
        width: "45vw",
        maxWidth: "200px",
        height: "8vh",
        maxHeight: "50px",
    },
    accept: {
        background: themes.colorPrimary,
        color: "#ffffff",
    },
    refuse: {
        backgroundColor: themes.colorInverse,
        color: themes.colorPrimary,
    }
};

const styleAccept = Object.assign({}, styles.button, styles.accept);
const styleRefuse = Object.assign({}, styles.button, styles.refuse);

const ButtonAccept = withRouter(({history, ...props}) => (
    <Button
        {...props}
        className="ValidationButtons-accept"
        text={"Accept"}
        style={styleAccept}
        onButtonClick={() => {history.push('/partner-scan-pass')}}
    />
));


const ButtonRefuse = withRouter(({history, ...props}) => (
    <Button
        {...props}
        className="ValidationButtons-refuse"
        text={"Refuse"}
        style={styleRefuse}
        onButtonClick={() => {history.push('/partner-scan-pass')}}
    />
));

class ValidationButtons extends React.Component {

    render() {
        return (
            <div className="ValidationButtons" style={styles.container}>
                <ButtonAccept/>
                <ButtonRefuse/>
            </div>
        )
    }
}

export default ValidationButtons