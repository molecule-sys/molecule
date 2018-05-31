import React from 'react';
import { not } from 'ramda';
import ProfileNav from './ProfileNav';
import HeaderContainer from '../../containers/header-container';
import ProfileEditUserContainer from '../../containers/profile-edit-user-container';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Profile extends React.PureComponent {

  static propTypes = {
    profile: React.PropTypes.instanceOf(Object).isRequired,
    fetchProfile: React.PropTypes.func,
  }

  state = {
    openDialog: false,
  }

  componentWillMount = () => {
    this.props.fetchProfile();
  }

  render() {
    const { profile } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Profile</h2>
            {profile.user &&
              <button
                // className="Button ButtonPrimary"
                className="Button ButtonPrimary "
                onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
              >
                Edit profile
              </button>
            }
          </div>
          <ProfileNav />
          <div className="Profile">
            <div className="ProfileInfo">
              {profile.user &&
                <div>
                  <h3>Basic information</h3>
                  <table className="Table">
                    <tbody>
                      {profile.user.username &&
                        <tr>
                          <td><strong>Login</strong></td>
                          <td>{profile.user.username}</td>
                        </tr>
                      }
                      {profile.user_role &&
                        <tr>
                          <td><strong>Role</strong></td>
                          <td>{(profile.user_role.name === 'Менеджер организации') ? 'Manager of the organization' :
                              (profile.user_role.name === 'Оператор организации-исполнителя') ? 'Operator of the implementing organization' :
                                  profile.user_role.name}</td>
                        </tr>
                      }
                      {profile.user_info.full_name &&
                        <tr>
                          <td><strong>Full Name</strong></td>
                          <td>{profile.user_info.full_name}</td>
                        </tr>
                      }
                      {profile.user.email &&
                        <tr>
                          <td><strong>Email</strong></td>
                          <td>{profile.user.email}</td>
                        </tr>
                      }
                      {profile.user_info.phone &&
                        <tr>
                          <td><strong>Phone</strong></td>
                          <td>{profile.user_info.phone}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }
              {profile.organization &&
                <div>
                  <h3>Company data</h3>
                  <table className="Table">
                    <tbody>
                      {profile.organization.name &&
                        <tr>
                          <td><strong>Company Name</strong></td>
                          <td>{profile.organization.name}</td>
                        </tr>
                      }
                      {profile.organization.inn &&
                        <tr>
                          <td><strong>Tax number</strong></td>
                          <td>{profile.organization.inn}</td>
                        </tr>
                      }
                      {/*todo KPP*/}
                      {profile.organization.ur_address &&
                        <tr>
                          <td><strong>Company legal address</strong></td>
                          <td>{profile.organization.ur_address}</td>
                        </tr>
                      }
                      {profile.organization.address &&
                        <tr>
                          <td><strong>Post address</strong></td>
                          <td>{profile.organization.address}</td>
                        </tr>
                      }
                      {profile.organization.requisits &&
                        <tr>
                          <td><strong>Client Bank Account</strong></td>
                          <td>{profile.organization.requisits}</td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }
            </div>
          </div>
        </div>
        {this.state.openDialog &&
          <ProfileEditUserContainer
            user={this.props.profile.user}
            userInfo={this.props.profile.user_info}
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
          />
        }
      </div>
    );
  }

}
