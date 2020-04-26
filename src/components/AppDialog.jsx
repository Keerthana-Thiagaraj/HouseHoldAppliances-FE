import React, { Component } from 'react'

class AppDialog extends Component {

    constructor(props) {
        super(props)

        this.state = {
            message: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props.message)
            this.setState({ message: props.message })
    }

    render() {
        if (!this.props.show)
            return null
        else
            return (
                <div className="app-modalDialog appDialog">
                    <div className="window">
                        <div className="title flex-center">
                            <span className="title-name">HOME APPLIANCES</span>
                        </div>
                        <div className="content">
                            <div className="row">
                                {this.props.message ? this.props.message : ''}
                            </div>
                        </div>
                        <div className="footer">
                            <button className="negativeBtn" onClick={this.props.onCloseCB}>CLOSE</button>
                        </div>
                    </div>
                </div>
            )
    }
}

export default AppDialog;