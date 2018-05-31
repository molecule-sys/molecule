import React from 'react';
import { browserHistory } from 'react-router';
import Modal from '../Shared/Modal';
import Autocomplete from './../Shared/Autocomplete';
import formIsValid from '../../helpers/form-validation';

export default class NewOperations extends React.PureComponent {

  static propTypes = {
    client: React.PropTypes.instanceOf(Object).isRequired,
    vehicle: React.PropTypes.instanceOf(Object).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    serviceList: React.PropTypes.instanceOf(Array).isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    addNewOperations: React.PropTypes.func.isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  state = {
    services: [],
    serviceName: '',
    priceValue: '',
    countValue: '',
    disabled: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.success) {
      setTimeout(() => {
        browserHistory.push('/orders');
      }, 1000);
    } else {
      this.setState({
        disabled: false,
      });
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('newOperation');
  }

  onAddNewOperations = () => {
    this.setState({
      disabled: true,
    });
    this.props.addNewOperations({
      customer_user: this.props.client.id,
      services: this.state.services,
      vehicle_id: this.props.vehicle.vehicle_id,
      total_price: this.state.services.map(item =>
        item.price * item.count).reduce((sum, current) =>
          sum + current),
    });
  }

  confirmRow = (event) => {
    if (formIsValid(`#Add-operation-${this.props.vehicle.vehicle_id}`)) {
      event.preventDefault();
      const service = {
        name: this.state.serviceName.trim(),
        price: this.state.priceValue,
        count: this.state.countValue === '' ? 1 : this.state.countValue,
      };
      this.setState({
        services: [...this.state.services, service],
        serviceName: '',
        priceValue: '',
        countValue: '',
      });
    }
  }

  render() {
    const disabledButton = this.state.services.length === 0 || this.state.disabled;
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
        className="Button"
        onClick={this.props.closeDialog}
      >
        Cancel
      </button>,
      <button
        className={`Button ButtonPrimary ${disabledButton ? 'ButtonDisabled' : ''}`}
        onClick={this.onAddNewOperations}
      >
          Save
      </button>,
    ];
    return (
      <Modal
        title="Choice service"
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id={`Add-operation-${this.props.vehicle.vehicle_id}`}>
          <table className="NewOperations-table">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="name">Name of service</label>
                  <Autocomplete
                    id="name"
                    wrapperClassName="DriverModal-autocomplete"
                    inputClassName="NewOperations-input-autocomplete"
                    placeholder="Enter a name"
                    maxLength="100"
                    inputValue={this.state.serviceName}
                    takeState={true}
                    value={true}
                    data={this.props.serviceList
                      .map(item => (item.name))}
                    searchText={({ searchText }) => this.setState({ serviceName: searchText })}
                    required={true}
                  />
                </td>
                <td>
                  <label htmlFor="count">Quantity</label>
                  <input
                    className="Input"
                    id="count"
                    placeholder="Enter quantity"
                    maxLength="3"
                    value={this.state.countValue}
                    pattern="[1-9][0-9]*"
                    onChange={event => this.setState({ countValue: event.target.value })}
                    onInput={event =>
                      event.target.value = event.target.value.replace(/\D/g, '')
                    }
                    required
                  />
                </td>
                <td>
                  <label htmlFor="price">Price</label>
                  <input
                    className="Input"
                    id="price"
                    placeholder="Price introduction"
                    maxLength="5"
                    value={this.state.priceValue}
                    pattern="[1-9][0-9]*"
                    onChange={event => this.setState({ priceValue: event.target.value })}
                    onInput={event =>
                      event.target.value = event.target.value.replace(/\D/g, '')
                    }
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="Button ButtonPrimary"
            onClick={this.confirmRow}
          >
              Add the service
          </button>
        </form>
        {this.state.services.length > 0 &&
          <div>
            <table className="Table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Price per unit, USD</th>
                  <th>Cost, USD</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.services.map((item, i) =>
                  <tr key={i}>
                    <td style={{ width: '20%', wordBreak: 'break-all' }}>
                      {item.name}
                    </td>
                    <td style={{ width: '20%' }}>
                      {item.count}
                    </td>
                    <td style={{ width: '20%' }}>
                      {item.price}
                    </td>
                    <td style={{ width: '20%' }}>
                      {item.price * item.count}
                    </td>
                    <td style={{ width: '20%' }}>
                      <button
                        className="ButtonLink"
                        data-id={i}
                        onClick={(event) => {
                          this.setState({
                            services: this.state.services.filter((elm, index) =>
                              index !== Number(event.currentTarget.dataset.id)),
                          });
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ textAlign: 'right' }}>
              <strong>Total: </strong>
              <span>
                {this.state.services
                  .map(item => item.price * item.count)
                  .reduce((sum, current) => sum + current)} $.
              </span>
            </div>
          </div>
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
