import React from 'react';
import { not } from 'ramda';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import VehicleContainer from '../../containers/vehicle-container';
import AddVehicleRequestContainer from '../../containers/add-vehicle-request-container';
import AddVehicleContainer from '../../containers/add-vehicle-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Vehicles extends React.PureComponent {

  static propTypes = {
    vehicle: React.PropTypes.instanceOf(Array).isRequired,
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    loading: React.PropTypes.number.isRequired,
    onSearchRequest: React.PropTypes.func,
    fetchVehicles: React.PropTypes.func,
    onChangePage: React.PropTypes.func,
  }

  state = {
    searchText: '',
    showDeactivate: false,
    openDialog: false,
    openRequestDialog: false,
  }

  componentWillMount = () => {
    this.onFetchVehicles();
  }

  onFetchVehicles = () => {
    this.props.fetchVehicles({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchRequest({
      searchText: this.state.searchText.trim(),
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      page,
    });
  }

  render() {
    const { vehicle, pagination, loading } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Car list</h2>
            <button
              className="Button ButtonPrimary"
              onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            >
                Add auto
            </button>
          </div>
          <form id="Search" className="Search" onSubmit={this.onFormSubmit}>
            <div className="Autocomplete Search-autocomplete">
              <div className="Autocomplete-wrapper">
                <input
                  type="search"
                  className="Input Search-input"
                  placeholder="Enter the vehicle number or driver's name"
                  value={this.state.searchText}
                  maxLength="50"
                  onChange={event => this.setState({
                    searchText: event.target.value,
                  })}
                />
                <input className="Search-button" type="submit" />
              </div>
            </div>
            <div className="SearchHint">
              <span>Enter the vehicle number or driver's name</span>
            </div>
          </form>
          <div className="SearchResults">
            <div className="ShowDeactivate">
              <div className="Checkbox">
                <input
                  id="show_deactivate"
                  type="checkbox"
                  checked={this.state.showDeactivate}
                  onChange={
                    () => this.setState({
                      showDeactivate: !this.state.showDeactivate,
                    }, () => this.onFetchVehicles())
                  }
                />
                <label htmlFor="show_deactivate">Show inactive</label>
              </div>
            </div>
            {vehicle.length > 0 && loading === 0 &&
              vehicle
                .sort((modelA, modelB) => {
                  if (modelA.vehicle_info.car.toUpperCase() === modelB.vehicle_info.car.toUpperCase()) {
                    return modelA.vehicle_info.number.toUpperCase() < modelB.vehicle_info.number.toUpperCase() ? -1 : 1;
                  }
                  return modelA.vehicle_info.car.toUpperCase() < modelB.vehicle_info.car.toUpperCase() ? -1 : 1;
                })
                .map(item =>
                  <VehicleContainer
                    key={item.id}
                    vehicle={item}
                    refreshVehicles={() => this.onFetchVehicles()}
                  />,
                )
            }
            {vehicle.length === 0 && loading === 0 &&
              <span className="Message-error">Nothing found.</span>
            }
            {loading > 0 &&
              <span className="SearchResults-loading">Loading. Wait…</span>
            }
          </div>
          {pagination.pagesCount > 1 &&
            <Pagination
              pagination={pagination}
              onChangePage={this.changePage}
            />
          }
          <div className="AddModalRequest">
            <button
              className="Button ButtonPrimary"
              onClick={() => { this.setState({ openRequestDialog: not(this.state.openRequestDialog) }); }}
            >
              Send a request for a missing car
            </button>
          </div>
        </div>
        {this.state.openRequestDialog &&
          <AddVehicleRequestContainer
            openDialog={this.state.openRequestDialog}
            closeDialog={() => { this.setState({ openRequestDialog: not(this.state.openRequestDialog) }); }}
          />
        }
        {this.state.openDialog &&
          <AddVehicleContainer
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            refreshVehicles={() => this.onFetchVehicles()}
          />
        }
      </div>
    );
  }

}
