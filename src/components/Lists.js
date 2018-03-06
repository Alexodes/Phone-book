import React, { Component } from 'react';
import List from './List';

export default class Lists extends Component {

        render() {
            const { users,
                    index, 
                    name, 
                    address, 
                    company, 
                    phone, 
                    handleDeleteUser, 
                    handleChangeName, 
                    handleSortByIndex, 
                    handleSortByName, 
                    handleSortByAddress, 
                    handleSortByCompany,
                    handleChangeAddress,
                    handleChangeCompany,
                    handleChangePhone } = this.props;
            return (
                <div>
                    <ul className="list-header">
                        <li onClick={event => handleSortByIndex()}>Index</li>
                        <li onClick={event => handleSortByName()}>Name</li>
                        <li onClick={event => handleSortByAddress()}>Address</li>
                        <li onClick={event => handleSortByCompany()}>Company</li>
                        <li>Phone</li>
                        <li></li>
                    </ul>
                    {
                        users.map(user => {
                            return (
                                <List 
                                    key={user.id}
                                    index={user.id}
                                    name={user.name}
                                    address={user.address.street}
                                    company={user.company.name}
                                    phone={user.phone}
                                    handleDeleteUser={handleDeleteUser}
                                    handleChangeName={handleChangeName}
                                    handleChangeAddress={handleChangeAddress}
                                    handleChangeCompany={handleChangeCompany}
                                    handleChangePhone={handleChangePhone}
                                    />
                            )
                        })
                    }
                </div>
            )
    }        
}
