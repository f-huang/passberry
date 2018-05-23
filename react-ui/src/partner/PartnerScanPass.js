import React from 'react'
import { Redirect } from 'react-router-dom'

import ScanQRCodeView from './component/ScanQRCodeView';
import '../app/base.css'
import AppBar from "../component/AppBar/AppBar";

const title = "Scan pass";
const to = "/partner-see-customer";
const onSuccess = () => (
    <Redirect to={to} push={true}/>
);

class PartnerScanPass extends React.Component {
    render() {
        return (
            <div className="PartnerScanPass">
                <AppBar title={title}/>
                <ScanQRCodeView onSuccess={onSuccess}/>
            </div>
        )
    }
}

export default PartnerScanPass