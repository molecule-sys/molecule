import React from 'react';
import moment from 'moment';
import { not } from 'ramda';
import Modal from '../Shared/Modal';
import confirmMsg from '../../helpers/confirm';
import formIsValid from '../../helpers/form-validation';

export default class Order extends React.PureComponent {

  static propTypes = {
    order: React.PropTypes.instanceOf(Object).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    setConfirm: React.PropTypes.func.isRequired,
    renewCode: React.PropTypes.func.isRequired,
    deleteOrder: React.PropTypes.func.isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
  }

  state = {
    openDialog: false,
    smsCode: '',
    renewMessage: 'SMS-код выслан повторно',
    showRenewMessage: false,
    seconds: this.props.order.renew_code_expire / 1000,
  };

  componentWillMount = () => {
    if (this.props.order) {
      if (this.props.order.renew_code_expire > 0) {
        this.timer();
      }
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.id === this.props.order.id) {
      setTimeout(() => {
        this.props.clearCallbackResponse('confirmOrder');
      }, 5000);
    }
  }

  onConfirm = (event) => {
    if (formIsValid(`#Confirm-form-${this.props.order.id}`)) {
      event.preventDefault();
      this.props.setConfirm({
        id: this.props.order.id,
        smsCode: this.state.smsCode,
      });
      this.props.clearCallbackResponse('confirmOrder');
    }
  }

  onRenewCode = () => {
    this.props.renewCode(this.props.order.id);
    this.setState({
      seconds: 60,
      showRenewMessage: true,
    });
    this.timer();
    setTimeout(() => {
      this.setState({
        showRenewMessage: false,
      });
    }, 3000);
  }

  onDeleteOrder = () => {
    if (confirmMsg('Вы уверены что хотите удалить заказ?')) {
      this.props.deleteOrder(this.props.order.id);
    }
  }

  toggleDialog = (event) => {
    event.preventDefault();
    this.setState({
      openDialog: not(this.state.openDialog),
    });
  }

  timer = () => {
    setInterval(() => {
      this.setState({
        seconds: this.state.seconds > 0 ? this.state.seconds - 1 : 0,
      });
    }, 1000);
  }

  render() {
    const messageErrorCondition = this.props.apiCallback.id === this.props.order.id;
    const { order } = this.props;
    const services = order.json_context && JSON.parse(this.props.order.json_context);
    const actions = [
      <button
        className="Button ButtonPrimary"
        onClick={this.toggleDialog}
      >
          Close
      </button>,
    ];
    const updateAt =
      `${order.updated_at.replace(/\s/ig, 'T')}.${Math.abs(new Date().getTimezoneOffset())}Z`;
    const createdAt =
      `${order.created_at.replace(/\s/ig, 'T')}.${Math.abs(new Date().getTimezoneOffset())}Z`;
    return (
      <div className="OperationsItem">
        <a href="" className="OperationsItemTop" onClick={this.toggleDialog}>
          <div className="OperationsItemPrimary">
            <div className="OperationsItemImage">
              <img src="/static/images/car_icon.png" alt="car icon" />
            </div>
            <div className="OperationsItemInfo">
              <div className="OperationsItemInfo-primary">
                <h3 className="OperationsItemInfo-title">
                  {order.order_name}
                </h3>
              </div>
              <div className="OperationsItemInfo-secondary">
                <div className="OperationsItemInfo-name">
                  {order.vehicle && order.vehicle.car}
                </div>
                <div className="OperationsItemInfo-carid">
                  {order.vehicle && order.vehicle.number}
                </div>
              </div>
            </div>
          </div>
          <div className="OperationsItemSecondary">
            <span className="OperationsItemSecondary-create-date">
              {moment(createdAt).locale('ru').format('DD.MM.YYYY')}
            </span>
            {order.status === 'CONFIRMED' &&
              <span className="OperationsItemSecondary-confirm-date">
                Pending {moment(updateAt).locale('ru').format('LT')}
              </span>
            }
          </div>
        </a>
        {order.status !== 'CONFIRMED' &&
          <form id={`Confirm-form-${order.id}`} className="OperationsItemBottom">
            <input
              className="Input"
              value={this.state.smsCode}
              placeholder="Enter code"
              type="text"
              maxLength="6"
              pattern="[0-9]{1,6}"
              required
              onInput={event =>
                event.target.value = event.target.value.replace(/\D/g, '')
              }
              onChange={event => this.setState({
                smsCode: event.target.value,
              })}
            />
            <button
              className="Button ButtonPrimary"
              onClick={this.onConfirm}
            >
              Confirm
            </button>
            {this.state.seconds === 0 ?
              <button
                type="button"
                className="Button"
                onClick={this.onRenewCode}
              >
                  Send Again
              </button>
            :
              <span className="smsBlockMessage">
                Повторно отправить SMS <br /> можно через {this.state.seconds} сек.
              </span>
            }
            <button
              type="button"
              className="Button ButtonDanger"
              onClick={this.onDeleteOrder}
            >
              Delete
            </button>
          </form>
        }
        {messageErrorCondition &&
          <span className="Message-error" style={{ padding: '25px 0 5px' }}>{this.props.apiCallback.message}</span>
        }
        {this.state.showRenewMessage &&
          <span className="Message-success" style={{ padding: '25px 0 5px' }}>{this.state.renewMessage}</span>
        }
        {this.props.order.json_context && this.state.openDialog &&
          <Modal
            title="Services"
            actions={actions}
            open={this.state.openDialog}
            close={() => {
              this.setState({
                openDialog: not(this.state.openDialog),
              });
            }}
          >
            <table className="Table">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Price per unit, USD</th>
                  <th>Cost, USD</th>
                </tr>
              </thead>
              <tbody>
                {services.map((item, i) =>
                  <tr key={i}>
                    <td style={{ width: '40%', wordBreak: 'break-all' }}>
                      {item.name}
                    </td>
                    <td style={{ width: '20%' }}>
                      {item.count}
                    </td>
                    <td style={{ width: '20%' }}>
                      {item.price}
                    </td>
                    <td style={{ width: '20%' }}>
                      {item.price * item.count}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div style={{ textAlign: 'right' }}>
              <strong>Total: </strong>
              <span>
                {services
                  .map(item => item.price * item.count)
                  .reduce((sum, current) => sum + current)} $.
              </span>
            </div>
          </Modal>
        }
      </div>
    );
  }

}
