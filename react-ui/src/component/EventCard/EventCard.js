import React from "react";
import "./EventCard.css";

class EventCard extends React.Component {
	render() {
		return (
			<div className="EventCard">
				<div className="EventCard-container">
					<h2 className="EventCard-title">{this.props.title}</h2>
				</div>
			</div>
		);
	}
}

const EventCards = (props) =>
	<div className="EventCard-List">
		{
			props.items.map((item, index) =>
				<EventCard key={index} title={item.title}/>
			)
		}
	</div>
;

export default EventCards;