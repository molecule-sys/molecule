import React from 'react';
import { Link } from 'react-router';

export default class ProfileNav extends React.PureComponent {

  render() {
    return (
      <nav className="SubNav">
        <ul>
          <li>
            <Link activeClassName="active" to="/profile">Basic information</Link>
          </li>
          <li>
            <Link activeClassName="active" to="/settings">Password change</Link>
          </li>
        </ul>
      </nav>
    );
  }

}
