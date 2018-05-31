import React from 'react';
import { Link } from 'react-router';
import formIsValid from '../helpers/form-validation';

export default class Login extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    login: React.PropTypes.func.isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  state = {
    username: '',
    password: '',
    disabled: false,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      disabled: !Object.prototype.hasOwnProperty.call(nextProps.apiCallback, 'message'),
    });
    if (!Object.prototype.hasOwnProperty.call(nextProps.apiCallback, 'message')) {
      if (Object.prototype.hasOwnProperty.call(nextProps.profile, 'user_role')) {
        switch (nextProps.profile.user_role.code) {
          case 'SYSTEM_ADMIN': {
            // window.location.href = `http://localhost:8103/sign/${localStorage.getItem('token')}`;
            // window.location.href = `http://m2.molecule.ws/sign/${localStorage.getItem('token')}`;
            window.location.href = `http://demo.m2.molecule.ws/sign/${localStorage.getItem('token')}`;
            break;
          }
          case 'SYSTEM_MANAGER': {
            // window.location.href = `http://localhost:8103/sign/${localStorage.getItem('token')}`;
            // window.location.href = `http://m2.molecule.ws/sign/${localStorage.getItem('token')}`;
              window.location.href = `http://demo.m2.molecule.ws/sign/${localStorage.getItem('token')}`;
            break;
          }
          case 'ORG_MANAGER': {
            // window.location.href = `http://localhost:8102/sign/${localStorage.getItem('token')}`;
            window.location.href = `http://demo.m1.molecule.ws/sign/${localStorage.getItem('token')}`;
            break;
          }
          case 'EXEC_OPERATOR': {
            // window.location.href = `http://localhost:8101/sign/${localStorage.getItem('token')}`;
            window.location.href = `http://demo.o1.molecule.ws/sign/${localStorage.getItem('token')}`;
            break;
          }
          default: {
            window.location.href = `http://demo.o1.molecule.ws/sign/${localStorage.getItem('token')}`;
          }
        }
      }
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('login');
    this.setState({
      disabled: false,
    });
  }

  onClickLogin = (event) => {
    if (formIsValid('#Login-form')) {
      event.preventDefault();
      this.setState({
        disabled: true,
      });
      this.props.login({
        username: this.state.username,
        password: this.state.password,
      });
      this.props.clearCallbackResponse('login');
    }
  }

  setUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  }

  setPassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="Container">
          <div className="PageTitle">
            <img src="/static/images/enter_logo.png" alt="Логотип" />
          </div>
          <form id="Login-form" className="Login">
            <label htmlFor="login">login</label>
            <input
              id="login"
              className="Input"
              type="text"
              maxLength="255"
              placeholder="login"
              value={this.state.username}
              onChange={this.setUsername}
              required
            />
            <label htmlFor="password">password</label>
            <input
              id="password"
              className="Input"
              type="password"
              maxLength="255"
              placeholder="password"
              value={this.state.password}
              onChange={this.setPassword}
              required
            />
            <div className="LoginActions">
              <button
                className={`Button ButtonPrimary ${this.state.disabled ? 'ButtonDisabled' : ''}`}
                onClick={this.onClickLogin}
              >
                Sign in
              </button>
              <Link to="/recovery">Forgot password?</Link>
            </div>
          </form>
          {Object.prototype.hasOwnProperty.call(this.props.apiCallback, 'message') &&
            <span className="Message-error">{this.props.apiCallback.message}</span>
          }
        </div>
        <footer className="Footer Footer--login">
          <div>
            <span>© Molecule System</span>
          </div>
          <div>
            <a href="mailto:inbox@molecule.ws">inbox@molecule.ws</a>
          </div>
        </footer>
      </div>
    );
  }

}
