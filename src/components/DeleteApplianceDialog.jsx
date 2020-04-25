import React, { Component } from 'react'

class DeleteApplianceDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            serialNumber: '',
            brand: '',
            model: '',
        }
    }

    componentWillReceiveProps(props) {
        if (props.details) {
            this.setState({
                serialNumber: props.details.serialNumber,
                brand: props.details.brand,
                model: props.details.model
            })
        }
    }

    render() {
        if (!this.props.show)
            return null
        else
            return (
                <div className="app-modalDialog deleteAppliance-dialog">
                    <div className="window">
                        <div className="title flex-center">
                            <span className="title-name">DELETE APPLIANCE</span>
                        </div>
                        <div className="content">
                            <div className="row">
                                Are you sure want to delete the following appliance ?
                            </div>
                            <div className="row">
                                <div className="details">
                                    <span className="detailsLabel">Serial No</span>
                                    <span className="collen">:</span>
                                    <span className="data">{this.state.serialNumber}</span>
                                </div>
                                <div className="details">
                                    <span className="detailsLabel">Brand</span>
                                    <span className="collen">:</span>
                                    <span className="data">{this.state.brand}</span>
                                </div>
                                <div className="details">
                                    <span className="detailsLabel">Model</span>
                                    <span className="collen">:</span>
                                    <span className="data">{this.state.model}</span>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button className="negativeBtn" onClick={this.props.onCloseCB}>CANCEL</button>
                            <button className="left-btn deleteBtn"
                            >
                                DELETE
                            </button>
                        </div>
                    </div>
                </div >
            )
    }
}

export default DeleteApplianceDialog;