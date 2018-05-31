import React from 'react';
import MaskedInput from 'react-maskedinput';
import HeaderContainer from '../../containers/header-container';
import Client from './Client';
import isLogged from '../../decorators/isLogged';

@isLogged
export default class Clients extends React.PureComponent {

  static propTypes = {
    clients: React.PropTypes.instanceOf(Object).isRequired,
    loading: React.PropTypes.number.isRequired,
    onSearchRequest: React.PropTypes.func,
    serviceList: React.PropTypes.instanceOf(Array).isRequired,
    fetchServiceList: React.PropTypes.func,
  }

  state = {
    searchText: '',
    searchResultsEmpty: false,
  }

  componentWillMount = () => {
    this.props.fetchServiceList();
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      searchResultsEmpty: nextProps.clients.length === 0,
    });
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.onSearchRequest(this.state.searchText.slice(1));
  }

  render() {
    const { clients, loading, serviceList } = this.props;
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Customer search</h2>
          </div>
          <form id="Search" className="Search" onSubmit={this.onFormSubmit}>
            <div className="Autocomplete Search-autocomplete">
              <div className="Autocomplete-wrapper">
                <MaskedInput
                  mask="+11111111111"
                  type="tel"
                  className="Input Search-input"
                  placeholder="Phone customer +1**********"
                  pattern="^(\+1{1})?([1-9][0-9]{9})$"
                  value={this.state.searchText}
                  minLength="11"
                  maxLength="11"
                  onChange={event => this.setState({
                    searchText: event.target.value,
                  })}
                  required
                />
                <input className="Search-button" type="submit" />
              </div>
            </div>
            <div className="SearchHint">
              <span>Enter the customer's phone number</span>
            </div>
          </form>
          {Object.prototype.hasOwnProperty.call(clients, 'full_name') &&
            <div className="Clients">
              <h3>{clients.full_name}</h3>
              <span>{clients.phone}</span>
            </div>
          }
          <div className="SearchResults">
            {this.state.searchResultsEmpty && loading === 0 &&
              <span className="Message-error">Nothing found.</span>
            }
            {loading > 0 &&
              <span className="SearchResults-loading">Loading. Wait...</span>
            }
            {clients.vehicles &&
              clients.vehicles.length > 0 &&
                clients.vehicles.map((item, i) =>
                  <Client
                    key={`${item.vehicle_id}${i}`}
                    serviceList={serviceList}
                    vehicle={item}
                    client={clients}
                  />
                )
            }
            {clients.vehicles &&
              clients.vehicles.length === 0 && Object.prototype.hasOwnProperty.call(clients, 'full_name') &&
                <em className="Clients-empty-vehicles">No connected cars</em>
            }
          </div>
        </div>
      </div>
    );
  }

}
