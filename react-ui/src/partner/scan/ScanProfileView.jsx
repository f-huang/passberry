import React from 'react'

import ScanQRCodeView from './component/ScanQRCodeView';
import AppBar from "../../component/AppBar/AppBar";
import '../../app/base.css'

const title = "Scan activity";

class ScanProfileView extends React.Component {
    render() {
        return (
            <div className="PartnerScanPass">
                <AppBar title={title}/>
                <ScanQRCodeView/>
            </div>
        )
    }
}

export default ScanProfileView