import React from 'react';
import MaskedInput from 'react-maskedinput';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class AddUser extends React.PureComponent {

  static propTypes = {
    organizations: React.PropTypes.instanceOf(Array).isRequired,
    role: React.PropTypes.string.isRequired,
    roleId: React.PropTypes.string.isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    fetchUsers: React.PropTypes.func,
    addUser: React.PropTypes.func,
  }

  state = {
    full_name: '',
    phone: '',
    email: '',
    username: '',
    organization_id: '',
    password: '',
    submit_password: '',
    messageEq: '',
    messageConfirm: '',
  };

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.fetchUsers();
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('addUser');
  }

  onAddUser = (event) => {
    if (formIsValid('#AddUser') &&
      this.state.password === this.state.submit_password) {
      event.preventDefault();
      this.props.addUser({
        full_name: this.state.full_name.trim(),
        phone: this.state.phone,
        email: this.state.email,
        username: this.state.username.trim(),
        password: this.state.password,
        organization_id: this.state.organization_id,
        role_id: this.props.roleId,
      });
    }
    if (this.state.submit_password !== '' && this.state.password !== '') {
      if (this.state.submit_password !== this.state.password) {
        event.preventDefault();
        this.setState({
          messageConfirm: 'Новый пароль и подтверждение не совпадают',
        });
      }
      if (this.state.submit_password === this.state.password) {
        this.setState({
          messageConfirm: '',
        });
      }
    }
  }

  render() {
    const actions = [
      <button
        className="Button ButtonLink"
        onClick={this.props.closeDialog}
      >
          Close
      </button>,
    ];
    const messageSuccessCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'success',
      );
    const messageErrorCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'error',
      );
    const errorCondition =
      this.state.old_password === this.state.new_password ||
      this.state.submit_password !== this.state.new_password;
    return (
      <Modal
        title="Add user"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="AddUser" className="DriverModal">
          <label htmlFor="fio" className="Required">Full Name</label>
          <input
            id="fio"
            type="text"
            className="Input"
            placeholder="Full Name"
            maxLength="255"
            pattern="[A-Za-zА-Яа-яЁё\s]{1,255}"
            value={this.state.full_name}
            onChange={event => this.setState({ full_name: event.target.value })}
            required
          />
          <label htmlFor="phone" className="Required">Номер телефона</label>
          <MaskedInput
            mask="+11111111111"
            pattern="^(\+1{1})?([1-9][0-9]{9})$"
            id="phone"
            type="tel"
            className="Input"
            placeholder="+1**********"
            value={this.state.phone}
            minLength="11"
            maxLength="11"
            onChange={event => this.setState({ phone: event.target.value })}
            required
          />
          <label htmlFor="email" className="Required">Enter email</label>
          <input
            id="email"
            className="Input"
            type="text"
            value={this.state.email}
            pattern="[^@]+@[^@]+\.[a-zA-ZА-Яа-я]{2,6}"
            maxLength="255"
            placeholder="Enter email"
            onChange={event => this.setState({ email: event.target.value })}
            required
          />
          <label htmlFor="username" className="Required">Login</label>
          <input
            id="username"
            type="text"
            className="Input"
            placeholder="Login"
            maxLength="255"
            value={this.state.username}
            onChange={event => this.setState({ username: event.target.value })}
            required
          />
          {this.props.role !== 'staff' &&
            <div>
              <label htmlFor="type" className="Required">Организация</label>
              <div className="Select-outer Select--fullWidth">
                <select
                  id="type"
                  className="Select"
                  defaultValue=""
                  onChange={(event) => {
                    this.setState({
                      organization_id: event.target.value,
                    });
                  }}
                  style={{ padding: '7px 30px 7px 12px' }}
                  required
                >
                  <option value="" className="disabled">Выберите организацию</option>
                  {this.props.organizations.map(item =>
                    <option key={item.id} value={item.id}>{item.short_name}</option>
                  )}
                </select>
              </div>
            </div>
          }
          <label htmlFor="password" className="Required">Enter password</label>
          <input
            id="password"
            className="Input"
            type="password"
            minLength="6"
            maxLength="16"
            placeholder="Enter password"
            value={this.state.password}
            onChange={event => this.setState({ password: event.target.value })}
            required
          />
          <label htmlFor="submit_password" className="Required">Подтвердите пароль</label>
          <input
            className="Input"
            id="submit_password"
            type="password"
            placeholder="Подтвердите пароль"
            minLength="6"
            maxLength="16"
            value={this.state.submit_password}
            onChange={event => this.setState({ submit_password: event.target.value })}
            required
          />
          <button
            className="Button ButtonPrimary"
            onClick={this.onAddUser}
          >
              Save
          </button>
        </form>
        {errorCondition &&
          <span className="Message-error">{this.state.messageEq} {this.state.messageConfirm}</span>
        }
        {messageSuccessCondition &&
          <span className="Message-success">{this.props.apiCallback.success.message}</span>
        }
        {messageErrorCondition &&
          <span className="Message-error">{this.props.apiCallback.error.message}</span>
        }
      </Modal>
    );
  }
}
