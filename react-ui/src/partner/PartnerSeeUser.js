import React from 'react'
import UserProfile from './component/UserProfile';
import EventInfo from './component/EventInfo';
import Buttons from './component/ValidationButtons'

import profilePicture from './image/profile_picture.jpg'
import '../app/base.css'


const user = {
    _id: "1234-abcd-5678",
    picture: profilePicture,
    firstName: "Fanny",
    lastName: "Huang",
    email: "fhuang@student.42.fr",
    age: 20,
};

const event = {
    _id: "0987-dcba-6543",
    partner: "Association sportive de Monaco football club",
    partnerShort: "AS Monaco",
    type: "Soccer Game",
    location: "Louis II Stadium",
    name: "PSG - Monaco",
    date: "31/03/2018",
    hour: "21:05",
    seat: {
        tribune: "Seconde E",
        access: "E",
        row: "4",
        spot: "36"
    }
};

const styles = {
    container: {
        backgroundColor: "#ffffff",
        zIndex: "1",
        position: "absolute",
        top: "5vh",
        left: "50%",
        transform: "translate(-50%, 0%)",
        padding: "2vh",
        width: "85%",
        boxShadow: "inset 0 0 2px #cccccc, 0 0 2px #cccccc",
        borderRadius: "16px",
        overflow: "hidden",
    },
    header: {
        width: "100vw",
        height: "30vh",
        maxHeight: "300px",
        display: "block",
        background: "-webkit-linear-gradient(left, #894399, #fc7bb7)"
    }
};


class PartnerSeeUser extends React.Component {
    render() {
        return (
            <div>
                <div className="PartnerSeeUser-header" style={styles.header}/>
                <div className="PartnerSeeUser" style={styles.container}>
                    <UserProfile className="PartnerSeeUser-user" user={user}/>
                    <EventInfo className="PartnerSeeUser-event" event={event}/>
                    <Buttons className="PartnerSeeUser-buttons"/>
                </div>
            </div>
        );
    }
}

export default PartnerSeeUser