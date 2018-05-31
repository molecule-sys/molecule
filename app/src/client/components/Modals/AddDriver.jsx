import React from 'react';
import MaskedInput from 'react-maskedinput';
import Autocomplete from '../Shared/Autocomplete';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class AddDriver extends React.PureComponent {

  static propTypes = {
    vehicle: React.PropTypes.instanceOf(Array).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    addDriver: React.PropTypes.func,
    fetchVehicles: React.PropTypes.func,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    refreshDrivers: React.PropTypes.func,
  }

  state = {
    vehicles: [],
    full_name: '',
    phone: '',
    message: '',
    vehicle_invalid: false,
    demoMessage: false,
  }

  demoEdit = (event) => {
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  componentWillMount = () => {
    this.props.fetchVehicles();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.success) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.refreshDrivers();
    this.props.clearCallbackResponse('addDriver');
  }

  onAddVehicle = ({ searchText }) => {
    const vehicle =
      this.props.vehicle.filter(item => item.name === searchText);
    this.setState({
      vehicles: [...this.state.vehicles, ...vehicle],
      vehicle_invalid: false,
    });
  }

  onAddDriver = (event) => {
    if (formIsValid('#New-driver') && this.state.vehicles.length > 0) {
      event.preventDefault();
      this.props.addDriver({
        full_name: this.state.full_name.trim(),
        phone: this.state.phone,
        vehicles: this.state.vehicles.map(item => item.id),
      });
    } else if (this.state.vehicles.length === 0) {
      event.preventDefault();
      this.setState({
        message: 'Add a car',
        vehicle_invalid: true,
      });
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
        title="Adding a driver"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="New-driver" className="DriverModal">
          <label htmlFor="fio" className="Required">Full name a driver</label>
          <input
            id="fio"
            type="text"
            className="Input"
            placeholder="Full name a driver"
            maxLength="255"
            pattern="[A-Za-zА-Яа-яЁё\s]{1,255}"
            value={this.state.full_name}
            onChange={event => this.setState({ full_name: event.target.value })}
            required
          />
          <label htmlFor="phone" className="Required">Phone</label>
          <MaskedInput
            mask="+11111111111"
            pattern="^(\+1{1})?([1-9][0-9]{9})$"
            id="phone"
            type="tel"
            className="Input"
            
            placeholder="+1**********"
            value={this.state.phone}
            minLength="11"
            maxLength="11"
            onChange={event => this.setState({ phone: event.target.value })}
            required
          />
          <h3 className="Required">Cars:</h3>
          {this.state.vehicles.length > 0 &&
            this.state.vehicles.map((item, i) =>
              <div key={i} className="DriverModal-vehicle">
                {item.name}
                <button
                  type="button"
                  className="DriverModal-vehicle--remove"
                  onClick={() => {
                    this.setState({
                      vehicles: this.state.vehicles.filter(elm =>
                        elm.id !== item.id),
                    });
                  }}
                >
                ×
                </button>
              </div>,
            )
          }
          <Autocomplete
            wrapperClassName="DriverModal-autocomplete"
            inputClassName={`DriverModal-input-autocomplete ${this.state.vehicle_invalid ? 'Input--invalid' : ''}`}
            placeholder="Start typing the name of the auto"
            maxLength="50"
            data={this.props.vehicle
              .filter(item =>
                this.state.vehicles.map(({ id }) => id).indexOf(item.id) < 0)
              .map(item => item.name)}
            searchText={this.onAddVehicle}
          />
          <span className="Required-hint">* - required fields</span>
          <p>
              If the desired machine is not listed, create it in the «Auto». Then on <strong>the same </strong> page tie to the created car of this driver.
          </p>
          {this.state.demoMessage &&
          <span className="Message-error">Not available in demo</span>
          }
          <button
            className="Button ButtonPrimary"
            // onClick={this.onAddDriver}
            onClick={this.demoEdit}
          >
            Add
          </button>
        </form>
        {messageSuccessCondition &&
          <span className="Message-success">{this.props.apiCallback.success.message}</span>
        }
        {messageErrorCondition &&
          <span className="Message-error">{this.props.apiCallback.error.message}</span>
        }
        {this.state.vehicles.length === 0 &&
          <span className="Message-error">{this.state.message}</span>
        }
      </Modal>
    );
  }

}
