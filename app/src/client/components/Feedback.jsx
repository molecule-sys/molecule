import React from 'react';
import { browserHistory } from 'react-router';
import MaskedInput from 'react-maskedinput';
import HeaderContainer from '../containers/header-container';
import formIsValid from '../helpers/form-validation';
import isLogged from '../helpers/isLogged';

export default class Feedback extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    project: React.PropTypes.string.isRequired,
    loading: React.PropTypes.number.isRequired,
    onFeedback: React.PropTypes.func.isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  state = {
    name: '',
    email: '',
    phone: '',
    message: '',
    file: '',
    showLimit: false,
  }

  componentWillMount = () => {
    if (this.props.project !== 'login') {
      if (!isLogged()) {
        window.location.href = 'http://demo.login.molecule.ws';
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.message) {
      setTimeout(() => {
        document.getElementById('file').value = '';
      }, 1000);
      this.setState({
        file: '',
      });
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('feedback');
  }

  onClickSubmit = (event) => {
    this.props.clearCallbackResponse('feedback');
    if (formIsValid('#Feedback')) {
      event.preventDefault();
      this.props.onFeedback({
        name: this.state.name,
        phone: this.state.phone,
        email: this.state.email,
        message: this.state.message,
        file: this.state.file,
      });
      this.setState({
        message: '',
      });
    }
  }

  onFileHandler = () => {
    this.props.clearCallbackResponse('feedback');
    if (document.getElementById('file').files.length > 0) {
      const file = document.getElementById('file').files[0];
      const size = (document.getElementById('file').files[0].size / 1048576).toFixed(1);
      if (size < 10) {
        const reader = new FileReader(file);
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const contents = event.target.result;
          this.setState({
            file: contents,
            showLimit: false,
          });
        };
      } else {
        this.setState({
          showLimit: true,
        });
        document.getElementById('file').value = '';
      }
    } else {
      this.setState({
        file: '',
      });
    }
  }

  render() {
    const messageSuccessCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'mail',
      ) && this.props.apiCallback.mail;
    const messageErrorCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'message',
      ) && !this.props.apiCallback.mail;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <img src="/static/images/enter_logo.png" alt="Logo" />
          </div>
          {this.props.loading === 0 ?
            <form id="Feedback" className="Feedback">
              {this.props.project === 'login' &&
                <div>
                  <label htmlFor="name">Enter your name</label>
                  <input
                    id="name"
                    type="text"
                    maxLength="255"
                    className="Input"
                    placeholder="Enter your name"
                    value={this.state.name}
                    onChange={event => this.setState({ name: event.target.value })}
                    required
                  />
                  <label htmlFor="email">Enter your email</label>
                  <input
                    id="email"
                    type="email"
                    className="Input"
                    placeholder="Enter your email"
                    pattern="[^@]+@[^@]+\.[a-zA-Z]{2,6}"
                    maxLength="255"
                    value={this.state.email}
                    onChange={event => this.setState({ email: event.target.value })}
                    required
                  />
                  <label htmlFor="tel">Enter your phone</label>
                  <MaskedInput
                    mask="+11111111111"
                    pattern="^(\+1{1})?([1-9][0-9]{9})$"
                    id="tel"
                    type="tel"
                    className="Input"
                    placeholder="Enter your phone"
                    value={this.state.phone}
                    minLength="11"
                    maxLength="11"
                    onChange={event => this.setState({ phone: event.target.value })}
                  />
                </div>
              }
              <label htmlFor="message">Detailed description of the problem</label>
              <textarea
                id="message"
                className="Textarea"
                placeholder="Please enter the details of your request"
                value={this.state.message}
                onChange={event => this.setState({ message: event.target.value })}
                required
              />
              <div className="Input-file-wrapper">
                <label className="Label--fullWidth" htmlFor="file">File</label>
                <input
                  id="file"
                  type="file"
                  accept="image/jpeg,image/png,application/pdf,image/bmp,image/x-bmp,image/x-ms-bmp"
                  onChange={this.onFileHandler}
                />
                {this.state.file && !messageSuccessCondition && !messageErrorCondition &&
                  <button
                    className="ButtonLink"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById('file').value = '';
                      this.setState({
                        file: '',
                      });
                    }}
                  >
                      Unpin a file
                  </button>
                }
              </div>
              {this.state.showLimit &&
                <span className="Message-error">Unpin the file The file size exceeds the permissible size of 10MB, select another file</span>
              }
              <div className="FeedbackActions">
                <button className="Button ButtonPrimary" onClick={this.onClickSubmit}>Send</button>
                <a href="" onClick={browserHistory.goBack}>Cancel</a>
              </div>
            </form>
          :
            <span className="SearchResults-loading">Sending a message...</span>
          }
          {messageSuccessCondition &&
            <span className="Message-success">The message was successfully sent!</span>
          }
          {messageErrorCondition &&
            <span className="Message-error">{this.props.apiCallback.message}</span>
          }
        </div>
      </div>
    );
  }

}
