import React from 'react';
import { not } from 'ramda';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import DriverContainer from '../../containers/driver-container';
import AddDriverContainer from '../../containers/add-driver-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Drivers extends React.PureComponent {

  static propTypes = {
    drivers: React.PropTypes.instanceOf(Array).isRequired,
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    loading: React.PropTypes.number.isRequired,
    onSearchRequest: React.PropTypes.func,
    fetchDrivers: React.PropTypes.func,
    onChangePage: React.PropTypes.func,
  }

  state = {
    searchText: '',
    showDeactivate: false,
    openDialog: false,
  }

  componentWillMount = () => {
    this.onFetchDrivers();
  }

  onFetchDrivers = () => {
    this.props.fetchDrivers({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchText.trim().indexOf('+') === 0) {
      this.props.onSearchRequest({
        searchText: this.state.searchText.trim().slice(1),
        status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      });
    } else {
      this.props.onSearchRequest({
        searchText: this.state.searchText.trim(),
        status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      });
    }
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      page,
    });
  }

  render() {
    const { drivers, pagination, loading } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Drivers</h2>
            <button
              className="Button ButtonPrimary"
              onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            >
              Add driver
            </button>
          </div>
          <form id="Search" className="Search" onSubmit={this.onFormSubmit}>
            <div className="Autocomplete Search-autocomplete">
              <div className="Autocomplete-wrapper">
                <input
                  type="search"
                  className="Input Search-input"
                  maxLength="50"
                  placeholder="Enter the driver's phone number, name, make or number of the car"
                  value={this.state.searchText}
                  onChange={event => this.setState({
                    searchText: event.target.value,
                  })}
                />
                <input className="Search-button" type="submit" />
              </div>
            </div>
            <div className="SearchHint">
              <span>Enter the driver's phone number, name, make or number of the car</span>
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
                    }, () => this.onFetchDrivers())
                  }
                />
                <label htmlFor="show_deactivate">Show inactive</label>
              </div>
            </div>
            {drivers.length > 0 && loading === 0 &&
              drivers
                .sort((modelA, modelB) => (
                  (modelA.user_info.full_name.toUpperCase() < modelB.user_info.full_name.toUpperCase()) ? -1 : 1
                ))
                .map(item =>
                  <DriverContainer
                    key={item.id}
                    driver={item}
                    refreshDrivers={() => this.onFetchDrivers()}
                  />,
                )
            }
            {drivers.length === 0 && loading === 0 &&
              <span className="Message-error">Nothing found.</span>
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
        {this.state.openDialog &&
          <AddDriverContainer
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            refreshDrivers={() => this.onFetchDrivers()}
          />
        }
      </div>
    );
  }

}
