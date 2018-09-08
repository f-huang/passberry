import React, {Component} from "react";
import PropTypes from "prop-types";
import "./AttractionPreviewGrid.css";
import AttractionPreview from "../AttractionPreview/AttractionPreview";


const N_CELL_PER_ROW = 3;


const getCell = (attraction, callbacks) => {
	return <AttractionPreview
	                   switchMode={ callbacks.switchMode }
	                   switchSelect={ callbacks.switchSelect}
	                   editionMode={ callbacks.editionMode }
	                   addInChart={ callbacks.addInChart }
	                   attraction={ attraction }
	                   selected={ attraction.selected }
	                   key={ attraction.name }/>
};

const getRows = (attractions, callbacks) => {
	const ret = [];
	for (let i = 0; i < attractions.length; i += N_CELL_PER_ROW) {
		const cells = [];
		for (let j = i; j < attractions.length && j < i + N_CELL_PER_ROW; j++) {
			cells.push(getCell(attractions[j], callbacks));
		}
		ret.push(<tr key={i} className={"AttractionPreview-row"}>{cells}</tr>);
	}
	return ret;
};

const order = (attractions) => attractions ? attractions.sort((a, b) => b.wanted - a.wanted) : null;

class AttractionPreviewGrid extends Component {
	state = {
		attractions: order(this.props.attractions),
	};

	static propTypes = {
		attractions: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
		})).isRequired,
		editionMode: PropTypes.bool.isRequired,
		addInChart: PropTypes.func.isRequired,
		switchState: PropTypes.func.isRequired,
		switchSelect: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.switchMode = this.switchMode.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ attractions: order(nextProps.attraction) })
	}

	switchMode = () => {
		this.props.switchState();
	};

	render() {
		const rows = getRows(this.state.attractions, {
			switchMode: this.switchMode,
			switchSelect: this.props.switchSelect,
			editionMode: this.props.editionMode,
			addInChart: this.props.addInChart
		});
		return (
			<table className={"AttractionPreviewGrid"}>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}

export default AttractionPreviewGrid;