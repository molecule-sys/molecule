import React from 'react';
import MaskedInput from 'react-maskedinput';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class EditUser extends React.PureComponent {

  static propTypes = {
    user: React.PropTypes.instanceOf(Object).isRequired,
    userInfo: React.PropTypes.instanceOf(Object).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    fetchProfile: React.PropTypes.func,
    closeDialog: React.PropTypes.func.isRequired,
    editUser: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      full_name: props.userInfo.full_name,
      phone: props.userInfo.phone,
      email: props.user.email,
      demoMessage: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.fetchProfile();
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editUser');
  }

  onEditUser = (event) => {
    if (formIsValid(`#EditUser-${this.props.user.id}`)) {
      event.preventDefault();
      this.props.editUser({
        user_id: this.props.user.id,
        full_name: this.state.full_name.trim(),
        phone: this.state.phone,
        email: this.state.email,
        username: this.props.user.username,
      });
      this.props.clearCallbackResponse('editUser');
    }
  }

  demoEdit = (event) => {
    this.setState({demoMessage: true});
    event.stopPropagation();
    event.preventDefault();
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
    return (
      <Modal
        title="Edit profile"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <div>
          <form id={`EditUser-${this.props.user.id}`} className="DriverModal">
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
            <label htmlFor="phone" className="Required">Phone</label>
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
            <label htmlFor="email" className="Required">Email</label>
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
            {this.state.demoMessage &&
            <span className="Message-error">Not available in demo</span>
            }
            <button
              className="Button ButtonPrimary"
              // onClick={this.onEditUser}
              onClick={this.demoEdit}
            >
              Save
            </button>
          </form>
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
