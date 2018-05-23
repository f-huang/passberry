import React from 'react'
// import logo from '../image/logo.svg'

class UserProfilePicture extends React.Component {
    render() {

        const styles = {
            container: {
                margin: "0 auto"
            },
            image: {
                width: "124px",
                height: "124px",
                background: "blue",
                borderRadius: "50%",
            }
        };
        return (
            <div className="UserProfilePicture" style={Object.assign(styles.container, this.props.style)}>
                <img className="UserProfilePicture-image"
                     style={styles.image}
                     src={this.props.picture}
                     alt="profile-pic"/>
            </div>
        );
    }
}

UserProfilePicture.defaultProps = {
    // picture: logo,
};

export default UserProfilePicture
