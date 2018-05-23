import React from 'react'

const style = {
    borderRadius: "4px",
    outline: "0",
    cursor: "pointer"
};


class Button extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = () => {
        this.props.onButtonClick()
    };

    render() {
        return (
            <button
                className="ButtonCircle"
                onClick={() => { this.handleClick()}}
                style={Object.assign({}, style, this.props.style)}
            >{this.props.text}
            </button>
        )
    }
}

export default Button