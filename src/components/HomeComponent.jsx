import React, { Component } from 'react'

import Loader from './LoaderComponent'
import Add_EditAppliances from './Add_EditApplianceDialog';
import DeleteAppliance from './DeleteApplianceDialog';

import { placeRequest } from '../model/ApiCommunicator'

class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appliancesList: [
                {
                    "serialNumber": "1",
                    "brand": "samsung",
                    "model": "S10",
                    "status": "active",
                    "dateBought": "12-APR-2020"
                },
                {
                    "serialNumber": "2",
                    "brand": "LG",
                    "model": "L100",
                    "status": "active",
                    "dateBought": "12-MAY-2020"
                },
                {
                    "serialNumber": "3",
                    "brand": "samsung",
                    "model": "S20",
                    "status": "active",
                    "dateBought": "22-APR-2020"
                },
                {
                    "serialNumber": "4",
                    "brand": "SONY",
                    "model": "SS30",
                    "status": "active",
                    "dateBought": "18-APR-2020"
                },
                {

                    "serialNumber": "5",
                    "brand": "HITACHI",
                    "model": "H39",
                    "status": "inactive",
                    "dateBought": "08-JAN-2020"

                }
            ],
            errorMsg: '',
            showAddDialog: false,
            editDetails: null,
            editAppliance: false,
            showDeleteDialog: false,
            showLoader: false
        }
    }

    onClickAdd = () => {
        this.setState({ editDetails: null, editAppliance: false, showAddDialog: true })
    }

    onClickEdit = (data) => {
        this.setState({ editDetails: data, editAppliance: true, showAddDialog: true })
    }

    onClickDelete = (data) => {
        this.setState({ deleteDetails: data, showDeleteDialog: true })
    }

    onCloseDialogs = () => {
        this.setState({ showAddDialog: false, showDeleteDialog: false })
    }

    render() {
        return (
            <div className="homePage">
                <div className="header">
                    <h2>My Home Appliances</h2>
                </div>
                <div className="body">
                    <div className="searchDiv">
                        <div className="inputAddOn">
                            <input type="text" className="searchInput"
                                placeholder="Search your Brand, Model, etc."
                            />
                            <i className="search-icon fa fa-search" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="tableDiv">
                        <div className="actionDiv">
                            <button className="positiveBtn"
                                onClick={this.onClickAdd}
                            >
                                Add Appliance
                            </button>
                        </div>
                        <table>
                            <thead className="thead-scroller">
                                <tr>
                                    <th>Serial Number</th>
                                    <th>Brand</th>
                                    <th>Model</th>
                                    <th>Status</th>
                                    <th>Date Bought</th>
                                    <th>Modify</th>
                                </tr>
                            </thead>
                            <tbody className="tbody-scroller">
                                {
                                    this.state.appliancesList.length ?
                                        this.state.appliancesList.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{item.serialNumber}</td>
                                                    <td>{item.brand}</td>
                                                    <td>{item.model}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.dateBought}</td>
                                                    <td className="actions">
                                                        <span className="edit"
                                                            onClick={() => this.onClickEdit(item)}
                                                        >
                                                            <u>Edit</u>
                                                        </span>
                                                        /
                                                        <span className="delete"
                                                            onClick={() => this.onClickDelete(item)}
                                                        >
                                                            <u>Delete</u>
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td>{this.state.errorMsg}</td>
                                        </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <Add_EditAppliances show={this.state.showAddDialog}
                    onCloseCB={this.onCloseDialogs}
                    edit={this.state.editAppliance}
                    details={this.state.editDetails}
                />

                <DeleteAppliance show={this.state.showDeleteDialog}
                    onCloseCB={this.onCloseDialogs}
                    details={this.state.deleteDetails}
                />

                <Loader show={this.state.showLoader} />
                
            </div>
        )
    }
}

export default HomeComponent;