import React from 'react';
import MaskedInput from 'react-maskedinput';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class EditUser extends React.PureComponent {

  static propTypes = {
    user: React.PropTypes.instanceOf(Object).isRequired,
    role: React.PropTypes.string.isRequired,
    organization: React.PropTypes.string.isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    editUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      full_name: props.user.user_profile.full_name,
      phone: props.user.user_profile.phone,
      email: props.user.user_info.email,
      username: props.user.user_info.username,
      submit_password: '',
      new_password: '',
      messageEq: '',
      messageConfirm: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('addUser');
  }

  onEditUser = (event) => {
    if (this.state.submit_password === '' && this.state.new_password === '') {
      if (formIsValid(`#EditUser-${this.props.user.id}`)) {
        event.preventDefault();
        this.props.editUser({
          user_id: this.props.user.id,
          full_name: this.state.full_name.trim(),
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username.trim(),
        });
      }
    } else if (this.state.submit_password !== this.state.new_password) {
      event.preventDefault();
      this.setState({
        messageConfirm: 'Новый пароль и подтверждение не совпадают',
      });
    } else {
      this.setState({
        messageConfirm: '',
      });
      if (formIsValid(`#EditUser-${this.props.user.id}`)) {
        event.preventDefault();
        this.props.editUser({
          user_id: this.props.user.id,
          full_name: this.state.full_name.trim(),
          phone: this.state.phone,
          email: this.state.email,
          username: this.state.username.trim(),
          password: this.state.new_password,
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
        title="Edit user"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <div>
          <div style={{ marginBottom: '15px', marginTop: '-10px' }}><strong>Role: </strong>{this.props.role}</div>
          {this.props.organization &&
            <div style={{ marginBottom: '15px', marginTop: '-10px' }}><strong>Организация: </strong>{this.props.organization}</div>
          }
          <form id={`EditUser-${this.props.user.id}`} className="DriverModal">
            <label htmlFor="fio" className="Required">ФИО</label>
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
              id="phone"
              type="tel"
              className="Input"
              placeholder="+1**********"
              pattern="^(\+1{1})?([1-9][0-9]{9})$"
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
            <label htmlFor="password">Введите новый пароль</label>
            <input
              id="password"
              className="Input"
              type="password"
              minLength="6"
              maxLength="16"
              placeholder="Введите новый пароль"
              value={this.state.new_password}
              onChange={event => this.setState({ new_password: event.target.value })}
              required={this.state.new_password.length > 0}
            />
            <label htmlFor="submit_password">Подтвердите новый пароль</label>
            <input
              className="Input"
              id="submit_password"
              type="password"
              placeholder="Подтвердите новый пароль"
              minLength="6"
              maxLength="16"
              value={this.state.submit_password}
              onChange={event => this.setState({ submit_password: event.target.value })}
              required={this.state.submit_password.length > 0}
            />
            <button
              className="Button ButtonPrimary"
              onClick={this.onEditUser}
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
        </div>
      </Modal>
    );
  }
}
