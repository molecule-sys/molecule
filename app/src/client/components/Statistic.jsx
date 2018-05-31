import React from 'react';
import DatePicker from 'react-datepicker';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import Autocomplete from './Shared/Autocomplete';
import HeaderContainer from '../containers/header-container';
import isLogged from '../decorators/isLogged';
import getCSVData from '../helpers/getCSVData';

@isLogged
export default class Statistic extends React.PureComponent {

  static propTypes = {
    acts: React.PropTypes.instanceOf(Array),
    statistic: React.PropTypes.instanceOf(Array),
    profile: React.PropTypes.instanceOf(Object).isRequired,
    filterOrganizationList: React.PropTypes.instanceOf(Array).isRequired,
    filterDriversList: React.PropTypes.instanceOf(Array).isRequired,
    filterVehiclesList: React.PropTypes.instanceOf(Array).isRequired,
    loading: React.PropTypes.number.isRequired,
    fetchProfile: React.PropTypes.func,
    fetchFilterOrganizations: React.PropTypes.func,
    fetchFilterVehicles: React.PropTypes.func,
    fetchFilterDrivers: React.PropTypes.func,
    fetchStatistic: React.PropTypes.func,
    clearStatistic: React.PropTypes.func,
    fetchActs: React.PropTypes.func,
    fetchActPrint: React.PropTypes.func,
    actToPrint: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      dimensions: [],
      start_date: moment().subtract(7, 'day'),
      end_date: moment(),
      type: 'by_order',
      organization: '',
      vehicle: '',
      vehicleTitle: '',
      driver: '',
      driverTitle: '',
      service: '',
      emptyMessageShow: false,
      emptyMessage: '',
      statistic_type: '',
      guid: '',
      fetchActs: false,
      demoMessage: false,
    };
  }

  demoEdit = (event) => {
      console.log(1);
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  componentWillMount = () => {
    this.props.fetchProfile();
    this.props.fetchFilterVehicles({
      organization_id: this.state.organization,
      driver_id: this.state.driver,
    });
    this.props.fetchFilterDrivers({
      organization_id: this.state.organization,
      vehicle_id: this.state.vehicle,
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.statistic) {
      if (nextProps.statistic.length === 0) {
        this.setState({
          emptyMessageShow: true,
          emptyMessage: 'Statistical sampling by selected parameters is absent',
        });
      }
    }
    if (nextProps.profile.user_role && this.state.statistic_type === '') {
      if (nextProps.profile.user_role.code === 'SYSTEM_MANAGER' || nextProps.profile.user_role.code === 'SYSTEM_ADMIN') {
        this.setState({
          statistic_type: 'customer',
        }, () => this.props.fetchFilterOrganizations(this.state.statistic_type));
      }
      if (nextProps.profile.user_role.code === 'EXEC_OPERATOR') {
        this.setState({
          dimensions: ['service', 'vehicle', 'driver'],
        });
      }
    }
    if (Object.prototype.hasOwnProperty.call(nextProps.profile, 'organization') &&
      nextProps.profile.organization !== null &&
      !this.state.fetchActs
    ) {
      this.props.fetchActs({
        id: nextProps.profile.organization.organization_id,
      });
      this.setState({
        fetchActs: true,
      });
    }
  }

  onRefreshData = () => {
    this.props.fetchFilterVehicles({
      organization_id: this.state.organization,
      driver_id: this.state.driver,
    });
    this.props.fetchFilterDrivers({
      organization_id: this.state.organization,
      vehicle_id: this.state.vehicle,
    });
  }

  onFetchStatistic = () => {
    this.props.fetchStatistic({
      dimensions: this.state.dimensions,
      startDate: moment(this.state.start_date).format('YYYY-MM-DD'),
      endDate: moment(this.state.end_date).format('YYYY-MM-DD'),
      type: this.state.type,
      organization: this.state.organization,
      vehicle: this.state.vehicle,
      driver: this.state.driver,
      statisticType: this.state.statistic_type,
    });
  }

  onSetDimensions = (event) => {
    this.setState({
      dimensions: event.target.checked ?
      [...this.state.dimensions, event.target.value] :
      this.state.dimensions.filter(item => item !== event.target.value),
    }, () => {
      if (!this.onDriverAndVehicle()) {
        this.setState({
          dimensions: this.state.dimensions.filter(item => item !== 'service'),
        });
      }
    });
  }

  onFilterDriver = ({ searchText }) => {
    const driver =
      this.props.filterDriversList.filter(item =>
        item.name === searchText);
    this.setState({
      driverTitle: searchText,
      driver: driver.length > 0 ? driver[0].id : '',
    }, () => this.onRefreshData());
  }

  onFilterVehicle = ({ searchText }) => {
    const vehicle =
      this.props.filterVehiclesList.filter(item =>
        item.name === searchText);
    this.setState({
      vehicleTitle: searchText,
      vehicle: vehicle.length > 0 ? vehicle[0].id : '',
    }, () => this.onRefreshData());
  }

  onDriverAndVehicle = () => {
    const isDriver =
      this.state.dimensions.some(item => item === 'driver');
    const isVehicle =
      this.state.dimensions.some(item => item === 'vehicle');
    return [isDriver, isVehicle].some(item => item);
  }

  render() {
    const { statistic, profile, filterOrganizationList, filterDriversList, filterVehiclesList, acts, loading } = this.props;
    const isSysManager =
      profile.user_role ? profile.user_role.code === 'SYSTEM_MANAGER' || profile.user_role.code === 'SYSTEM_ADMIN' : '';
    const isExecOperator =
      profile.user_role ? profile.user_role.code === 'EXEC_OPERATOR' : '';
    const isCustomer =
      profile.organization_type ? profile.organization_type === 'CUSTOMER' : '';
    const isExecutive =
      profile.organization_type ? profile.organization_type === 'EXECUTIVE' : '';
    return (
      <div>
        <HeaderContainer />
        <div className="PageTitle">
          <h2>Statistics</h2>
        </div>
        {isSysManager &&
          <nav className="SubNav SubNav--statistic">
            <ul>
              <li>
                <a
                  className={this.state.statistic_type === 'customer' ? 'active' : ''}
                  href=""
                  onClick={
                    event => {
                      event.preventDefault();
                      this.setState({
                        statistic_type: 'customer',
                        organization: '',
                        vehicle: '',
                        driver: '',
                        driverTitle: '',
                        vehicleTitle: '',
                      }, () => this.props.fetchFilterOrganizations(this.state.statistic_type));
                      this.props.clearStatistic();
                    }
                  }
                >
                  By customer
                </a>
              </li>
              <li>
                <a
                  className={this.state.statistic_type === 'executive' ? 'active' : ''}
                  href=""
                  onClick={
                    event => {
                      event.preventDefault();
                      this.setState({
                        statistic_type: 'executive',
                        organization: '',
                        type: 'by_order',
                        vehicle: '',
                        driver: '',
                        driverTitle: '',
                        vehicleTitle: '',
                      }, () => this.props.fetchFilterOrganizations(this.state.statistic_type));
                      this.props.clearStatistic();
                    }
                  }
                >
                  By executor
                </a>
              </li>
            </ul>
          </nav>
        }
        <div className="Statistic">
          {profile.user_role ?
            <form id="Statistic">
              <div className="Statistic-primary">
                <div className={`Statistic-primary-top ${isExecOperator ? 'Full' : ''}`}>
                  <div>
                    <label htmlFor="startDate">Date from</label>
                    <DatePicker
                      className="Input"
                      id="startDate"
                      dateFormat="YYYY-MM-DD"
                      maxDate={this.state.end_date}
                      selected={this.state.start_date}
                      locale="en"
                      value={moment(this.state.start_date).format('DD-MM-YYYY')}
                      readOnly={true}
                      onChange={(date) => {
                        this.setState({
                          start_date: moment(date),
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label htmlFor="endDate">Date by</label>
                    <DatePicker
                      className="Input"
                      id="endDate"
                      dateFormat="YYYY-MM-DD"
                      maxDate={moment()}
                      selected={this.state.end_date}
                      locale="en"
                      value={moment(this.state.end_date).format('DD-MM-YYYY')}
                      readOnly={true}
                      onChange={(date) => {
                        if (moment(date).diff(this.state.start_date) <= 0) {
                          this.setState({
                            start_date: moment(date),
                          });
                        }
                        this.setState({
                          end_date: moment(date),
                        });
                      }}
                    />
                  </div>
                  {!isExecOperator &&
                    <div>
                      <label htmlFor="type">Type</label>
                      <div className="Select-outer Select--fullWidth">
                        <select
                          id="type"
                          className="Select"
                          onChange={(event) => {
                            this.setState({
                              type: event.target.value,
                            }, () => {
                              if (this.state.type === 'add_to_balance') {
                                this.setState({
                                  vehicle: '',
                                  driver: '',
                                  dimensions: ['customer_org'],
                                });
                              }
                            });
                          }}
                          style={{ padding: '7px 30px 7px 12px' }}
                        >
                          <option value="by_order">Operations</option>
                          {!isExecutive && !isExecOperator && this.state.statistic_type !== 'executive' &&
                            <option value="add_to_balance">Replenishments</option>
                          }
                          {/* <option value="tax">Комиссия</option> */}
                        </select>
                      </div>
                    </div>
                  }
                  {isSysManager &&
                    <div>
                      <label htmlFor="type">Company</label>
                      <div className="Select-outer Select--fullWidth">
                        <select
                          id="type"
                          className="Select"
                          defaultValue=""
                          onChange={(event) => {
                            this.setState({
                              organization: event.target.value,
                              vehicle: '',
                              driver: '',
                              driverTitle: '',
                              vehicleTitle: '',
                            }, () => this.onRefreshData());
                          }}
                          style={{ padding: '7px 30px 7px 12px' }}
                        >
                          <option value="" className="disabled">All сompanies</option>
                          {filterOrganizationList.map(item =>
                            <option key={item.id} value={item.id}>{item.name}</option>,
                          )}
                        </select>
                      </div>
                    </div>
                  }
                </div>
                {!isExecOperator && this.state.type !== 'add_to_balance' &&
                  <div className="Statistic-primary-bottom">
                    {filterVehiclesList.length > 0 &&
                      <div>
                        <label htmlFor="auto">Auto</label>
                        <Autocomplete
                          id="auto"
                          wrapperClassName="DriverModal-autocomplete"
                          inputClassName="DriverModal-input-autocomplete"
                          placeholder="Filter by auto"
                          maxLength="100"
                          inputValue={this.state.vehicleTitle}
                          takeState={true}
                          value={true}
                          data={filterVehiclesList
                            .map(item => (item.name))}
                          searchText={this.onFilterVehicle}
                        />
                      </div>
                    }
                    {filterDriversList.length > 0 &&
                      <div>
                        <label htmlFor="driver_complete">Driver</label>
                        <Autocomplete
                          id="driver_complete"
                          wrapperClassName="DriverModal-autocomplete"
                          inputClassName="DriverModal-input-autocomplete"
                          maxLength="100"
                          inputValue={this.state.driverTitle}
                          takeState={true}
                          value={true}
                          placeholder="Filter by driver"
                          data={filterDriversList
                            .map(item => (item.name))}
                          searchText={this.onFilterDriver}
                        />
                      </div>
                    }
                  </div>
                }
              </div>
              <div className="Statistic-secondary">
                {!isExecOperator && this.state.type !== 'add_to_balance' &&
                  <div className="Checkbox-group">
                    <span>Detailing: </span>
                    <div>
                      <div className="Checkbox">
                        <input
                          id="vehicle"
                          type="checkbox"
                          value="vehicle"
                          onChange={this.onSetDimensions}
                        />
                        <label htmlFor="vehicle" />
                      </div>
                      <label htmlFor="vehicle">By auto</label>
                    </div>
                    <div>
                      <div className="Checkbox">
                        <input
                          id="driver"
                          type="checkbox"
                          value="driver"
                          onChange={this.onSetDimensions}
                        />
                        <label htmlFor="driver" />
                      </div>
                      <label htmlFor="driver">By driver</label>
                    </div>
                    {!isCustomer &&
                      <div>
                        <div className="Checkbox">
                          <input
                            id="customer_org"
                            type="checkbox"
                            value="customer_org"
                            onChange={this.onSetDimensions}
                          />
                          <label htmlFor="customer_org" />
                        </div>
                        <label htmlFor="customer_org">By customer</label>
                      </div>
                    }
                    {!isExecutive && !isExecOperator &&
                      <div>
                        <div className="Checkbox">
                          <input
                            id="executive_org"
                            type="checkbox"
                            value="executive_org"
                            onChange={this.onSetDimensions}
                          />
                          <label htmlFor="executive_org" />
                        </div>
                        <label htmlFor="executive_org">By executor</label>
                      </div>
                    }
                    <div>
                      <div className="Checkbox">
                        <input
                          id="service"
                          type="checkbox"
                          value="service"
                          checked={this.state.dimensions.some(item => item === 'service')}
                          disabled={!this.onDriverAndVehicle()}
                          onChange={this.onSetDimensions}
                        />
                        <label htmlFor="service" />
                      </div>
                      <label htmlFor="service">Date</label>
                    </div>
                  </div>
                }
                <div>
                  <button
                    type="button"
                    className="Button ButtonPrimary"
                    // className="Button ButtonPrimary ButtonDisabled"
                    onClick={this.onFetchStatistic}
                  >
                    Form
                  </button>
                </div>
              </div>
            </form>
          :
            <span className="SearchResults-loading">Loading. Wait...</span>
          }
          {statistic && statistic.length > 0 ?
            <div className="StatisticTableWrapper">
              <div className="StatisticTableTop">
                {/*<CSVLink*/}
                  {/*filename="molecule_statistic.csv"*/}
                  {/*data={getCSVData(statistic)}*/}
                  {/*separator={';'}*/}
                {/*>*/}
                    {/*Download the report in CSV format*/}
                {/*</CSVLink>*/}
              </div>
              <table className="Table">
                <thead>
                  <tr>
                    {statistic
                      .some(item => item.payment_date) &&
                        <th>Date</th>
                    }
                    {statistic
                      .some(item => item.order_date) &&
                        <th>Date service</th>
                    }
                    {statistic
                      .some(item => item.vehicle_name) &&
                        <th>Auto</th>
                    }
                    {!isExecOperator && statistic
                      .some(item => item.full_name) &&
                        <th>Name of the driver</th>
                    }
                    {statistic
                      .some(item => item.organization_from_name) &&
                        <th>Customer</th>
                    }
                    {statistic
                      .some(item => item.organization_to_name) &&
                        <th>Executor</th>
                    }
                    {statistic
                      .some(item => item.order_content) &&
                        <th>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ width: '80%' }}>Description of service</span>
                            <span style={{ textAlign: 'center' }}>Price, USD</span>
                          </div>
                        </th>
                    }
                    {statistic
                      .some(item => item.total_sum) &&
                        <th style={{ textAlign: 'center' }}>Cost, USD</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  {statistic
                    .sort((statisticA, statisticB) => {
                      if (statisticA.order_date) {
                        return (new Date(statisticA.order_date).getTime() > new Date(statisticB.order_date).getTime()) ? -1 : 1;
                      }
                      if (statisticA.full_name) {
                        return (statisticA.full_name.toUpperCase() < statisticB.full_name.toUpperCase()) - (statisticB.full_name.toUpperCase() < statisticA.full_name.toUpperCase());
                      }
                      if (statisticA.vehicle_name) {
                        return (statisticA.vehicle_name.toUpperCase() < statisticB.vehicle_name.toUpperCase()) - (statisticB.vehicle_name.toUpperCase() < statisticA.vehicle_name.toUpperCase());
                      }
                    })
                    .map(item =>
                      <tr key={item.id}>
                        {item.payment_date &&
                          <td>{moment(item.payment_date).locale('ru').format('DD.MM.YYYY')}</td>
                        }
                        {item.order_date &&
                          <td>{moment(item.order_date).locale('ru').format('DD.MM.YYYY')} {moment(`${item.order_date.replace(/\s/ig, 'T')}.${Math.abs(new Date().getTimezoneOffset())}Z`).locale('ru').format('LT')}</td>
                        }
                        {item.vehicle_name &&
                          <td>{item.vehicle_name}</td>
                        }
                        {!isExecOperator && item.full_name &&
                          <td>{item.full_name}</td>
                        }
                        {item.organization_from_name &&
                          <td>{item.organization_from_name}</td>
                        }
                        {item.organization_to_name &&
                          <td>{item.organization_to_name}</td>
                        }
                        {item.order_content &&
                          <td className="NoPaddingTd">
                            <table>
                              <tbody>
                                {JSON.parse(item.order_content).map((elm, i) =>
                                  <tr key={i}>
                                    <td>{elm.name} {Number(elm.count) > 1 ? `(${elm.count})` : ''}</td>
                                    <td style={{ textAlign: `${isExecOperator ? 'center' : 'left'}` }}>{elm.price}</td>
                                  </tr>,
                                )}
                              </tbody>
                            </table>
                          </td>
                        }
                        {item.total_sum &&
                          <td style={{ textAlign: 'center' }}>{item.total_sum}</td>
                        }
                      </tr>,
                  )}
                </tbody>
              </table>
              {statistic.length > 0 && statistic.every(item => item.total_sum) &&
                <div style={{ textAlign: 'right' }}>
                  <strong>Total: </strong>
                  <span>{statistic
                    .map(item =>
                      item.total_sum).reduce((sum, current) =>
                        Number(sum) + Number(current))} $</span>
                </div>
              }
            </div>
          :
            <span className="Message-error">{this.state.emptyMessage}</span>
          }
          {acts.length > 0 &&
            <div className="ProfileHistory">
              <h3>Acts of the executed works</h3>
              <table className="Table">
                <tbody>
                  {acts.map((item, i) =>
                    <tr key={i}>
                      <td style={{ padding: '10px 0' }}>Act of the executed works from {moment(item.Date).locale('ru').format('DD.MM.YYYY')}</td>
                      <td style={{ textAlign: 'right', padding: '10px 0' }}>
                        {this.props.actToPrint && this.state.guid === item.Ref_Key &&
                          <a
                            id="actToPrint"
                            style={{ padding: '9px 12px', margin: '5px 0' }}
                            className="Button ButtonPrimary ButtonDisabled"
                            rel="noopener noreferrer"
                            target="_blank"
                            href={this.props.actToPrint}
                          >
                              Print the statement
                          </a>
                        }
                        <button
                          style={{ marginLeft: '10px' }}
                          className="Button ButtonPrimary"
                          onClick={this.demoEdit}
                          // onClick={
                          //   () => (
                          //     this.props.fetchActPrint({
                          //       guid: item.Ref_Key,
                          //     }),
                          //     this.setState({
                          //       guid: item.Ref_Key,
                          //     })
                          //   )
                          // }
                        >
                            To request statement
                        </button>
                      </td>
                        {this.state.demoMessage && <td>
                          <span className="Message-error" style={{color:'red'}}>Not available in demo</span>
                      </td>}
                    </tr>,
                  )}
                </tbody>
              </table>
            </div>
          }
          <span className="SearchResults-loading">
            {this.props.profile.user_role && this.props.profile.user_role.code === 'ORG_MANAGER' && loading > 0 &&
              <span>Loading acts of the executed works ...</span>
            }
          </span>
        </div>
      </div>
    );
  }

}
