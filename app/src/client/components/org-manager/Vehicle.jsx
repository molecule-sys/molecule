import React from 'react';
import { not } from 'ramda';
import EditVehicleContainer from '../../containers/edit-vehicle-container';

export default class Vehicle extends React.PureComponent {

  static propTypes = {
    vehicle: React.PropTypes.instanceOf(Object).isRequired,
    onDeactivateVehicle: React.PropTypes.func,
    onActivateVehicle: React.PropTypes.func,
    editLimit: React.PropTypes.func,
    refreshVehicles: React.PropTypes.func,
  }

  state = {
    openDialog: false,
    showStatusLoader: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.vehicle.status !== this.props.vehicle.status) {
      this.setState({
        showStatusLoader: false,
      });
      this.props.refreshVehicles();
    }
  }

  onEditLimit = () => {
    this.props.editLimit({
      limit: this.state.limit,
    });
  }

  render() {
    const { vehicle } = this.props;
    return (
      <div className="SearchResultsItemOuter">
        <div className="SearchResultsItem Vehicle">
          <div className="SearchResultsItemPrimary">
            <div className="SearchResultsItemImage">
              <img src="/static/images/car_icon.png" alt="car icon" />
            </div>
            <div className="SearchResultsItemInfo">
              <div className="SearchResultsItemInfo-primary">
                <h3 className="SearchResultsItemInfo-title Inline--centered">
                  {vehicle.vehicle_info && vehicle.vehicle_info.car.length > 64 ?
                    `${vehicle.vehicle_info.car.substr(0, 64)}...` : vehicle.vehicle_info.car}
                </h3>
                <div className="SearchResultsItemCarId Inline--centered">
                  {vehicle.vehicle_info && vehicle.vehicle_info.number}
                </div>
              </div>
              <div className="SearchResultsItemInfo-secondary vertical">
                <div className="SearchResultsItemInfo-name">
                  {vehicle.drivers && Object.keys(vehicle.drivers)
                    .map(key =>
                      vehicle.drivers[key].full_name).join(', ')
                  }
                </div>
                <div className="SearchResultsItemInfo-vehicle">
                  <div className="SearchResultsItemInfo-vehicle-item">
                    <span>
                      {vehicle.vehicle_info &&
                        vehicle.vehicle_info.limit_expire === 'UNLIMIT' ?
                        'Unlimit' : 'Limit'
                      }
                      {vehicle.vehicle_info.limit_expire === 'UNLIMIT' ?
                        '' : ` / ${vehicle.vehicle_info.limit} $.`
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="SearchResultsItemSecondary centered">
            <div>
              <button
                className="Button ButtonPrimary"
                onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
              >
                Edit
              </button>
            </div>
            <div>
              {this.state.showStatusLoader &&
                <span>Изменяется статус...</span>
              }
              {!this.state.showStatusLoader && vehicle.status === 'ACTIVE' &&
                <button
                  // className="Button ButtonLink"
                  className="Button ButtonLink ButtonDisabled"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.onDeactivateVehicle();
                  }}
                >
                  Delete
                </button>
              }
              {!this.state.showStatusLoader && vehicle.status === 'ARCHIVED' &&
                <button
                  className="Button ButtonPrimary"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.onActivateVehicle();
                  }}
                >
                    Enable
                </button>
              }
            </div>
          </div>
        </div>
        {this.state.openDialog &&
          <EditVehicleContainer
            vehicle={vehicle}
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
          />
        }
      </div>
    );
  }

}
