import React from 'react'
import QrReader from 'react-qr-reader'

const styles = {
    searchBar: {

    },
    camera: {
        width: "100vw",
        height: "auto",
    }
};


class ScanQRCodeView extends React.Component {
    componentDidMount() {
        const constraints = { audio: false, video: {width: 800, height: 600 }};
        const getUserMedia = (params) => (
            new Promise((successCallback, errorCallback) => {
                navigator.mediaDevices.getUserMedia.call(navigator, params, successCallback, errorCallback);
            })
        );
        getUserMedia(constraints)
            .then((stream) => {
                const vendorURL = window.URL || window.webkitURL;
                this.video.src = vendorURL.createObjectURL(stream);
            })
            .catch((err) => {
               this.onError(err);
            });
    }

    state = {
        scanned: false,
        error: false
    };

    onScan = (result) => {
        if (result !== null) {
            this.setState({scanned: true});
        }
    };

    onError = (error) => {
        this.setState({error: "An error occurred : " + error});
    };

    render() {
        if (this.state.scanned) {
            return this.props.onSuccess();
        }
        return (
            <div className="ScanQRCodeView">
                <div className="ScanQRCodeView-searchBar">

                </div>
                <div className="ScanQRCodeView-camera" style={styles.camera}>
                    <QrReader className="ScanQRCodeView-camera-qr"
                              ref={(ref) => this.video = ref}
                              delay={300}
                              facingMode="environment"
                              onScan={this.onScan}
                              onError={this.onError}
                    />
                    { this.state.error ? <p>{ this.state.error }</p> : "" }
                </div>
            </div>
        )
    }
}

export default ScanQRCodeView