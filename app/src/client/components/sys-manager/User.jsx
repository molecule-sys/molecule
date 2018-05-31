import React from 'react';
import { not } from 'ramda';
import EditUserContainer from '../../containers/edit-user-container';

export default class User extends React.PureComponent {

  static propTypes = {
    currentUserRole: React.PropTypes.instanceOf(Object).isRequired,
    user: React.PropTypes.instanceOf(Object).isRequired,
    activateUser: React.PropTypes.func,
    deactivateUser: React.PropTypes.func,
    refreshUsers: React.PropTypes.func,
    onLoginAs: React.PropTypes.func,
  }

  state = {
    openDialog: false,
    showStatusLoader: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.status !== this.props.user.status) {
      this.setState({
        showStatusLoader: false,
      });
      this.props.refreshUsers();
    }
  }

  onRelogin = () => {
    this.props.onLoginAs({
      id: this.props.user.id,
      roleCode: this.props.user.role_code,
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div className="SearchResultsItemOuter">
        <div className="SearchResultsItem">
          <div className="SearchResultsItemPrimary">
            <div className="SearchResultsItemImage">
              <img src="/static/images/person.png" alt="person icon" />
            </div>
            <div className="SearchResultsItemInfo mobileVertical">
              <div className="SearchResultsItemInfo-primary">
                <h3 className="SearchResultsItemInfo-title">
                  {user.user_profile.full_name.length > 64 ?
                    `${user.user_profile.full_name.substr(0, 64)}...` : user.user_profile.full_name}
                </h3>
                <span className="SearchResultsItemInfo-balance">{user.organization ? user.organization.short_name : ''}</span>
              </div>
            </div>
          </div>
          {user.role_code !== 'SYSTEM_ADMIN' &&
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
                {!this.state.showStatusLoader && user.status === 'ACTIVE' &&
                  <button
                    className="Button ButtonLink"
                    onClick={() => {
                      this.setState({
                        showStatusLoader: true,
                      });
                      this.props.deactivateUser();
                    }}
                  >
                    Отключить
                  </button>
                }
                {!this.state.showStatusLoader && user.status !== 'ACTIVE' &&
                  <button
                    className="Button ButtonPrimary Connect"
                    onClick={() => {
                      this.setState({
                        showStatusLoader: true,
                      });
                      this.props.activateUser();
                    }}
                  >
                      Enable
                  </button>
                }
              </div>
              {this.props.currentUserRole.code === 'SYSTEM_ADMIN' &&
                <button
                  className="ReloginButton"
                  onClick={this.onRelogin}
                />
              }
            </div>
          }
        </div>
        {this.state.openDialog &&
          <EditUserContainer
            user={user}
            role={user.user_info.role}
            organization={user.organization ? user.organization.short_name : ''}
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
          />
        }
      </div>
    );
  }

}
