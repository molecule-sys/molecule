import React from 'react';
import { not } from 'ramda';
import EditOrganizationContainer from '../../containers/edit-organization-container';

export default class Customer extends React.PureComponent {

  static propTypes = {
    customer: React.PropTypes.instanceOf(Object).isRequired,
    types: React.PropTypes.instanceOf(Array).isRequired,
    activateCustomer: React.PropTypes.func,
    deactivateCustomer: React.PropTypes.func,
    refreshCustomers: React.PropTypes.func,
  }

  state = {
    openDialog: false,
    showStatusLoader: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.customer.status !== this.props.customer.status) {
      this.setState({
        showStatusLoader: false,
      });
      this.props.refreshCustomers();
    }
  }

  render() {
    const { customer } = this.props;
    return (
      <div className="SearchResultsItemOuter">
        <div className="SearchResultsItem">
          <div className="SearchResultsItemPrimary">
            <div className="SearchResultsItemImage">
              <img src="/static/images/car_icon.png" alt="car icon" />
            </div>
            <div className="SearchResultsItemInfo mobileVertical">
              <div className="SearchResultsItemInfo-primary">
                <h3 className="SearchResultsItemInfo-title">
                  {customer.short_name.length > 64 ?
                    `${customer.short_name.substr(0, 64)}...` : customer.short_name}
                </h3>
                <span className="SearchResultsItemInfo-balance">Balance: {customer.balance} $.</span>
              </div>
            </div>
          </div>
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
              {!this.state.showStatusLoader && customer.status === 'ACTIVE' &&
                <button
                  className="Button ButtonLink"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.deactivateCustomer();
                  }}
                >
                  Отключить
                </button>
              }
              {!this.state.showStatusLoader && customer.status !== 'ACTIVE' &&
                <button
                  className="Button ButtonPrimary Connect"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.activateCustomer();
                  }}
                >
                    Enable
                </button>
              }
            </div>
          </div>
        </div>
        {this.state.openDialog &&
          <EditOrganizationContainer
            organization={customer}
            types={this.props.types}
            typeName="customer"
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
          />
        }
      </div>
    );
  }

}

