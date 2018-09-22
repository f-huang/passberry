import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import "./AttractionPreview.css";


import defaultImage from "../../../assets/default-image.png";


class AttractionPreview extends Component {

	static propTypes = {
		history: PropTypes.shape({
			push: PropTypes.func.isRequired,
		}),
		// attraction: PropTypes.object.isRequired,
		addInChart: PropTypes.func.isRequired,
		switchMode: PropTypes.func.isRequired,
		editionMode: PropTypes.bool.isRequired,
		selected: PropTypes.bool.isRequired
	};

	static defaultProps = {
		editionMode: false,
		selected: false
	};

	constructor(props) {
		super(props);
		this.onContextMenu = this.onContextMenu.bind(this);
		this.onPress = this.onPress.bind(this);
		this.onPressRelease = this.onPressRelease.bind(this)

		this.justPressed = false;
	}

	onContextMenu = e => {
		e.preventDefault();
	};


	onPress = () => {
		if (!this.props.editionMode) {
			this.timer = setTimeout(() => this.props.switchMode(true), 500);
			this.justPressed = true;
		}
	};

	onPressRelease = () => {
		const to = `attraction/${this.props.attraction.id}/${this.props.attraction.name.replace(/\s+/g, '-').toLowerCase()}`;

		clearTimeout(this.timer);
		if (!this.props.attraction.wanted)
			this.props.addInChart(this.props.attraction.name);
		else {
			if (this.props.editionMode)
				this.props.switchSelect(this.props.attraction.name, this.justPressed ? true : !this.props.selected);
			else
				this.props.history.push(to);
		}
		this.justPressed = false;
	};

	render() {
		const cellClass = "AttractionPreview"
			+ (this.props.attraction.wanted ? "" : " AttractionPreview-unwanted");
		const editionClass = "AttractionPreview-edition"
			+ (this.props.selected && this.props.attraction.wanted ? " AttractionPreview-edition-selected" : "");
		return (
			<td className={cellClass} onTouchStart={ this.onPress } onTouchEnd={ this.onPressRelease }>
				{this.props.editionMode ? <div className={editionClass}/> : ""}
				<img className={"AttractionPreview-image"}
				     alt={`preview-${this.props.attraction.name}`}
				     onContextMenu={ this.onContextMenu }
				     src={this.props.attraction.image ? this.props.attraction.image : defaultImage}
				/>
				<div className={"AttractionPreview-details"}>
					<h2 className={"AttractionPreview-details-title"}>{this.props.attraction.name}</h2>
				</div>
			</td>
		);
	}
}

export default withRouter(AttractionPreview);