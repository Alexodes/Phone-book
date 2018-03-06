import React, { Component } from 'react';
import data from '../data';
import _ from 'lodash';
import Lists from './Lists';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const DATA = _.cloneDeep(data);


export default class Root extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            search: '',
            // Sorting booleans
            sortByIndex: false,
            sortByName: false,
            sortByAddress: false,
            sortByCompany: false,
            // Modal
            modalIsOpen: false
        }
        // Functions binding
        this.handleDeleteUser = this.handleDeleteUser.bind(this);
        this.handleResetUsers = this.handleResetUsers.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSortByName = this.handleSortByName.bind(this);
        this.handleSortByIndex = this.handleSortByIndex.bind(this);
        this.handleSortByAddress = this.handleSortByAddress.bind(this);
        this.handleSortByCompany = this.handleSortByCompany.bind(this);
        this.handleAddNewUser = this.handleAddNewUser.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        
        // Modal Window Functions
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }



    // ---------------------------------



    //Load initial data with it copy
    componentDidMount() {
        this.setState({ users: DATA});
       
    }

    // Reset data to initial state
    handleResetUsers() {
        this.setState({ 
            users: DATA,
            search: '',
            sortByIndex: false,
            sortByName: false,
            sortByAddress: false,
            sortByCompany: false, });
       
    }

    handleDeleteUser(ID) {
        let stateCopy = this.state.users.slice();
        stateCopy = stateCopy.filter(user => {
            return user.id !== ID;
        });
        this.setState({ users: stateCopy });
       
    }

    handleSearch() {
        this.setState({ search: this.searchText.value });
    }

    // SORTING FUNCTIONS

    handleSortByIndex() {
        let stateCopy = this.state.users.slice();
        if(this.state.sortByIndex) {
            stateCopy.sort((a, b) => a.id !== b.id ? a.id > b.id ? -1 : 1 : 0);
            this.setState({ sortByIndex: !this.state.sortByIndex });
        } else {
            stateCopy.sort((a, b) => a.id !== b.id ? a.id < b.id ? -1 : 1 : 0);
            this.setState({ sortByIndex: !this.state.sortByIndex });
        }
        this.setState({ users: stateCopy});
    }

    handleSortByName() {
        let stateCopy = this.state.users.slice();
        if(this.state.sortByName) {
            stateCopy.sort((a, b) => a.name !== b.name ? a.name > b.name ? -1 : 1 : 0);
            this.setState({ sortByName: !this.state.sortByName });
        } else {
            stateCopy.sort((a, b) => a.name !== b.name ? a.name < b.name ? -1 : 1 : 0);
            this.setState({ sortByName: !this.state.sortByName });
        }
        this.setState({ users: stateCopy});
    }

    handleSortByAddress() {
        let stateCopy = this.state.users.slice();
        if(this.state.sortByAddress) {
            stateCopy.sort((a, b) => a.address.street !== b.address.street ? a.address.street > b.address.street ? -1 : 1 : 0);
            this.setState({ sortByAddress: !this.state.sortByAddress });
        } else {
            stateCopy.sort((a, b) => a.address.street !== b.address.street ? a.address.street < b.address.street ? -1 : 1 : 0);
            this.setState({ sortByAddress: !this.state.sortByAddress });
        }
        this.setState({ users: stateCopy});
    }

    handleSortByCompany() {
        let stateCopy = this.state.users.slice();
        if(this.state.sortByCompany) {
            stateCopy.sort((a, b) => a.company.name !== b.company.name ? a.company.name > b.company.name ? -1 : 1 : 0);
            this.setState({ sortByCompany: !this.state.sortByCompany });
        } else {
            stateCopy.sort((a, b) => a.company.name !== b.company.name ? a.company.name < b.company.name ? -1 : 1 : 0);
            this.setState({ sortByCompany: !this.state.sortByCompany });
        }
        this.setState({ users: stateCopy});
    }

    // MODAL FUNCTIONS
    openModal() {
        this.setState({modalIsOpen: true});
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleAddNewUser() {
        let copyState = this.state.users.slice();
        let indexes = [];
        for(let user of copyState) {
            indexes.push(user.id);
        }
        let biggest = Math.max(...indexes);
        let newIndex = biggest + 1;
        copyState.push({
            id: newIndex,
            name: this.newName.value,
            address: { street: this.newAddress.value},
            company: { name: this.newCompany.value},
            phone: this.newPhone.value
        });
        this.setState({ users: copyState });
        this.closeModal();
    }

    // Name edtion function
    handleChangeName(ID, newName) {
        let users = this.state.users.slice();
        for(let user of users) {
            if(user.id === ID) {
                user.name = newName;
            }
        }
        
        this.setState({ users });
       
    }

    render() {
        const copyState = this.state.users.slice();
        const filteredUsers = copyState.filter(user => {
            return  user.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1           ||
                    user.address.street.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                    user.company.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1   ||
                    user.phone.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        });

        return (
            <div className="wrapper">
                <nav className="navbar">
                <div className="for-buttons">
                    <button className="button-primary" id="btn-fetch-users">Fetch Users</button>
                    <button className="button-primary" id="btn-reset-users" onClick={event => this.handleResetUsers()}>Reset Users</button>
                    <span></span>
                    <button className="button-primary" id="btn-add-user" onClick={event => this.openModal()}>Add new subscriber</button>
                </div>

                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    className="Modal"
                    contentLabel="Example Modal"
                    >
                    <h4>New User Form</h4>
                    <div className="add-user-form">
                        <label htmlFor="Name">Name</label>
                        <input type="text" placeholder="Enter the name"    ref={(input) => { this.newName = input; }} />
                        <label htmlFor="Name">Address</label>
                        <input type="text" placeholder="Enter the address" ref={(input) => { this.newAddress = input; }} />
                        <label htmlFor="Name">Company</label>
                        <input type="text" placeholder="Enter the company" ref={(input) => { this.newCompany = input; }} />
                        <label htmlFor="Name">Phone</label>
                        <input type="text" placeholder="Enter the phone"   ref={(input) => { this.newPhone = input; }} />
                    </div>
                    <button onClick={event => this.handleAddNewUser()}>Add</button>
                </Modal>

                <div className="for-input three columns">
                    <input 
                        className="u-full-width" 
                        type="search" 
                        placeholder="Search for a subscriber" 
                        id="search-input" 
                        ref={(input) => { this.searchText = input; }}
                        onChange={this.handleSearch}
                        value = {this.state.search}
                    />
                </div>
                </nav>
                <div className="main">
                    <Lists
                        users={filteredUsers}   
                        handleDeleteUser={this.handleDeleteUser}
                        handleSortByName={this.handleSortByName}
                        handleSortByIndex={this.handleSortByIndex}
                        handleSortByAddress={this.handleSortByAddress}
                        handleSortByCompany={this.handleSortByCompany}
                        handleChangeName={this.handleChangeName}
                    />
                </div>
            </div>
        )
    }
}
