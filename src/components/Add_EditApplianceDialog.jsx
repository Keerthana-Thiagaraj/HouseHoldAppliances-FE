import React, { Component } from 'react'

class AddAppliances extends Component {

    constructor(props) {
        super(props)

        this.state = {
            serialnumber: '',
            brand: '',
            model: '',
            status: '',
            date: '',
            inputError: {}
        }
    }

    componentWillReceiveProps(props) {

        if (props.details) {
            this.setState({
                serialnumber: props.details.serialnumber,
                brand: props.details.brand,
                model: props.details.model,
                status: props.details.status,
                date: props.details.date
            })
        } else {
            this.setState({
                serialnumber: '',
                brand: '',
                model: '',
                status: '',
                date: ''
            })
        }
    }

    onChangeValue = (e) => {
        let name = e.target.name
        let val = e.target.value

        this.setState({ [name]: val })
    }

    onChangeStatus = (e) => {
        this.setState({ status: e.target.value })
    }

    onClickSave = () => {
        let error = {}
        let placeReq = true

        // if (this.state.serialnumber === "") {
        //     placeReq = false
        //     error.serialnumber = "Serial number cannot be empty"
        // }
        if (this.state.brand === "") {
            placeReq = false
            error.brand = "Brand cannot be empty"
        }
        if (this.state.model === "") {
            placeReq = false
            error.model = "Model cannot be empty"
        }
        // if (this.state.date === "") {
        //     placeReq = false
        //     error.date = "Date cannot be empty"
        // }

        this.setState({ inputError: error })
        if (placeReq) {
            let data = {
                serialnumber: this.state.serialnumber,
                brand: this.state.brand,
                model: this.state.model,
                status: this.state.status,
                date: this.state.date
            }
            this.props.onClickSaveCB && this.props.onClickSaveCB(data)
            this.onClose()
        }
    }

    onClose = () => {
        this.setState({ inputError: {} })
        this.props.onCloseCB()
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
                                <div className={`input-div hasAddOn ${this.state.inputError.serialnumber ? 'errorInput' : ''}`}>
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.serialnumber}
                                        name="serialnumber"
                                        onChange={this.onChangeValue}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error">
                                        {this.state.inputError.serialnumber}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Brand :</div>
                                <div className={`input-div hasAddOn ${this.state.inputError.brand ? 'errorInput' : ''}`}>
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.brand}
                                        name="brand"
                                        onChange={this.onChangeValue}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error">
                                        {this.state.inputError.brand}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Model :</div>
                                <div className={`input-div hasAddOn ${this.state.inputError.model ? 'errorInput' : ''}`}>
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.model}
                                        name="model"
                                        onChange={this.onChangeValue}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error">
                                        {this.state.inputError.model}
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="label">Status :</div>
                                <div className={`input-div hasAddOn`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                    <select className="select-ele"
                                        value={this.state.status}
                                        onChange={this.onChangeStatus}
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">In Active</option>
                                    </select>
                                </div>
                                <div className="errorDiv">
                                    <span className="error"></span>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="label">Date Bought :</div>
                                <div className={`input-div hasAddOn ${this.state.inputError.date ? 'errorInput' : ''}`} >
                                    <div className="addOnIcon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                    </div>
                                    <input type="text" className="input-ele inputVal"
                                        value={this.state.date}
                                        name="date"
                                        onChange={this.onChangeValue}
                                    />
                                </div>
                                <div className="errorDiv">
                                    <span className="error">
                                        {this.state.inputError.date}
                                    </span>
                                </div>
                            </div> */}
                        </div>
                        <div className="footer">
                            <button className="negativeBtn" onClick={this.onClose}>CANCEL</button>
                            <button className="left-btn positiveBtn"
                                onClick={this.onClickSave}
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