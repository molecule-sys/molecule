import React from 'react';
import { not } from 'ramda';
import HeaderContainer from '../../containers/header-container';
import Pagination from '../../components/Shared/Pagination';
import UserContainer from '../../containers/user-container';
import AddUserContainer from '../../containers/add-user-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Users extends React.PureComponent {

  static propTypes = {
    profile: React.PropTypes.instanceOf(Object).isRequired,
    users: React.PropTypes.instanceOf(Array).isRequired,
    organizationList: React.PropTypes.instanceOf(Array).isRequired,
    pagination: React.PropTypes.instanceOf(Object).isRequired,
    roleId: React.PropTypes.string.isRequired,
    loading: React.PropTypes.number.isRequired,
    onSearchRequest: React.PropTypes.func,
    fetchUsers: React.PropTypes.func.isRequired,
    fetchFilterOrganizations: React.PropTypes.func,
    onChangePage: React.PropTypes.func.isRequired,
    fetchProfile: React.PropTypes.func,
  }

  state = {
    searchText: '',
    openDialog: false,
    roleName: 'staff',
    showDeactivate: false,
  }

  componentWillMount = () => {
    this.props.fetchProfile();
    this.onFetchUsers();
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchRequest({
      searchText: this.state.searchText.trim(),
      filter: this.state.roleName,
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  onFetchUsers = () => {
    this.props.fetchUsers({
      roleName: this.state.roleName,
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
    });
  }

  changePage = ({ page }) => {
    this.props.onChangePage({
      status: this.state.showDeactivate ? 'ARCHIVED' : 'ACTIVE',
      page,
      filter: this.state.roleName,
    });
  }

  render() {
    const { users, pagination, loading, organizationList } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Users</h2>
            <button
              className="Button ButtonPrimary"
              onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            >
              Add user
            </button>
          </div>
          <form id="Search" className="Search" onSubmit={this.onFormSubmit}>
            <div className="Autocomplete Search-autocomplete">
              <div className="Autocomplete-wrapper">
                <input
                  type="search"
                  className="Input Search-input"
                  placeholder="ФИО сотрудника или название организации"
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
              <span>Введите ФИО сотрудника или название организации</span>
            </div>
          </form>
          <nav className="SubNav" style={{ margin: '35px 0 50px' }}>
            <ul>
              <li>
                <a
                  className={this.state.roleName === 'staff' ? 'active' : ''}
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({
                      roleName: 'staff',
                    }, () => this.onFetchUsers());
                  }}
                >
                  Менеджеры системы
                </a>
              </li>
              <li>
                <a
                  className={this.state.roleName === 'customer' ? 'active' : ''}
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({
                      roleName: 'customer',
                    }, () => {
                      this.onFetchUsers();
                      this.props.fetchFilterOrganizations(this.state.roleName);
                    });
                  }}
                >
                  Менеджеры заказчиков
                </a>
              </li>
              <li>
                <a
                  className={this.state.roleName === 'executive' ? 'active' : ''}
                  href=""
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({
                      roleName: 'executive',
                    }, () => {
                      this.onFetchUsers();
                      this.props.fetchFilterOrganizations(this.state.roleName);
                    });
                  }}
                >
                  Менеджеры исполнителей
                </a>
              </li>
            </ul>
          </nav>
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
                    }, () => this.onFetchUsers())
                  }
                />
                <label htmlFor="show_deactivate">Show inactive</label>
              </div>
            </div>
            {users.length > 0 && loading === 0 &&
              users
                .sort((userA, userB) => (
                  (userA.user_profile.full_name.toUpperCase() < userB.user_profile.full_name.toUpperCase()) ? -1 : 1
                ))
                .map(item =>
                  <UserContainer
                    currentUserRole={this.props.profile.user_role}
                    key={item.id}
                    user={item}
                    refreshUsers={() => this.onFetchUsers()}
                  />,
                )
            }
            {users.length === 0 && loading === 0 &&
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
          <AddUserContainer
            role={this.state.roleName}
            roleId={this.props.roleId}
            organizations={organizationList}
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            fetchUsers={this.onFetchUsers}
          />
        }
      </div>
    );
  }

}
