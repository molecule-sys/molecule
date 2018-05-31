import React from 'react';
import isLogged from '../helpers/isLogged';

export default ComposedComponent =>
  class extends React.PureComponent {

    componentWillMount = () => {
      if (!isLogged()) {
        window.location.href = 'http://demo.login.molecule.ws';
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  };
