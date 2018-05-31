import React from 'react';
import { Link } from 'react-router';

export default class RecoverySuccess extends React.PureComponent {

  render() {
    return (
      <div>
        <div className="Container" style={{ textAlign: 'center' }}>
          <div className="PageTitle">
            <img src="/static/images/enter_logo.png" alt="Логотип" />
          </div>
          <div>
            <h2 style={{ margin: '0 0 25px' }}>Временный пароль отправлен на почту</h2>
          </div>
          <Link style={{ margin: '0 15px' }} className="Button ButtonPrimary" to="/">Авторизация</Link>
        </div>
      </div>
    );
  }

}
