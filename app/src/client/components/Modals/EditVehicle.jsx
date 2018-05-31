import React from 'react';
import Modal from '../Shared/Modal';
import Autocomplete from '../Shared/Autocomplete';
import formIsValid from '../../helpers/form-validation';

export default class EditVehicle extends React.PureComponent {

  static propTypes = {
    vehicle: React.PropTypes.instanceOf(Object).isRequired,
    vehicleVendors: React.PropTypes.instanceOf(Array).isRequired,
    vehicleModels: React.PropTypes.instanceOf(Array).isRequired,
    drivers: React.PropTypes.instanceOf(Array).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    fetchVehiclesVendors: React.PropTypes.func,
    fetchVehiclesModels: React.PropTypes.func,
    fetchDriversList: React.PropTypes.func,
    editVehicle: React.PropTypes.func,
    clearVehicleVendors: React.PropTypes.func,
    clearVehicleModels: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      drivers: Object.keys(props.vehicle.drivers).map(key =>
        ({ id: key, name: props.vehicle.drivers[key].full_name })),
      number: props.vehicle.vehicle_info.number,
      limit: props.vehicle.vehicle_info.limit,
      limit_expire: props.vehicle.vehicle_info.limit_expire,
      vendor_id: props.vehicle.vehicle_info.vehicle_vendor,
      model_id: props.vehicle.vehicle_info.vehicle_model,
      request: false,
      disabled: false,
      demoMessage: false,
    };
  }

  componentWillMount = () => {
    this.props.fetchVehiclesVendors({
      status: 'ACTIVE',
    });
    this.props.fetchVehiclesModels({
      vendorId: this.props.vehicle.vehicle_info.vehicle_vendor,
      status: 'ACTIVE',
    });
    this.props.fetchDriversList();
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
    this.setState({
      disabled: false,
    });
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editVehicle');
    this.props.clearVehicleVendors();
    this.props.clearVehicleModels();
  }

  onAddDriver = ({ searchText }) => {
    const driver =
      this.props.drivers.filter(item =>
        item.id === searchText,
      );
    this.setState({
      drivers: [...this.state.drivers, ...driver],
    });
  }

  onSelectVendor = (event) => {
    this.setState({
      vendor_id: event.target.value,
      disabled: true,
      model_id: '',
    }, () => this.props.fetchVehiclesModels({
      vendorId: this.state.vendor_id,
      status: 'ACTIVE',
    }));
    document.getElementById('model_id').value = '';
  }

  onEditVehicle = (event) => {
    if (formIsValid(`#Edit-vehicle-${this.props.vehicle.vehicle_info.vehicle_id}`)) {
      event.preventDefault();
      this.props.editVehicle({
        vehicle_id: this.props.vehicle.vehicle_info.vehicle_id,
        vendor_id: this.state.vendor_id,
        model_id: this.state.model_id,
        number: this.state.number.trim().toLowerCase(),
        limit: this.state.limit,
        limit_expire: this.state.limit_expire.toUpperCase(),
        users: this.state.drivers.map(item => item.id),
      });
      this.props.clearCallbackResponse('editVehicle');
      this.setState({
        request: true,
      });
    }
  }

  onChangeLimitExpire = (event) => {
    this.setState({ limit_expire: event.target.value });
    if (event.target.value === 'UNLIMIT') {
      this.setState({ limit: '' });
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
        title={`Car editing ${this.props.vehicle.vehicle_info.car}`}
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id={`Edit-vehicle-${this.props.vehicle.vehicle_info.vehicle_id}`} className="DriverModal">
          {this.props.vehicleVendors.length > 0 &&
            <div>
              <label htmlFor="vendor_id" className="Required">Brand</label>
              <div className="Select-outer">
                <select
                  id="vendor_id"
                  className="Select"
                  defaultValue={this.state.vendor_id}
                  required
                  onChange={this.onSelectVendor}
                >
                  {this.props.vehicleVendors.map((item, i) =>
                    <option key={i} value={item.id}>{item.name}</option>,
                  )}
                </select>
              </div>
            </div>
          }
          {this.props.vehicleModels.length > 0 &&
            <div>
              <label htmlFor="model_id" className="Required">Model</label>
              <div className="Select-outer">
                <select
                  disabled={this.state.disabled}
                  id="model_id"
                  className="Select"
                  defaultValue={this.state.model_id}
                  required
                  onChange={event => this.setState({ model_id: event.target.value })}
                >
                  <option value="" className="disabled">Choice model</option>
                  {this.props.vehicleModels.map((item, i) =>
                    <option key={i} value={item.id}>{item.name}</option>,
                  )}
                </select>
              </div>
            </div>
          }
          <label htmlFor="number" className="Required">State number of the car</label>
          <input
            id="number"
            type="text"
            className="Input"
            maxLength="10"
            placeholder="Enter the vehicle state number. Example: о123сн45"
            value={this.state.number === null ? '' : this.state.number}
            onChange={event => this.setState({ number: event.target.value })}
            required
          />
          <label className="Label--fullWidth Required" htmlFor="limitExpire">Balance type</label>
          <div className="Radio">
            <input
              id={`${this.props.vehicle.vehicle_info.vehicle_id}-unlimit`}
              type="radio"
              name="limitExpire"
              value="UNLIMIT"
              checked={this.state.limit_expire === 'UNLIMIT'}
              onChange={this.onChangeLimitExpire}
              required
            />
            <label htmlFor={`${this.props.vehicle.vehicle_info.vehicle_id}-unlimit`}>Unlimit</label>
          </div>
          <div className="Radio">
            <input
              id={`${this.props.vehicle.vehicle_info.vehicle_id}-limit`}
              type="radio"
              name="limitExpire"
              value="LIMIT"
              checked={this.state.limit_expire === 'LIMIT'}
              onChange={this.onChangeLimitExpire}
              required
            />
            <label htmlFor={`${this.props.vehicle.vehicle_info.vehicle_id}-limit`}>Limit</label>
          </div>
          {this.state.limit_expire === 'LIMIT' &&
            <div>
              <label htmlFor="limit">Limit</label>
              <input
                id="limit"
                type="text"
                className="Input"
                placeholder="Enter limit"
                maxLength="6"
                pattern="[0-9]{1,6}"
                value={this.state.limit === null ? '' : this.state.limit}
                required
                onChange={event => this.setState({ limit: event.target.value })}
                onInput={event =>
                  event.target.value = event.target.value.replace(/\D/g, '')
                }
              />
            </div>
          }
          {this.state.drivers.length > 0 &&
            <h3>Drivers:</h3>
          }
          {this.state.drivers.map((item, i) =>
            <div key={i} className="DriverModal-vehicle">
              {item.name}
              <button
                type="button"
                className="DriverModal-vehicle--remove"
                onClick={() => {
                  this.setState({
                    drivers: this.state.drivers.filter(elm =>
                      elm.id !== item.id),
                  });
                }}
              >
              ×
              </button>
            </div>,
          )}
          <label style={{ display: 'block' }} htmlFor={`driver_edit-${this.props.vehicle.vehicle_info.vehicle_id}`}>
              Attach driver
          </label>
          <Autocomplete
            id={`driver_edit-${this.props.vehicle.vehicle_info.vehicle_id}`}
            wrapperClassName="DriverModal-autocomplete"
            maxLength="50"
            inputClassName="DriverModal-input-autocomplete"
            placeholder="Start typing driver's name"
            data={this.props.drivers
              .filter(item => this.state.drivers.map(({ id }) => id).indexOf(item.id) < 0)
              .map(item => item)
            }
            searchText={this.onAddDriver}
          />
          <span className="Required-hint">* - required fields</span>
          {this.state.demoMessage &&
          <span className="Message-error">Not available in demo</span>
          }
          <button
            className="Button ButtonPrimary"
            // onClick={this.onEditVehicle}
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
      </Modal>
    );
  }

}

