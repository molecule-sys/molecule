import React from 'react';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class EditVendor extends React.PureComponent {

  static propTypes = {
    currentVendor: React.PropTypes.instanceOf(Object).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    editVendor: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      vendor_id: props.currentVendor.id,
      name: props.currentVendor.name,
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editVendor');
  }

  onEditVendor = (event) => {
    if (formIsValid('#EditVendor')) {
      event.preventDefault();
      this.props.editVendor({
        vendor_id: this.state.vendor_id,
        name: this.state.name.trim(),
      });
    }
  }

  render() {
    const messageSuccessCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'success'
      );
    const messageErrorCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'error'
      );
    const actions = [
      <button
        className="Button ButtonLink"
        onClick={this.props.closeDialog}
      >
          Close
      </button>,
    ];
    return (
      <Modal
        title="Edit brand"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="EditVendor" className="DriverModal">
          <label htmlFor="vendor">Enter brand</label>
          <input
            id="edit_vendor"
            type="text"
            className="Input"
            placeholder="Enter brand"
            maxLength="255"
            value={this.state.name}
            onChange={event => this.setState({ name: event.target.value })}
            required
          />
          <button
            className="Button ButtonPrimary"
            onClick={this.onEditVendor}
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
