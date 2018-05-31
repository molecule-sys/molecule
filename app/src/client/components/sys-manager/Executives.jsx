import React from 'react';
import { Link } from 'react-router';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import ExecutiveContainer from '../../containers/executive-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Executives extends React.PureComponent {

  static propTypes = {
    executives: React.PropTypes.instanceOf(Array).isRequired,
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    types: React.PropTypes.instanceOf(Array).isRequired,
    loading: React.PropTypes.number.isRequired,
    location: React.PropTypes.instanceOf(Object).isRequired,
    onSearchRequest: React.PropTypes.func,
    fetchOrganizationTypes: React.PropTypes.func,
    fetchExecutives: React.PropTypes.func,
    onChangePage: React.PropTypes.func,
  }

  state = {
    searchText: '',
    showDeactivate: false,
  }

  componentWillMount = () => {
    this.onFetchExecutives();
    this.props.fetchOrganizationTypes();
  }

  onFetchExecutives = () => {
    this.props.fetchExecutives({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchRequest({
      searchText: this.state.searchText.trim(),
      type: 'executive',
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      page,
      type: 'executive',
    });
  }

  render() {
    const { executives, types, pagination, loading } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Исполнители</h2>
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
              <span>Введите название компании</span>
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
                    }, () => this.onFetchExecutives())
                  }
                />
                <label htmlFor="show_deactivate">Показать неактивные</label>
              </div>
            </div>
            {executives.length > 0 && loading === 0 &&
              executives
                .sort((modelA, modelB) => (
                  (modelA.short_name.toUpperCase() < modelB.short_name.toUpperCase()) ? -1 : 1
                ))
                .map(item =>
                  <ExecutiveContainer
                    key={item.id}
                    executive={item}
                    types={types}
                    refreshExecutives={() => this.onFetchExecutives()}
                  />,
                )
            }
            {executives.length === 0 && loading === 0 &&
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
