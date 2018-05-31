import React from 'react';
import { not } from 'ramda';
import EditDriverContainer from '../../containers/edit-driver-container';

export default class Driver extends React.PureComponent {

  static propTypes = {
    driver: React.PropTypes.instanceOf(Object).isRequired,
    onDeactivateDriver: React.PropTypes.func,
    onActivateDriver: React.PropTypes.func,
    refreshDrivers: React.PropTypes.func,
  }

  state = {
    openDialog: false,
    showStatusLoader: false,
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.driver.status !== this.props.driver.status) {
      this.setState({
        showStatusLoader: false,
      });
      this.props.refreshDrivers();
    }
  }

  demoEdit = (event) => {
      this.setState({demoMessage: true});
      event.stopPropagation();
      event.preventDefault();
  }

  render() {
    const { driver } = this.props;
    return (
      <div className="SearchResultsItemOuter">
        <div className="SearchResultsItem">
          <div className="SearchResultsItemPrimary">
            <div className="SearchResultsItemImage">
              <img src="/static/images/person.png" alt="person icon" />
            </div>
            <div className="SearchResultsItemInfo">
              <div className="SearchResultsItemInfo-primary">
                <h3 className="SearchResultsItemInfo-title">
                  {driver.user_info && driver.user_info.full_name.length > 64 ?
                    `${driver.user_info.full_name.substr(0, 64)}...` : driver.user_info.full_name}
                </h3>
              </div>
              <div className="SearchResultsItemInfo-secondary vertical">
                <div className="SearchResultsItemInfo-phone">
                  {driver.user_info && driver.user_info.phone}
                </div>
                <div className="SearchResultsItemInfo-vehicle">
                  {driver.vehicles && driver.vehicles.length > 0 ?
                    driver.vehicles.map((item, i) =>
                      <div key={i} className="SearchResultsItemInfo-vehicle-item">
                        <strong>{item.name}</strong>
                      </div>,
                    )
                  :
                    <em>No connected cars</em>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="SearchResultsItemSecondary centered">
            <div>
              <button
                // className="Button ButtonPrimary"
                className="Button ButtonPrimary"
                onClick={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
                // onClick={this.demoEdit}
              >
                Edit
              </button>
            </div>
            <div>
              {this.state.showStatusLoader &&
                <span>Change the status ...</span>
              }
              {!this.state.showStatusLoader && driver.status === 1 &&
                <button
                  // className="Button ButtonLink"
                  className="Button ButtonLink ButtonDisabled"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.onDeactivateDriver();
                  }}
                >
                  Delete
                </button>
              }
              {!this.state.showStatusLoader && driver.status !== 1 &&
                <button
                  className="Button ButtonPrimary"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.onActivateDriver();
                  }}
                >
                  Enable
                </button>
              }
            </div>
          </div>

        </div>
          {this.state.demoMessage &&
          <div>
              <span className="Message-error" style={{textAlign:'right'}}>Not available in demo</span>
          </div>
          }
        {this.state.openDialog &&
          <EditDriverContainer
            driver={driver}
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
          />
        }
      </div>
    );
  }

}
