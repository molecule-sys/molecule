import React from 'react';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class AddVehicleModel extends React.PureComponent {

  static propTypes = {
    vendorId: React.PropTypes.instanceOf(Object).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    addModel: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      vendor_id: props.vendorId.id,
      model: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('addModel');
  }

  onAddModel = (event) => {
    if (formIsValid('#AddModel')) {
      event.preventDefault();
      this.props.addModel({
        name: this.state.model.trim(),
        vendor_id: this.state.vendor_id,
      });
      this.setState({
        model: '',
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
        title="Add model"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="AddModel">
          <h3>Add model</h3>
          <input
            id="add_model"
            type="text"
            className="Input"
            placeholder="Enter model"
            maxLength="255"
            value={this.state.model}
            style={{ marginBottom: '15px', width: '100%' }}
            onChange={event => this.setState({ model: event.target.value })}
            required
          />
          <button
            className="Button ButtonPrimary"
            onClick={this.onAddModel}
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
