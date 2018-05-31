import React from 'react';
import { browserHistory } from 'react-router';

export default class Sign extends React.PureComponent {

  static propTypes = {
    login: React.PropTypes.func.isRequired,
    params: React.PropTypes.instanceOf(Object).isRequired,
  }

  componentDidMount = () => {
    localStorage.setItem('token', this.props.params.splat);
    this.props.login();
    browserHistory.push('/');
  }

  render() {
    return (
      <div>
        Redirect...
      </div>
    );
  }

}
