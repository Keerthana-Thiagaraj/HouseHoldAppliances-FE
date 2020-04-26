import React, { Component } from 'react'

import Loader from './LoaderComponent'
import Add_EditAppliances from './Add_EditApplianceDialog';
import DeleteAppliance from './DeleteApplianceDialog';

import { placeRequest } from '../model/ApiCommunicator'
import { ApiURLs } from '../model/ServiceURLs'
import AppDialog from './AppDialog';

class HomeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appliancesList: [],
            errorMsg: '',
            showAddDialog: false,
            editDetails: null,
            editAppliance: false,
            showDeleteDialog: false,
            showLoader: false,
            searchValue: '',
            selectedSearchSelect: 'serialnumber',
            showAppDialog: false,
            appDialogErrorMsg: ''
        }
    }

    componentDidMount() {
        this.getApplianceList()
    }

    getApplianceList = () => {
        this.setState({ showLoader: true })
        placeRequest(
            ApiURLs.GET_APPLIANCE.url,
            ApiURLs.GET_APPLIANCE.method,
            {},
            this.getListSuccessCB,
            this.getListErrorCB
        )
    }

    getListSuccessCB = (resp) => {
        this.setState({ appliancesList: resp, errorMsg: '', showLoader: false })
    }

    getListErrorCB = (error) => {
        this.setState({ errorMsg: error.message, appliancesList: [], showLoader: false })
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
        this.setState({ showAddDialog: false, showDeleteDialog: false, showAppDialog: false })
    }

    onChangeSearchSelect = (e) => {
        let val = e.target.value
        this.setState({ selectedSearchSelect: val }, () => {
            if (this.state.searchValue.length)
                this.searchList(this.state.searchValue)
        })
    }

    onSearch = (e) => {
        let val = e.target.value
        this.setState({ searchValue: val })
        if (val.length) {
            this.searchList(val)
        } else {
            this.getApplianceList()
        }
    }

    searchList = (val) => {
        let urlObj = ApiURLs.SERACH_APPLIANCE
        let updatedUrl = urlObj.url + "?search=(" + this.state.selectedSearchSelect + ":" + val + ")"
        this.setState({ appliancesList: [], errorMsg: '' })
        placeRequest(
            updatedUrl,
            urlObj.method,
            {},
            this.searchListSuccessCB,
            this.searchListErrorCB
        )
    }

    searchListSuccessCB = (resp) => {
        if (resp.length)
            this.setState({ appliancesList: resp, errorMsg: '' })
        else
            this.setState({ appliancesList: [], errorMsg: 'No data found' })
    }

    searchListErrorCB = (error) => {
        if (error.message)
            this.setState({ appliancesList: [], errorMsg: error.message })
        else
            this.setState({ appliancesList: [], errorMsg: error })
    }

    clearSearch = () => {
        this.setState({ searchValue: '' })
        this.getApplianceList()
    }

    onDeleteAppliance = (serial) => {
        this.setState({ showLoader: true })
        let urlObj = ApiURLs.DELETE_APPLIANCE
        let updatedUrl = urlObj.url + "/" + serial
        placeRequest(
            updatedUrl,
            urlObj.method,
            {},
            this.deleteSuccessCB,
            this.deleteErrorCB
        )
    }

    deleteSuccessCB = (resp) => {
        this.setState({
            showLoader: false,
            showAppDialog: true,
            appDialogErrorMsg: "Successfully deleted"
        })
        this.getApplianceList()
    }

    deleteErrorCB = (error) => {
        this.setState({
            showLoader: false,
            appDialogErrorMsg: error.message ? error.message : error,
            showAppDialog: true
        })
    }

    onClickSave = (data) => {
        console.log(this.state.editAppliance)
        console.log(data)
        this.setState({ showLoader: true })
        let urlObj = ''
        if (this.state.editAppliance)
            urlObj = ApiURLs.UPDATE_APPLIANCE
        else
            urlObj = ApiURLs.ADD_APPLIANCE
        placeRequest(
            urlObj.url,
            urlObj.method,
            data,
            this.addApplianceSuccessCB,
            this.addApplianceErrorCB
        )
    }

    addApplianceSuccessCB = (resp) => {
        this.setState({ showLoader: false })
        this.getApplianceList()
    }

    addApplianceErrorCB = (error) => {
        this.setState({
            showLoader: false,
            appDialogErrorMsg: error.message ? error.message : error,
            showAppDialog: true
        })
    }

    render() {
        return (
            <div className="homePage">
                <div className="header">
                    <h2>My Home Appliances</h2>
                </div>
                <div className="body">
                    <div className="searchDiv">
                        <select className="searchSelect" onChange={(e) => this.onChangeSearchSelect(e)}>
                            <option value="serialnumber">Serial Number</option>
                            <option value="brand">Brand</option>
                            <option value="model">Model</option>
                            <option value="status">Status</option>
                        </select>
                        <div className="inputAddOn">
                            <input type="text" className="searchInput"
                                value={this.state.searchValue}
                                onChange={(e) => this.onSearch(e)}
                                placeholder="Search your appliances"
                            />
                            <i className="search-icon fa fa-search" aria-hidden="true"></i>
                        </div>
                        <div className="clearSearch">
                            {
                                this.state.searchValue.length ?
                                    <span onClick={this.clearSearch}><u>clear search</u></span>
                                    : null
                            }
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
                                                    <td>{item.serialnumber}</td>
                                                    <td>{item.brand}</td>
                                                    <td>{item.model}</td>
                                                    <td>{item.status}</td>
                                                    <td>{item.date}</td>
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
                                        this.state.errorMsg.length ?
                                            <tr>
                                                <td className="text-center">{this.state.errorMsg}</td>
                                            </tr>
                                            :
                                            <tr>
                                                <td className="text-center">Loading ...</td>
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
                    onClickSaveCB={this.onClickSave}
                />

                <DeleteAppliance show={this.state.showDeleteDialog}
                    onCloseCB={this.onCloseDialogs}
                    details={this.state.deleteDetails}
                    onDeleteCB={this.onDeleteAppliance}
                />

                <Loader show={this.state.showLoader} />

                <AppDialog show={this.state.showAppDialog}
                    message={this.state.appDialogErrorMsg}
                    onCloseCB={this.onCloseDialogs}
                />

            </div>
        )
    }
}

export default HomeComponent;