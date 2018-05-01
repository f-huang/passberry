"use strict";

import React from 'react';

class TextInput extends React.Component {
	render() {
		return (
			<div>
				{this.props.label ? <label htmlFor={this.props.id}>{this.props.title}</label>: ""}
				<input className="TextInput"
				       type={this.props.type ? this.props.type : "text"}
				       id={this.props.id}
				       name={this.props.name}
				       placeholder={this.props.placeholder}
				       onChange={this.props.onChange}
				       onSubmit={this.props.onSubmit}
				/>
			</div>
		);
	}
};

export default TextInput;