import React from 'react'

import ScanQRCodeView from './component/ScanQRCodeView';
import '../app/base.css'
import AppBar from "../component/AppBar/AppBar";

const title = "Scan attraction";

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