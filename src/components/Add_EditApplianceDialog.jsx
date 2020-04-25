
import React, { Component } from 'react'

class AddAppliances extends Component {

    constructor(props) {
        super(props)

        this.state = {
            serialNumber: '',
            brand: '',
            model: '',
            status: '',
            dateBought: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.details) {
            this.setState({
                serialNumber: props.details.serialNumber,
                brand: props.details.brand,
                model: props.details.model,
                status: props.details.status,
                dateBought: props.details.dateBought
            })
        } else {
            this.setState({
                serialNumber: '',
                brand: '',
                model: '',
                status: '',
                dateBought: ''
            })
        }
    }

    render() {
        if (!this.props.show)
            return null
        else
            return (
                <div className="app-modalDialog addAppliance-dialog">
                    <div className="window">
                        <div className="title flex-center">
                            <span className="title-name">{this.props.edit ? "EDIT" : "ADD"} APPLIANCE</span>
                        </div>
                        <div className="content">
                            <div className="row">
                                <div className="label">Serial No :</div>
                                <div className={`input-div hasAddOn`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.serialNumber}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error"></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Brand :</div>
                                <div className={`input-div hasAddOn`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.brand}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error"></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Model :</div>
                                <div className={`input-div hasAddOn`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.model}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error"></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Status :</div>
                                <div className={`input-div hasAddOn`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select className="select-ele" value={this.state.status}>
                                        <option value="active">Active</option>
                                        <option value="inactive">In Active</option>
                                    </select>
                                </div>
                                <div className="errorDiv">
                                    <span className="error"></span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Date Bought :</div>
                                <div className={`input-div hasAddOn`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.dateBought}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error"></span>
                                </div>
                            </div>
                        </div>
                        <div className="footer">
                            <button className="negativeBtn" onClick={this.props.onCloseCB}>CANCEL</button>
                            <button className="left-btn positiveBtn"
                            >
                                {this.props.edit ? "UPDATE" : "SAVE"}
                            </button>
                        </div>
                    </div>
                </div >
            )
    }
}

export default AddAppliances;