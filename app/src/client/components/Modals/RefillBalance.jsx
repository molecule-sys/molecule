import React from 'react';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class RefillBalance extends React.PureComponent {

  static propTypes = {
    balance: React.PropTypes.number.isRequired,
    exchangeWaiting: React.PropTypes.number.isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    refillFile: React.PropTypes.string.isRequired,
    loading: React.PropTypes.number.isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    onInvoice: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      sum: props.exchangeWaiting > 0 ? props.exchangeWaiting : '',
      // click: false,
      disabled: false,
      demoMessage: false,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.success) {
      this.setState({
        disabled: false,
      });
    }
    if (nextProps.apiCallback.error) {
      this.setState({
        disabled: false,
      });
    }
  }

  demoEdit = (event) => {
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('refillBalance');
  }

  invoice = (event) => {
    if (formIsValid('#Refill-balance')) {
      event.preventDefault();
      this.props.onInvoice({
        sum: this.state.sum,
      });
      this.props.clearCallbackResponse('refillBalance');
      this.setState({
        disabled: true,
      });
    }
  }

  render() {
    const actions = [
      <button
        className="Button ButtonLink"
        onClick={this.props.closeDialog}
      >
        close
      </button>,
    ];
    const messageErrorCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'error',
      );
    const buttonDisabled = this.state.disabled;
    return (
      <Modal
        title={`Deposit (available balance: ${this.props.balance} $.)`}
        actions={actions}
        bodyClass="autoHeight"
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="Refill-balance" className="DriverModal">
          <label htmlFor="sum">Value</label>
          <input
            id="sum"
            type="text"
            className="Input"
            placeholder="Enter value"
            maxLength="6"
            pattern="[1-9]{1}[0-9]{0,6}"
            value={this.state.sum}
            onChange={event => this.setState({ sum: event.target.value })}
            onInput={event =>
              event.target.value = event.target.value.replace(/\D/g, '')
            }
            required
          />
          {this.state.demoMessage &&
          <span className="Message-error">Not available in demo</span>
          }
          <button
            style={{ marginRight: '10px' }}
              // className={`Button ButtonPrimary ${true ? 'ButtonDisabled' : ''}`}
            className={`Button ButtonPrimary ${buttonDisabled ? 'ButtonDisabled' : ''}`}
            // onClick={this.invoice}
            onClick={this.demoEdit}
            // disabled={true}
            disabled={buttonDisabled}
          >
              Get invoice for payment
          </button>
          {this.props.refillFile &&
            <a
              id="refillFile"
              style={{ padding: '9px 12px' }}
              className="Button ButtonPrimary"
              rel="noopener noreferrer"
              target="_blank"
              href={this.props.refillFile}
            >
                Print invoice for payment
            </a>
          }
          {this.props.loading > 0 &&
            <span className="SearchResults-loading">Send. Wait…</span>
          }
        </form>
        {/* messageSuccessCondition &&
          <span className="Message-success">{this.props.apiCallback.success.message}</span>
        */}
        {messageErrorCondition &&
          <span className="Message-error">{this.props.apiCallback.error.message}</span>
        }
      </Modal>
    );
  }
}
