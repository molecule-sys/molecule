import React from 'react';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class AddVendor extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    addVendor: React.PropTypes.func.isRequired,
  }

  state = {
    name: '',
  }

  componentWillReceiveProps = (nextProps) => {
    if (!nextProps.apiCallback.error) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editVendor');
  }

  onAddVendor = (event) => {
    if (formIsValid('#AddVendor')) {
      event.preventDefault();
      this.props.addVendor({
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
        title="Add brand"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="AddVendor" className="DriverModal">
          <label htmlFor="vendor">Enter brand</label>
          <input
            id="add_vendor"
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
            onClick={this.onAddVendor}
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
