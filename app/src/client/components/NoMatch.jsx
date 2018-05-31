import React from 'react';
import { browserHistory } from 'react-router';

export default class NoMatch extends React.PureComponent {

  componentWillMount = () => {
    browserHistory.goBack();
  }

  render() {
    return (
      <div>
        <div className="Container">
          Redirect...
        </div>
      </div>
    );
  }

}
