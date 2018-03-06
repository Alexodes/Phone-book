import React,{ Component } from 'react';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state= {
            inNameEditMode: false,
            inAddressEditMode: false,
            inCompanyEditMode: false,
            inPhoneEditMode: false,
            value:'',
            valueForAddress:'',
            valueForCompany:'',
            valueForPhone:''
        };
        this.handlerForName = this.handlerForName.bind(this);
        this.handlerForAddress = this.handlerForAddress.bind(this);
        this.handlerForCompany = this.handlerForCompany.bind(this);
        this.handlerForPhone = this.handlerForPhone.bind(this);
    }

    componentDidMount() {
        this.setState({ value: this.props.name});
        this.setState({ valueForAddress: this.props.address});
        this.setState({ valueForCompany: this.props.company});
        this.setState({ valueForPhone: this.props.phone});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.name !== this.props.name) {
            this.setState({
                value: nextProps.name
            });
        } else if(nextProps.address !== this.props.address) {
            this.setState({
                valueForAddress: nextProps.address
            });
        } else if(nextProps.company !== this.props.company) {
            this.setState({
                valueForCompany: nextProps.company
            });
        } else if(nextProps.phone !== this.props.phone) {
            this.setState({
                valueForPhone: nextProps.phone
            });
        }
    }
    
    inputEditMode() {
        this.setState({ inNameEditMode: !this.state.inNameEditMode });
    }

    inputEditAddressMode() {
        this.setState({ inAddressEditMode: !this.state.inAddressEditMode });
    }

    inputEditCompanyMode() {
        this.setState({ inCompanyEditMode: !this.state.inCompanyEditMode });
    }

    inputEditPhoneMode() {
        this.setState({ inPhoneEditMode: !this.state.inPhoneEditMode });
    }

    handlerForName(event) { 
        let value = event.target.value;
        let nameId = this.props.index;
        this.setState({ value });
        this.props.handleChangeName(nameId, value);
    }

    handlerForAddress(event) {
        let valueForAddress = event.target.value;
        let addressId = this.props.index;
        this.setState({ valueForAddress });
        this.props.handleChangeAddress(addressId, valueForAddress);
    }

    handlerForCompany(event) {
        let valueForCompany = event.target.value;
        let companyId = this.props.index;
        this.setState({ valueForCompany });
        this.props.handleChangeCompany(companyId, valueForCompany);
    }

    handlerForPhone(event) {
        let valueForPhone = event.target.value;
        let phoneId = this.props.index;
        this.setState({ valueForPhone });
        this.props.handleChangePhone(phoneId, valueForPhone);
    }

    componentDidUpdate() {
        if(this.state.inNameEditMode) {
            this.editName.focus();
        } else if(this.state.inAddressEditMode) {
            this.editAddress.focus();
        } else if(this.state.inCompanyEditMode) {
            this.editCompany.focus();
        } else if(this.state.inPhoneEditMode) {
            this.editPhone.focus();
        }
    }

    render() {
        const { index, 
                name, 
                address, 
                company, 
                phone,
                handleDeleteUser } = this.props;

        const inputClassName = this.state.inNameEditMode ? '' : 'hidden';
        const labelClassName = this.state.inNameEditMode ? 'hidden' : '';

        const inputClassAddress = this.state.inAddressEditMode ? '' : 'hidden';
        const labelClassAddress = this.state.inAddressEditMode ? 'hidden' : '';

        const inputClassCompany = this.state.inCompanyEditMode ? '' : 'hidden';
        const labelClassCompany = this.state.inCompanyEditMode ? 'hidden' : '';

        const inputClassPhone = this.state.inPhoneEditMode ? '' : 'hidden';
        const labelClassPhone = this.state.inPhoneEditMode ? 'hidden' : '';

        return (
            <ul className="user-item">
                <li>{index}</li>
                <li>
                    <label className={ labelClassName }
                           onClick={(event) => this.inputEditMode()}
                    >{name}</label>
                    <input type="text"
                           onBlur={(event) => this.inputEditMode()}
                           onChange={event => this.handlerForName(event)}
                           value={this.state.value}
                           className={ inputClassName }
                           ref={(input) => this.editName = input}/>
                </li>
                <li>

                <label className={ labelClassAddress }
                           onClick={(event) => this.inputEditAddressMode()}
                    >{address}</label>
                    <input type="text"
                           onBlur={(event) => this.inputEditAddressMode()}
                           onChange={event => this.handlerForAddress(event)}
                           value={this.state.valueForAddress}
                           className={ inputClassAddress }
                           ref={(input) => this.editAddress = input}/>
                
                </li>
                <li>

                <label className={ labelClassCompany }
                           onClick={(event) => this.inputEditCompanyMode()}
                    >{company}</label>
                    <input type="text"
                           onBlur={(event) => this.inputEditCompanyMode()}
                           onChange={event => this.handlerForCompany(event)}
                           value={this.state.valueForCompany}
                           className={ inputClassCompany }
                           ref={(input) => this.editCompany = input}/>
                
                </li>
                <li>
                
                <label className={ labelClassPhone }
                           onClick={(event) => this.inputEditPhoneMode()}
                    >{phone}</label>
                    <input type="text"
                           onBlur={(event) => this.inputEditPhoneMode()}
                           onChange={event => this.handlerForPhone(event)}
                           value={this.state.valueForPhone}
                           className={ inputClassPhone }
                           ref={(input) => this.editPhone = input}/>
                  
                </li>
                <li><button type="button" id="btn-delete" onClick={event => handleDeleteUser(index)}>Delete</button></li>
            </ul>
        )
    }
}


