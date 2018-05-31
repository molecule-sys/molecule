import React from 'react';
import { not } from 'ramda';
import NewOperationsContainer from '../../containers/new-operations-container';

export default class Client extends React.PureComponent {

  static propTypes = {
    client: React.PropTypes.instanceOf(Object).isRequired,
    vehicle: React.PropTypes.instanceOf(Object).isRequired,
    serviceList: React.PropTypes.instanceOf(Array).isRequired,
  }

  state = {
    openDialog: false,
  };

  handleToggleDialog = (event) => {
    event.preventDefault();
    this.setState({
      openDialog: not(this.state.openDialog),
    });
  };

  render() {
    const { client, vehicle, serviceList } = this.props;
    return (
      <div className="SearchResultsItemOuter">
        <a href="" className="SearchResultsItem Client" onClick={this.handleToggleDialog}>
          <div className="SearchResultsItemPrimary verticalAlign">
            <div className="SearchResultsItemImage">
              <img src="/static/images/car_icon.png" alt="car icon" />
            </div>
            <div className="SearchResultsItemInfo">
              <div className="SearchResultsItemInfo-primary">
                <h3 className="SearchResultsItemInfo-title noMargin">
                  {vehicle && vehicle.car.length > 64 ?
                    `${vehicle.car.substr(0, 64)}...` : vehicle.car}
                </h3>
              </div>
            </div>
          </div>
          <div className="SearchResultsItemSecondary verticalAlign">
            <div className="SearchResultsItemCarId ClientCarId">
              {vehicle && vehicle.number}
            </div>
          </div>
        </a>
        {this.state.openDialog &&
          <NewOperationsContainer
            openDialog={this.state.openDialog}
            client={client}
            vehicle={vehicle}
            serviceList={serviceList}
            closeDialog={() => {
              this.setState({
                openDialog: not(this.state.openDialog),
              });
            }}
          />
        }
      </div>
    );
  }

}
