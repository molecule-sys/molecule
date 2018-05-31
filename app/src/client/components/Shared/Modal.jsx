import React from 'react';

export default class Modal extends React.PureComponent {

  static propTypes = {
    open: React.PropTypes.bool.isRequired,
    title: React.PropTypes.string,
    bodyClass: React.PropTypes.string,
    actions: React.PropTypes.node,
    children: React.PropTypes.node,
    close: React.PropTypes.func,
  }

  componentWillMount = () => {
    document.body.className += 'lock';
  }

  componentWillUnmount = () => {
    document.body.classList.remove('lock');
  }

  onClickHandler = () => {
    this.props.close();
  }

  render() {
    return (
      <div className={`Modal ${this.props.open ? 'show' : ''}`}>
        <div className="Modal-backdrop" onClick={this.onClickHandler} />
        <div className="Modal-content">
          <header className="Modal-header">
            <h2 className="Modal-title">{this.props.title}</h2>
          </header>
          <div className={`Modal-body ${this.props.bodyClass}`}>
            {this.props.children}
          </div>
          <footer className="Modal-footer">
            <ul>
              {this.props.actions.map((item, i) =>
                <li key={i}>{item}</li>,
              )}
            </ul>
          </footer>
        </div>
      </div>
    );
  }

}
