import React from 'react';
import { not } from 'ramda';
import EditOrganizationContainer from '../../containers/edit-organization-container';

export default class Executive extends React.PureComponent {

  static propTypes = {
    executive: React.PropTypes.instanceOf(Object).isRequired,
    types: React.PropTypes.instanceOf(Array).isRequired,
    activateExecutive: React.PropTypes.func,
    deactivateExecutive: React.PropTypes.func,
    refreshExecutives: React.PropTypes.func,
  }

  state = {
    openDialog: false,
    showStatusLoader: false,
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.executive.status !== this.props.executive.status) {
      this.setState({
        showStatusLoader: false,
      });
      this.props.refreshExecutives();
    }
  }

  render() {
    const { executive } = this.props;
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
                  {executive.short_name.length > 64 ?
                    `${executive.short_name.substr(0, 64)}...` : executive.short_name}
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
                Edit
              </button>
            </div>
            <div>
              {this.state.showStatusLoader &&
                <span>Изменяется статус...</span>
              }
              {!this.state.showStatusLoader && executive.status === 'ACTIVE' &&
                <button
                  className="Button ButtonLink"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.deactivateExecutive();
                  }}
                >
                  Отключить
                </button>
              }
              {!this.state.showStatusLoader && executive.status !== 'ACTIVE' &&
                <button
                  className="Button ButtonPrimary Connect"
                  onClick={() => {
                    this.setState({
                      showStatusLoader: true,
                    });
                    this.props.activateExecutive();
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
            organization={executive}
            types={this.props.types}
            typeName="executive"
            openDialog={this.state.openDialog}
            closeDialog={() => { this.setState({ openDialog: not(this.state.openDialog) }); }}
          />
        }
      </div>
    );
  }

}
