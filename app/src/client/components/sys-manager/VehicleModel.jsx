import React from 'react';
import { not } from 'ramda';
import EditVehicleModelContainer from '../../containers/edit-vehicle-model-container';

export default class VehicleModel extends React.PureComponent {

  static propTypes = {
    vehicleModel: React.PropTypes.instanceOf(Object).isRequired,
    currentVendor: React.PropTypes.instanceOf(Object).isRequired,
    activateModel: React.PropTypes.func,
    deactivateModel: React.PropTypes.func,
    refreshVehiclesModels: React.PropTypes.func,
  }

  state = {
    openDialog: false,
    showStatusLoader: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.vehicleModel.status !== this.props.vehicleModel.status) {
      this.setState({
        showStatusLoader: false,
      });
      this.props.refreshVehiclesModels();
    }
  }

  render() {
    const { vehicleModel, currentVendor } = this.props;
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
                  {vehicleModel.name}
                </h3>
              </div>
            </div>
          </div>
          <div className="SearchResultsItemSecondary centered">
            <div>
              <button
                className="Button ButtonPrimary"
                onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
              >
                Редактировать
              </button>
            </div>
            <div>
              {this.state.showStatusLoader &&
                <span>Изменяется статус...</span>
              }
              {!this.state.showStatusLoader && vehicleModel.status === 'ACTIVE' &&
                <button
                  className="Button ButtonLink"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.deactivateModel();
                  }}
                >
                  В архив
                </button>
              }
              {!this.state.showStatusLoader && vehicleModel.status === 'ARCHIVED' &&
                <button
                  className="Button ButtonPrimary Connect"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.activateModel();
                  }}
                >
                    Enable
                </button>
              }
              {!this.state.showStatusLoader && vehicleModel.status === 'UNAPPROVED' &&
                <button
                  className="Button ButtonDanger Connect"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.activateModel();
                  }}
                >
                    Confirm
                </button>
              }
            </div>
          </div>
        </div>
        {this.state.openDialog &&
          <EditVehicleModelContainer
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
            vendorId={currentVendor.id}
            vehicleModel={vehicleModel}
          />
        }
      </div>
    );
  }

}
