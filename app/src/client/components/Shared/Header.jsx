import React from 'react';
import { Link } from 'react-router';
import { not } from 'ramda';
import confirmMsg from '../../helpers/confirm';
import RefillBalanceContainer from '../../containers/refill-balance-container';

export default class Header extends React.PureComponent {

  static propTypes = {
    isLogged: React.PropTypes.bool.isRequired,
    project: React.PropTypes.string.isRequired,
    balance: React.PropTypes.number,
    exchangeWaiting: React.PropTypes.number,
    logout: React.PropTypes.func.isRequired,
    fetchBalance: React.PropTypes.func.isRequired,
    onWaiting: React.PropTypes.func.isRequired,
  }

  state = {
    openDialog: false,
    openMenu: false,
  }

  componentWillMount = () => {
    if (this.props.project === 'org-manager') {
      this.props.fetchBalance();
      this.props.onWaiting();
    }
  }

  logout = () => {
    if (confirmMsg('Are you sure you want to quit?')) {
      this.props.logout();
    }
  }

  render() {
    return (
      <div>
        <header className={`Header ${this.state.openMenu ? 'show' : ''}`}>
          <div
            className="Burger"
            onClick={() => {
              document.body.querySelector('#Nav').style.height = `${document.body.scrollHeight}px`;
              this.setState({ openMenu: not(this.state.openMenu) });
            }}
          >
            <span />
            <span />
            <span />
          </div>
          {this.props.project !== 'login' &&
            <div className="Header-wrapper">
              <div className="Header-logotype">
                <Link to="/">
                  <img src="/static/images/menu_logo.png" alt="Logo" />
                </Link>
              </div>
              {this.props.isLogged &&
                <nav id="Nav" className={`Nav ${this.state.openMenu ? 'show' : ''} ${this.props.project}`}>
                  {this.props.project === 'org-manager' && this.props.balance > -1 &&
                    <div
                      className="Header-balance"
                    >
                      <small>Balance</small>
                      <span>{this.props.balance} $.</span>
                    </div>
                  }
                  <ul className="Nav-primary">
                    {this.props.project === 'org-manager' &&
                      <li>
                        <a
                          onClick={(event) => {
                            event.preventDefault();
                            this.setState({ openDialog: not(this.state.openDialog) });
                          }}
                          href=""
                        >
                          Deposit
                        </a>
                      </li>
                    }
                    {this.props.project === 'operator' &&
                      <li>
                        <Link activeClassName="active" to="/">Customer search</Link>
                      </li>
                    }
                    {this.props.project === 'operator' &&
                      <li>
                        <Link activeClassName="active" to="/orders">Operations</Link>
                      </li>
                    }
                    {this.props.project === 'org-manager' &&
                      <li>
                        <Link activeClassName="active" to="/">Auto</Link>
                      </li>
                    }
                    {this.props.project === 'org-manager' &&
                      <li>
                        <Link activeClassName="active" to="/drivers">Drivers</Link>
                      </li>
                    }
                    {this.props.project === 'sys-manager' &&
                      <li>
                        <Link activeClassName="active" to="/">Customers</Link>
                      </li>
                    }
                    {this.props.project === 'sys-manager' &&
                      <li>
                        <Link activeClassName="active" to="executives">Сontractors</Link>
                      </li>
                    }
                    {this.props.project === 'sys-manager' &&
                      <li>
                        <Link activeClassName="active" to="/vehicle-models">Марки/Модели</Link>
                      </li>
                    }
                    {this.props.project === 'sys-manager' &&
                      <li>
                        <Link activeClassName="active" to="/users">Users</Link>
                      </li>
                    }
                    <li>
                      <Link activeClassName="active" to="/profile">Profile</Link>
                    </li>
                    <li>
                      <Link activeClassName="active" to="/statistic">Reports</Link>
                    </li>
                    <li>
                      <Link activeClassName="active" to="/feedback">Support</Link>
                    </li>
                  </ul>
                  {this.props.isLogged &&
                    <ul className="Nav-secondary">
                      <li className="Nav-secondary-login">
                        <a href="" onClick={this.logout}>Logout</a>
                      </li>
                    </ul>
                  }
                </nav>
              }
            </div>
          }
          {this.state.openDialog &&
            <RefillBalanceContainer
              balance={this.props.balance}
              exchangeWaiting={this.props.exchangeWaiting}
              openDialog={this.state.openDialog}
              closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            />
          }
        </header>
        <div
          className="Overlay"
          onClick={() => { this.setState({ openMenu: not(this.state.openMenu) }); }}
        />
      </div>
    );
  }

}
