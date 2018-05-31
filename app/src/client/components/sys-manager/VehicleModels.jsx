import React from 'react';
import { not } from 'ramda';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import VehicleModelContainer from '../../containers/vehicle-model-container';
import AddVendorContainer from '../../containers/add-vendor-container';
import EditVendorContainer from '../../containers/edit-vendor-container';
import AddVehicleModelContainer from '../../containers/add-vehicle-model-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class VehicleModels extends React.PureComponent {

  static propTypes = {
    vehicleVendors: React.PropTypes.instanceOf(Array).isRequired,
    vehicleModels: React.PropTypes.instanceOf(Array).isRequired,
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    clearModelsList: React.PropTypes.func.isRequired,
    loading: React.PropTypes.number.isRequired,
    fetchVehiclesVendors: React.PropTypes.func,
    fetchVehiclesModels: React.PropTypes.func,
    onChangePage: React.PropTypes.func,
  }

  state = {
    openAddDialog: false,
    openEditDialog: false,
    openAddModelDialog: false,
    currentVendorId: '',
    showDeactivate: false,
  }

  componentWillMount = () => {
    this.props.fetchVehiclesVendors({
      status: 'ACTIVE',
    });
  }

  componentWillUnmount = () => {
    this.props.clearModelsList();
  }

  onFetchVehiclesModels = () => {
    this.props.fetchVehiclesModels({
      vendorId: this.state.currentVendorId,
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  onSelectVendor = (event) => {
    if (event.target.value !== '') {
      const currentVendor = this.props.vehicleVendors.filter(item => item.id === event.target.value);
      this.setState({
        currentVendorId: currentVendor[0].id,
      }, () => this.onFetchVehiclesModels());
    }
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      page,
      vendorId: this.state.currentVendorId,
    });
  }

  render() {
    const {
      vehicleVendors,
      vehicleModels,
      pagination,
      loading,
    } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Марки/Модели</h2>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div className="Select-outer" style={{ maxWidth: '400px', width: '100%' }}>
              <select
                className="Select"
                required
                onChange={this.onSelectVendor}
                defaultValue="-"
              >
                <option value="-" className="disabled" disabled>Выберите марку авто</option>
                {vehicleVendors.map((item, i) =>
                  <option key={i} value={item.id}>{item.name}</option>,
                )}
              </select>
            </div>
          </div>
          <div className="ModelsNav">
            <button
              className="Button ButtonPrimary"
              onClick={() => { this.setState({ openAddDialog: not(this.state.openAddDialog) }); }}
            >
              Add brand
            </button>
            {this.state.currentVendorId &&
              <button
                className="Button ButtonPrimary"
                onClick={() => { this.setState({ openEditDialog: not(this.state.openEditDialog) }); }}
              >
                Edit brand
              </button>
            }
            {this.state.currentVendorId &&
              <button
                className="Button ButtonPrimary"
                onClick={() => { this.setState({ openAddModelDialog: not(this.state.openAddModelDialog) }); }}
              >
                Add model
              </button>
            }
          </div>
          <div className="SearchResults">
            {this.state.currentVendorId.length > 0 &&
              <div className="ShowDeactivate">
                <div className="Checkbox">
                  <input
                    id="show_deactivate"
                    type="checkbox"
                    checked={this.state.showDeactivate}
                    onChange={
                      () => this.setState({
                        showDeactivate: !this.state.showDeactivate,
                      }, () => this.onFetchVehiclesModels())
                    }
                  />
                  <label htmlFor="show_deactivate">Показать неактивные</label>
                </div>
              </div>
            }
            {vehicleModels.length > 0 && loading === 0 &&
              vehicleModels
                .sort((modelA, modelB) => (
                  (modelA.name.toUpperCase() < modelB.name.toUpperCase()) ? -1 : 1
                ))
                .map((item, i) =>
                  <VehicleModelContainer
                    key={`${item.id}${i}`}
                    vehicleModel={item}
                    refreshVehiclesModels={() => this.onFetchVehiclesModels()}
                    currentVendor={this.props.vehicleVendors.filter(elm =>
                      elm.id === this.state.currentVendorId)[0]}
                  />,
                )
            }
            {loading > 0 &&
              <span className="SearchResults-loading">Loading. Wait...</span>
            }
          </div>
          {pagination.pagesCount > 1 &&
            <Pagination
              pagination={pagination}
              onChangePage={this.changePage}
            />
          }
        </div>
        {this.state.openAddDialog &&
          <AddVendorContainer
            openDialog={this.state.openAddDialog}
            closeDialog={() => { this.setState({ openAddDialog: not(this.state.openAddDialog) }); }}
          />
        }
        {this.state.openEditDialog &&
          <EditVendorContainer
            currentVendor={this.props.vehicleVendors.filter(item => item.id === this.state.currentVendorId)[0]}
            openDialog={this.state.openEditDialog}
            closeDialog={() => { this.setState({ openEditDialog: not(this.state.openEditDialog) }); }}
          />
        }
        {this.state.openAddModelDialog &&
          <AddVehicleModelContainer
            vendorId={this.props.vehicleVendors.filter(item => item.id === this.state.currentVendorId)[0]}
            openDialog={this.state.openAddModelDialog}
            closeDialog={() => { this.setState({ openAddModelDialog: not(this.state.openAddModelDialog) }); }}
          />
        }
      </div>
    );
  }

}
