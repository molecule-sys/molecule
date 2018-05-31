import React from 'react';
import { Link } from 'react-router';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import CustomerContainer from '../../containers/customer-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Customers extends React.PureComponent {

  static propTypes = {
    customers: React.PropTypes.instanceOf(Array),
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    types: React.PropTypes.instanceOf(Array).isRequired,
    loading: React.PropTypes.number.isRequired,
    location: React.PropTypes.instanceOf(Object).isRequired,
    onSearchRequest: React.PropTypes.func,
    fetchOrganizationTypes: React.PropTypes.func,
    fetchCustomers: React.PropTypes.func,
    onChangePage: React.PropTypes.func,
  }

  state = {
    searchText: '',
    showDeactivate: false,
  }

  componentWillMount = () => {
    this.onFetchCustomers();
    this.props.fetchOrganizationTypes();
  }

  onFetchCustomers = () => {
    this.props.fetchCustomers({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchRequest({
      searchText: this.state.searchText.trim(),
      type: 'customer',
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      page,
      type: 'customer',
    });
  }

  render() {
    const { customers, types, pagination, loading } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Customers</h2>
            <Link
              className="Button ButtonPrimary"
              to={{ pathname: '/new-organization', state: { prevPath: this.props.location.pathname } }}
            >
              Add company
            </Link>
          </div>
          <form id="Search" className="Search" onSubmit={this.onFormSubmit}>
            <div className="Autocomplete Search-autocomplete">
              <div className="Autocomplete-wrapper">
                <input
                  type="search"
                  className="Input Search-input"
                  placeholder="Search company"
                  maxLength="50"
                  value={this.state.searchText}
                  onChange={event => this.setState({
                    searchText: event.target.value,
                  })}
                />
                <input className="Search-button" type="submit" />
              </div>
            </div>
            <div className="SearchHint">
              <span>Enter company name</span>
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
                    }, () => this.onFetchCustomers())
                  }
                />
                <label htmlFor="show_deactivate">Show inactive</label>
              </div>
            </div>
            {customers.length > 0 && loading === 0 &&
              customers
                .sort((modelA, modelB) => (
                  (modelA.short_name.toUpperCase() < modelB.short_name.toUpperCase()) ? -1 : 1
                ))
                .map(item =>
                  <CustomerContainer
                    key={item.id}
                    customer={item}
                    types={types}
                    refreshCustomers={() => this.onFetchCustomers()}
                  />,
                )
            }
            {customers.length === 0 && loading === 0 &&
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
      </div>
    );
  }

}
