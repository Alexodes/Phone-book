import React,{ Component } from 'react';
import PropTypes from 'prop-types';

export default class List extends Component {
    constructor(props) {
        super(props);
        this.state= {
            inNameEditMode: false,
            value:''
        };
        this.handlerForName = this.handlerForName.bind(this);
    }

    componentDidMount() {
        this.setState({ value: this.props.name});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.name !== this.props.name) {
            this.setState({
                value: nextProps.name
            });
        }
    }
    
    inputEditMode() {
        this.setState({ inNameEditMode: !this.state.inNameEditMode });
    }

    handlerForName(event) { 
        let value = event.target.value;
        let nameId = this.props.index;
        this.setState({ value });
        this.props.handleChangeName(nameId, value);
    }

    componentDidUpdate() {
        if(this.state.inNameEditMode) {
            this.editName.focus();
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
                <li>{address}</li>
                <li>{company}</li>
                <li>{phone}</li>
                <li><button type="button" id="btn-delete" onClick={event => handleDeleteUser(index)}>Delete</button></li>
            </ul>
        )
    }
}


List.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    handleDeleteUser: PropTypes.func.isRequired,
    handleChangeName: PropTypes.func.isRequired
}


