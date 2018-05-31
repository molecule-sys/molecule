import React from 'react';
import { browserHistory } from 'react-router';
import formIsValid from '../helpers/form-validation';

export default class Recovery extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    onRecovery: React.PropTypes.func,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  state = {
    email: '',
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('recovery');
  }

  onClickSubmit = (event) => {
    if (formIsValid('#Settings')) {
      event.preventDefault();
      this.props.onRecovery(this.state.email);
    }
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
    return (
      <div>
        <div className="Container">
          <div className="PageTitle">
            <img src="/static/images/enter_logo.png" alt="Логотип" />
          </div>
          <form id="Settings" className="Settings">
            <h3>Restore password</h3>
            <label htmlFor="email">Enter your email</label>
            <input
              id="email"
              className="Input"
              type="email"
              value={this.state.email}
              pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
              maxLength="255"
              placeholder="Enter your email"
              onChange={event => this.setState({ email: event.target.value })}
              required
            />
            <div className="SettingsActions">
              <button
                className="Button ButtonPrimary"
                onClick={this.onClickSubmit}
              >
                  Send new password
              </button>
              <a href="" onClick={browserHistory.goBack}>Cancel</a>
            </div>
          </form>
          {messageSuccessCondition &&
            <span className="Message-success">{this.props.apiCallback.success}</span>
          }
          {messageErrorCondition &&
            <span className="Message-error">{this.props.apiCallback.error}</span>
          }
        </div>
      </div>
    );
  }

}
