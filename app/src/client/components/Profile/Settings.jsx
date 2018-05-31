import React from 'react';
import { browserHistory } from 'react-router';
import ProfileNav from './ProfileNav';
import HeaderContainer from '../../containers/header-container';
import formIsValid from '../../helpers/form-validation';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Settings extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    onChangePassword: React.PropTypes.func.isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  state = {
    old_password: '',
    new_password: '',
    submit_password: '',
    messageEq: '',
    messageConfirm: '',
    demoMessage: false,
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('settings');
  }

  onClickSubmit = (event) => {
    if (formIsValid('#Settings') &&
      this.state.old_password !== this.state.new_password &&
      this.state.new_password === this.state.submit_password) {
      event.preventDefault();
      this.props.onChangePassword({
        new_password: this.state.new_password,
        old_password: this.state.old_password,
      });
    }
    if (this.state.old_password === this.state.new_password) {
      event.preventDefault();
      this.setState({
        messageEq: 'Passwords must not be the same',
      });
    }
    if (this.state.old_password !== this.state.new_password) {
      this.setState({
        messageEq: '',
      });
    }
    if (this.state.submit_password !== this.state.new_password) {
      event.preventDefault();
      this.setState({
        messageConfirm: 'New password and confirmation do not match',
      });
    }
    if (this.state.submit_password === this.state.new_password) {
      this.setState({
        messageConfirm: '',
      });
    }
  }

  demoEdit = (event) => {
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  render() {
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
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Password change</h2>
          </div>
          <ProfileNav />
          <form id="Settings" className="Settings">
            <h3>password change</h3>
            <label htmlFor="old_password">Enter your current password</label>
            <input
              id="old_password"
              className="Input"
              type="password"
              placeholder="Enter your current password"
              maxLength="16"
              minLength="6"
              value={this.state.old_password}
              onChange={event => this.setState({ old_password: event.target.value })}
              required
            />
            <label htmlFor="new_password">Enter a new password</label>
            <input
              className="Input"
              id="new_password"
              type="password"
              placeholder="Enter a new password at least 6 characters"
              maxLength="16"
              minLength="6"
              value={this.state.new_password}
              onChange={event => this.setState({ new_password: event.target.value })}
              required
            />
            <label htmlFor="submit_password">Confirm a new password</label>
            <input
              className="Input"
              id="submit_password"
              type="password"
              placeholder="Confirm a new password"
              maxLength="16"
              minLength="6"
              value={this.state.submit_password}
              onChange={event => this.setState({ submit_password: event.target.value })}
              required
            />
            <div className="SettingsActions">
              <button className="Button ButtonPrimary"
                      // className="Button ButtonPrimary"
                      // onClick={this.onClickSubmit}>Save</button>
                      onClick={this.demoEdit}>Save</button>
              <a href="" onClick={browserHistory.goBack}>Cancel</a>
            </div>
          </form>
          {this.state.demoMessage &&
          <span className="Message-error">Not available in demo</span>
          }
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
      </div>
    );
  }

}
