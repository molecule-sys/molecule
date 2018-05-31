import React from 'react';
import MaskedInput from 'react-maskedinput';
import Autocomplete from '../Shared/Autocomplete';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class EditDriver extends React.PureComponent {

  static propTypes = {
    driver: React.PropTypes.instanceOf(Object).isRequired,
    vehicle: React.PropTypes.instanceOf(Array).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    fetchVehicles: React.PropTypes.func,
    editDriver: React.PropTypes.func,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      vehicles: props.driver.vehicles ? props.driver.vehicles : '',
      full_name: props.driver.user_info ? props.driver.user_info.full_name : '',
      phone: props.driver.user_info ? props.driver.user_info.phone : '',
      message: '',
      request: false,
      demoMessage: false,
    };
  }

  componentWillMount = () => {
    this.props.fetchVehicles();
  }

  demoEdit = (event) => {
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.request && !nextProps.apiCallback.error) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editDriver');
  }

  onAddVehicle = ({ searchText }) => {
    const vehicle =
      this.props.vehicle.filter(item => item.name === searchText);
    this.setState({
      vehicles: [...this.state.vehicles, ...vehicle],
    });
  }

  onEditDriver = (event) => {
    if (formIsValid(`#Edit-driver-${this.props.driver.id}`) && this.state.vehicles.length > 0) {
      event.preventDefault();
      this.props.editDriver({
        driver_id: this.props.driver.id,
        full_name: this.state.full_name.trim(),
        phone: this.state.phone,
        vehicles: this.state.vehicles.map(item => item.id),
      });
      this.props.clearCallbackResponse('editDriver');
      this.setState({
        request: true,
      });
    } else if (this.state.vehicles.length === 0) {
      event.preventDefault();
      this.setState({
        message: 'Add a car',
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
        title="Driver editing"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id={`Edit-driver-${this.props.driver.id}`} className="DriverModal">
          <label htmlFor="fio" className="Required">Full name driver</label>
          <input
            id="fio"
            type="text"
            className="Input"
            placeholder="Enter Full Name"
            maxLength="255"
            pattern="[A-Za-zА-Яа-яЁё\s]{1,255}"
            value={this.state.full_name ? this.state.full_name : ''}
            onChange={event => this.setState({ full_name: event.target.value })}
            required
          />
          <label htmlFor="phone" className="Required">Phone</label>
          <MaskedInput
            mask="+11111111111"
            id="phone"
            type="tel"
            className="Input"
            placeholder="+1**********"
            pattern="^(\+1{1})?([1-9][0-9]{9})$"
            value={this.state.phone ? this.state.phone : ''}
            minLength="11"
            maxLength="11"
            onChange={event => this.setState({ phone: event.target.value })}
            required
          />
          <h3 className="Required">Cars:</h3>
          {this.state.vehicles && this.state.vehicles.length > 0 &&
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
            inputClassName="DriverModal-input-autocomplete"
            placeholder="Start typing the name of the car"
            maxLength="50"
            data={this.props.vehicle
              .filter(item =>
                this.state.vehicles.map(elm => elm.id).indexOf(item.id) < 0)
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
            // onClick={this.onEditDriver}
            onClick={this.demoEdit}
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
        {this.state.vehicles.length === 0 &&
          <span className="Message-error">{this.state.message}</span>
        }
      </Modal>
    );
  }

}
