import React from 'react';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class AddVehicleRequest extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    onAddVehicleRequest: React.PropTypes.func,
  }

  state = {
    vehicle_vendor: '',
    vehicle_model: '',
    loading: 0,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.success) {
      this.props.closeDialog();
      this.setState({
        loading: 0,
      });
    }
    if (nextProps.apiCallback.error) {
      this.setState({
        loading: 0,
      });
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('addVehicleRequest');
  }

  onAddVehicleRequest = (event) => {
    this.props.clearCallbackResponse('addVehicleRequest');
    if (formIsValid('#AddVehicleRequest')) {
      event.preventDefault();
      this.props.onAddVehicleRequest({
        vehicle_vendor: this.state.vehicle_vendor.trim(),
        vehicle_model: this.state.vehicle_model.trim(),
      });
      this.setState({
        loading: 1,
      });
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
    return (
      <Modal
        title="Send a request for a missing car"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="AddVehicleRequest">
          <label htmlFor="vehicle_vendor" className="Required">Brand</label>
          <input
            id="vehicle_vendor"
            type="text"
            className="Input"
            placeholder="Enter brand"
            maxLength="255"
            value={this.state.vehicle_vendor}
            style={{ marginBottom: '15px', width: '100%' }}
            onChange={event => this.setState({ vehicle_vendor: event.target.value })}
            required
          />
          <label htmlFor="vehicle_model" className="Required">Model</label>
          <input
            id="vehicle_model"
            type="text"
            className="Input"
            placeholder="Enter model"
            maxLength="255"
            value={this.state.vehicle_model}
            style={{ marginBottom: '15px', width: '100%' }}
            onChange={event => this.setState({ vehicle_model: event.target.value })}
            required
          />
          <button
            className="Button ButtonPrimary"
            onClick={this.onAddVehicleRequest}
          >
            Send
          </button>
        </form>
        {this.state.loading > 0 &&
          <span className="SearchResults-loading">Send. Wait...</span>
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
