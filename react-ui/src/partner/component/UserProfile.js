import React from 'react'
import UserProfilePicture from "./UserProfilePicture";

import themes from '../../../app/themes'

const styles = {
    container: {
        height: "100%",
        width: "100%",
        display: "block",
        textAlign: "center",
    },
    container2: {
        position: "relative"
    },
    age: {
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, -70%)",
        padding: "8px 10px",
        borderRadius: "50%",
        border: "0.09em solid white",
        backgroundColor: themes.colorPrimary
    },
    picture: {
        margin: "0 auto",
    },
    identity: {
        margin: "0 auto",
    },
    names: {
        fontSize: "1.4em",
        fontWeight: "bold",
        marginBottom: 0
    },
    email: {
        fontSize: "1em",
        color: themes.lightGrey,
        margin: "8px 0 0 0"
    },
    id: {
        fontSize: "1em",
        color: themes.lightGrey,
        marginTop: "8px",
        fontStyle: "italic"
    }
};

class UserProfile extends React.Component {
    render() {
        return (
            <div className="UserProfile" style={styles.container}>
                <div className="UserProfile-pic-age" style={styles.container2}>
                    {/*<UserProfilePicture className="UserProfile-picture" style={styles.picture} picture={this.props.user.picture}/>*/}
                    <div className="UserProfile-age" style={styles.age}>{this.props.user.age}</div>
                </div>
                <div className="UserProfile-identity" style={styles.identity}>
                    <p className="UserProfile-identity-details" style={styles.names}>{this.props.user.lastName} {this.props.user.firstName}</p>
                    <p className="UserProfile-identity-details" style={styles.email}>{this.props.user.email}</p>
                    <p className="UserProfile-identity-details" style={styles.id}>{this.props.user._id}</p>
                </div>
            </div>
        );
    }
}

export default UserProfile