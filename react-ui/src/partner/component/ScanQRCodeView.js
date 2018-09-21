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


const api = '/graphql';


const query = `
	query QrRead($data: String) {
		QrRead(data: $data) {
			_id
			first_name
			last_name
			email
		}
	}
`;



const fetchInit = data => ({
	mode: 'cors',
	method: 'post',
	json: true,
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		"query": query,
		"variables": {
			"touristData": data
		},
	})
});



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
        	fetch(api, fetchInit(result))
		        .then(res => res.text())
		        .then(out => {
		        	const json = JSON.parse(out).touristData.readQr;
		        	console.log(json);
		        	if (json.user)
				        this.setState({ scanned: true });
		        })
		        .catch(e => console.log(e));
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
                              delay={100}
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