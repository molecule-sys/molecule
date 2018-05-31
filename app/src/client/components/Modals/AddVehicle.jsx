import React from 'react';
import Autocomplete from '../Shared/Autocomplete';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class AddVehicle extends React.PureComponent {

  static propTypes = {
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
    addVehicle: React.PropTypes.func,
    refreshVehicles: React.PropTypes.func,
  }

  state = {
    drivers: [],
    vendor_id: '',
    model_id: '',
    number: '',
    limit: '',
    driver_invalid: false,
    limit_expire: 'UNLIMIT',
    request: false,
    demoMessage: false,
  }

  componentWillMount = () => {
    this.props.fetchVehiclesVendors({
      status: 'ACTIVE',
    });
    this.props.fetchVehiclesModels({
      status: 'ACTIVE',
    });
    this.props.fetchDriversList();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.error) {
      this.setState({
        request: false,
      });
    }
    if (this.state.request && nextProps.apiCallback.success) {
      this.props.closeDialog();
    }
  }

  componentWillUnmount = () => {
    this.props.refreshVehicles();
    this.props.clearCallbackResponse('addVehicle');
  }

  onAddDriver = ({ searchText }) => {
    const driver =
      this.props.drivers.filter(item =>
        item.id === searchText,
      );
    this.setState({
      drivers: [...this.state.drivers, ...driver],
      driver_invalid: false,
    });
  }

  onAddVehicle = (event) => {
    if (formIsValid('#New-vehicle')) {
      event.preventDefault();
      this.props.addVehicle({
        vendor_id: this.state.vendor_id,
        model_id: this.state.model_id,
        number: this.state.number.trim().toLowerCase(),
        limit: this.state.limit,
        limit_expire: this.state.limit_expire.toUpperCase(),
        users: this.state.drivers.map(item => item.id),
      });
      this.props.clearCallbackResponse('addVehicle');
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
  
  demoEdit = (event) => {
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  onSelectVendor = (event) => {
    this.setState({
      vendor_id: event.target.value,
    }, () => this.props.fetchVehiclesModels({
      vendorId: this.state.vendor_id,
      status: 'ACTIVE',
    }));
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
        title="Adding a auto"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id="New-vehicle" className="DriverModal">
          <label htmlFor="vendor_id" className="Required">brand</label>
          <div className="Select-outer">
            <select
              id="vendor_id"
              className="Select"
              required
              defaultValue=""
              onChange={this.onSelectVendor}
            >
              <option value="" className="disabled" disabled>Choose a brand</option>
              {this.props.vehicleVendors.map((item, i) =>
                <option key={i} value={item.id}>{item.name}</option>,
              )}
            </select>
          </div>
          <label htmlFor="model_id" className="Required">model</label>
          <div className="Select-outer">
            <select
              id="model_id"
              className="Select"
              required
              defaultValue=""
              onChange={event => this.setState({ model_id: event.target.value })}
            >
              <option value="" className="disabled" disabled>Choose a model</option>
              {this.props.vehicleModels.map((item, i) =>
                <option key={i} value={item.id}>{item.name}</option>,
              )}
            </select>
          </div>
          <label htmlFor="number" className="Required">license plate</label>
          <input
            id="number"
            type="text"
            className="Input"
            maxLength="10"
            placeholder="Enter the license plate"
            value={this.state.number}
            onChange={event => this.setState({ number: event.target.value })}
            required
          />
          <label className="Label--fullWidth Required" htmlFor="limitExpire">balance</label>
          <div className="Radio">
            <input
              id="unlimit"
              type="radio"
              name="limitExpire"
              value="UNLIMIT"
              checked={this.state.limit_expire === 'UNLIMIT'}
              onChange={this.onChangeLimitExpire}
              required
            />
            <label htmlFor="unlimit">no limit</label>
          </div>
          <div className="Radio">
            <input
              id="limit"
              type="radio"
              name="limitExpire"
              value="LIMIT"
              checked={this.state.limit_expire === 'LIMIT'}
              onChange={this.onChangeLimitExpire}
              required
            />
            <label htmlFor="limit">limit</label>
          </div>
          {this.state.limit_expire === 'LIMIT' &&
            <div>
              <label htmlFor="limit">limit</label>
              <input
                id="limit"
                type="text"
                className="Input"
                placeholder="Enter limit"
                maxLength="6"
                pattern="[0-9]{1,6}"
                value={this.state.limit}
                required
                onChange={event => this.setState({ limit: event.target.value })}
                onInput={event =>
                  event.target.value = event.target.value.replace(/\D/g, '')
                }
              />
            </div>
          }
          {this.state.drivers.length > 0 &&
            <h3>Водители:</h3>
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
          <label style={{ display: 'block' }} htmlFor="driver_add">
            To attach the driver
          </label>
          <Autocomplete
            id="driver_add"
            wrapperClassName="DriverModal-autocomplete"
            maxLength="50"
            inputClassName={`DriverModal-input-autocomplete ${this.state.driver_invalid ? 'Input--invalid' : ''}`}
            placeholder="Start typing the name of the driver"
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
            // className="Button ButtonPrimary"
            className="Button ButtonPrimary"
            // onClick={this.onAddVehicle}
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
      </Modal>
    );
  }

}
