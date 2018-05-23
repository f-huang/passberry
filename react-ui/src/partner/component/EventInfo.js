import React from 'react'
import themes from '../../../app/themes'
const styles = {
    container: {
        maxWidth: "400px",
        width: "80vw",
        margin: "4vh auto",
        padding: "4px",
        textAlign: "center",
        backgroundColor: "#ffffff",
        boxShadow: "inset 0 0 3px #cccccc, 0 0 3px #cccccc",
        borderRadius: "16px",
        overflow: "hidden",
    },
    name: {
        fontSize: "1.5em"
    },
    date: {
        fontSize: "1em"
    },
    seating: {
        display: "flex",
        justifyContent: "space-between",
        padding: "0 3vw",
        boxShadow: "0px -1px #efefef"
    },
    seatingInfo: {
        padding: "0 2vw",
        margin: "4px",
    },
    seatingInfo2: {
        display: "flex"

    },
    seatingInfoLabel: {
        fontSize: "0.8em",
        color: themes.textColor
    }
};

class EventInfo extends React.Component {
    render() {
        const labelStyle = Object.assign({}, styles.seatingInfoLabel, styles.seatingInfo);
        return (
            <div className="EventInfo" style={styles.container}>
                <h1 className="EventInfo-name" style={styles.name}>{this.props.event.name}</h1>
                <h2 className="EventInfo-date-hour" style={styles.date}>{this.props.event.hour} {this.props.event.date} </h2>
                <h3 className="EventInfo-location">{this.props.event.location}</h3>
                <h4 className="EventInfo-type">{this.props.event.type}</h4>
                <div className="EventInfo-seating" style={styles.seating}>
                    <div className="EventInfo-seating-tribune">
                        <div>
                            <h4 className="EventInfo-seating-tribune EventInfo-seating-info" style={styles.seatingInfo}>{this.props.event.seat.tribune}</h4>
                            <p className="EventInfo-seating-tribune-label EventInfo-seating-info" style={labelStyle}>Tribune</p>
                        </div>
                    </div>
                    <div style={styles.seatingInfo2}>
                        <div>
                            <h4 className="EventInfo-seating-access EventInfo-seating-info" style={styles.seatingInfo}>{this.props.event.seat.access}</h4>
                            <p className="EventInfo-seating-access-label EventInfo-seating-info" style={labelStyle}>Accès</p>
                        </div>
                        <div>
                            <h4 className="EventInfo-seating-row EventInfo-seating-info" style={styles.seatingInfo}>{this.props.event.seat.row}</h4>
                            <p className="EventInfo-seating-row-label EventInfo-seating-info" style={labelStyle}>Rang</p>
                        </div>
                        <div>
                            <h4 className="EventInfo-seating-seat EventInfo-seating-info" style={styles.seatingInfo}>{this.props.event.seat.spot}</h4>
                            <p className="EventInfo-seating-seat-label EventInfo-seating-info" style={labelStyle}>Place</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventInfo