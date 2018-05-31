import React from 'react';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class EditVehicleModel extends React.PureComponent {

  static propTypes = {
    vehicleModel: React.PropTypes.instanceOf(Object).isRequired,
    vendorId: React.PropTypes.string.isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    editModel: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      model_id: props.vehicleModel.id,
      vendor_id: props.vendorId,
      name: props.vehicleModel.name,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editModel');
  }

  onEditModel = (event) => {
    if (formIsValid(`#Edit-vehicle-model-${this.props.vehicleModel.id}`)) {
      event.preventDefault();
      this.props.editModel({
        name: this.state.name.trim(),
        vendor_id: this.state.vendor_id,
        model_id: this.state.model_id,
      });
    }
  }

  render() {
    const { vehicleModel } = this.props;
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
        this.props.apiCallback, 'success'
      );
    const messageErrorCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'error'
      );
    return (
      <Modal
        title={`Edit model ${vehicleModel.name}`}
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id={`Edit-vehicle-model-${vehicleModel.id}`} className="DriverModal">
          <label htmlFor="vendor">model</label>
          <input
            id="edit_model"
            type="text"
            className="Input"
            placeholder="Enter model"
            maxLength="255"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            required
          />
          <button
            className="Button ButtonPrimary"
            onClick={this.onEditModel}
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
      </Modal>
    );
  }
}
