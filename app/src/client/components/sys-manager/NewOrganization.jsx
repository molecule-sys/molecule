import React from 'react';
import { browserHistory } from 'react-router';
import HeaderContainer from '../../containers/header-container';
import isLogged from '../../decorators/isLogged';
import formIsValid from '../../helpers/form-validation';

@isLogged
export default class NewOrganization extends React.PureComponent {

  static propTypes = {
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    location: React.PropTypes.instanceOf(Object).isRequired,
    types: React.PropTypes.instanceOf(Array).isRequired,
    organizationCategory: React.PropTypes.instanceOf(Array).isRequired,
    fetchOrganizationTypes: React.PropTypes.func,
    fetchOrganizationCategory: React.PropTypes.func,
    addOrganization: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      short_name: '',
      type: props.location.action === 'PUSH' ? this.convertType() : '',
      inn: '',
      kpp: '',
      ogrn: '',
      okpo: '',
      ur_address: '',
      address: '',
      requisits: '',
      commission: '',
      average_price: '',
      working_time: '',
      category: [],
      showCommission: props.location.action === 'PUSH' ? this.showCommissionHandler() : false,
    };
  }

  componentWillMount = () => {
    this.props.fetchOrganizationCategory();
    this.props.fetchOrganizationTypes();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.success) {
      if (this.state.type.length > 0) {
        const key =
          this.props.types.filter(item => this.state.type === item.id)[0].name;
        if (key === 'Заказчик') {
          browserHistory.push('/');
        } else {
          browserHistory.push('/executives');
        }
      }
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('addOrganization');
  }

  onAddOrganization = (event) => {
    const key =
      this.props.types.filter(item => this.state.type === item.id)[0].name;
    if (formIsValid('#New-organization')) {
      event.preventDefault();
      if (this.state.showCommission) {
        this.props.addOrganization({
          params: {
            name: this.state.name ? this.state.name.trim() : this.state.name,
            short_name: this.state.short_name ? this.state.short_name.trim() : this.state.short_name,
            type: this.state.type ? this.state.type : this.state.type,
            inn: this.state.inn ? this.state.inn.trim() : this.state.inn,
            kpp: this.state.kpp ? this.state.kpp.trim() : this.state.kpp,
            ogrn: this.state.ogrn ? this.state.ogrn.trim() : this.state.ogrn,
            okpo: this.state.okpo ? this.state.okpo.trim() : this.state.okpo,
            ur_address: this.state.ur_address ? this.state.ur_address.trim() : this.state.ur_address,
            address: this.state.address ? this.state.address.trim() : this.state.address,
            requisits: this.state.requisits ? this.state.requisits.trim() : this.state.requisits,
            commission: this.state.commission ? this.state.commission.trim() : this.state.commission,
            average_price: this.state.average_price ? this.state.average_price.trim() : this.state.average_price,
            working_time: this.state.working_time ? this.state.working_time.trim() : this.state.working_time,
            category: this.state.category ? this.state.category : this.state.category,
          },
          key,
        });
      } else {
        this.props.addOrganization({
          params: {
            name: this.state.name ? this.state.name.trim() : this.state.name,
            short_name: this.state.short_name ? this.state.short_name.trim() : this.state.short_name,
            type: this.state.type ? this.state.type : this.state.type,
            inn: this.state.inn ? this.state.inn.trim() : this.state.inn,
            kpp: this.state.kpp ? this.state.kpp.trim() : this.state.kpp,
            ogrn: this.state.ogrn ? this.state.ogrn.trim() : this.state.ogrn,
            okpo: this.state.okpo ? this.state.okpo.trim() : this.state.okpo,
            ur_address: this.state.ur_address ? this.state.ur_address.trim() : this.state.ur_address,
            address: this.state.address ? this.state.address.trim() : this.state.address,
            requisits: this.state.requisits ? this.state.requisits.trim() : this.state.requisits,
          },
          key,
        });
      }
      this.props.clearCallbackResponse('addOrganization');
    }
  }

  showCommissionHandler = () => (
    this.props.location.state.prevPath === 'executives' || this.props.location.state.prevPath === '/executives'
  )

  convertType = () => {
    let typeId;
    if (this.props.location.state.prevPath === '/') {
      typeId = this.props.types.filter(item => item.name === 'Заказчик')[0].id;
    } else if (this.props.location.state.prevPath === 'executives' || this.props.location.state.prevPath === '/executives') {
      typeId = this.props.types.filter(item => item.name === 'Исполнитель')[0].id;
    }
    return typeId;
  }

  render() {
    const messageSuccessCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'success',
      );
    const messageErrorCondition =
      Object.prototype.hasOwnProperty.call(
        this.props.apiCallback, 'error',
      );
    return (
      <div>
        <HeaderContainer />
        <div className="Container">
          <div className="PageTitle">
            <h2>Добавление организации</h2>
          </div>
          <form id="New-organization" className="Container-sub">
            <label htmlFor="full_name" className="Required">Полное название</label>
            <input
              id="full_name"
              type="text"
              maxLength="255"
              className="Input Input--fullWidth"
              placeholder="Полное название"
              value={this.state.name}
              onChange={event => this.setState({ name: event.target.value })}
              required
            />
            <label htmlFor="short_name" className="Required">Сокращенное название</label>
            <input
              id="short_name"
              type="text"
              maxLength="255"
              className="Input Input--fullWidth"
              placeholder="Сокращенное название"
              value={this.state.short_name}
              onChange={event => this.setState({ short_name: event.target.value })}
              required
            />
            <div className="Form-control-half">
              <div>
                <label htmlFor="inn" className="Required">Tax number</label>
                <input
                  id="inn"
                  type="text"
                  className="Input Input--fullWidth"
                  placeholder="Tax nomber"
                  minLength="10"
                  maxLength="12"
                  pattern="[0-9]{10,12}"
                  onInvalid={event =>
                    event.currentTarget.setCustomValidity('Номер состоит из 12 цифр')
                  }
                  value={this.state.inn}
                  onChange={event => this.setState({ inn: event.target.value })}
                  onInput={event => (
                    event.target.value = event.target.value.replace(/\D/g, ''),
                    event.currentTarget.setCustomValidity('')
                  )}
                  required
                />
              </div>
              <div>
                <label htmlFor="inn" className="Required">КПП</label>
                <input
                  id="kpp"
                  type="text"
                  maxLength="9"
                  minLength="9"
                  className="Input Input--fullWidth"
                  placeholder="КПП"
                  pattern="[0-9]{9}"
                  onInvalid={event =>
                    event.currentTarget.setCustomValidity('Код состоит из 9 цифр')
                  }
                  value={this.state.kpp}
                  onChange={event => this.setState({ kpp: event.target.value })}
                  onInput={event => (
                    event.target.value = event.target.value.replace(/\D/g, ''),
                    event.currentTarget.setCustomValidity('')
                  )}
                  required
                />
              </div>
            </div>
            <div className="Form-control-half">
              <div>
                <label htmlFor="inn">ОГРН</label>
                <input
                  id="ogrn"
                  type="text"
                  className="Input Input--fullWidth"
                  placeholder="ОГРН"
                  minLength="13"
                  maxLength="15"
                  pattern="[0-9]{13,15}"
                  onInvalid={event =>
                    event.currentTarget.setCustomValidity('ОГРН состоит из 13 цифр, ОГРНИП состоит из 15 цифр')
                  }
                  value={this.state.ogrn}
                  onChange={event => this.setState({ ogrn: event.target.value })}
                  onInput={event => (
                    event.target.value = event.target.value.replace(/\D/g, ''),
                    event.currentTarget.setCustomValidity('')
                  )}
                  required={this.state.ogrn.length > 0}
                />
              </div>
              <div>
                <label htmlFor="inn">ОКПО</label>
                <input
                  id="okpo"
                  type="text"
                  className="Input Input--fullWidth"
                  placeholder="ОКПО"
                  minLength="10"
                  maxLength="10"
                  pattern="[0-9]{10}"
                  onInvalid={event =>
                    event.currentTarget.setCustomValidity('Код состоит из 10 цифр')
                  }
                  value={this.state.okpo}
                  onChange={event => this.setState({ okpo: event.target.value })}
                  onInput={event => (
                    event.target.value = event.target.value.replace(/\D/g, ''),
                    event.currentTarget.setCustomValidity('')
                  )}
                  required={this.state.okpo.length > 0}
                />
              </div>
            </div>
            <label htmlFor="ur_address" className="Required">Company legal adress</label>
            <input
              id="ur_address"
              type="text"
              maxLength="255"
              className="Input Input--fullWidth"
              placeholder="Company legal adress"
              value={this.state.ur_address}
              onChange={event => this.setState({ ur_address: event.target.value })}
              required
            />
            <label htmlFor="address" className="Required">Фактический адрес</label>
            <input
              id="address"
              type="text"
              maxLength="255"
              className="Input Input--fullWidth"
              placeholder="Фактический адрес"
              value={this.state.address}
              onChange={event => this.setState({ address: event.target.value })}
              required
            />
            {this.state.showCommission &&
              <div>
                <label htmlFor="average_price">Средний чек</label>
                <input
                  id="average_price"
                  type="text"
                  maxLength="255"
                  className="Input Input--fullWidth"
                  placeholder="Средний чек"
                  value={this.state.average_price}
                  onChange={event => this.setState({ average_price: event.target.value })}
                />
                <label htmlFor="working_time">Время работы</label>
                <input
                  id="working_time"
                  type="text"
                  maxLength="255"
                  className="Input Input--fullWidth"
                  placeholder="Время работы"
                  value={this.state.working_time}
                  onChange={event => this.setState({ working_time: event.target.value })}
                />
              </div>
            }
            <label htmlFor="requisits">Client Bank Account</label>
            <textarea
              id="requisits"
              maxLength="255"
              className="Textarea Textarea--fullWidth"
              placeholder="Client Bank Account"
              value={this.state.requisits}
              onChange={event => this.setState({ requisits: event.target.value })}
            />
            {this.props.location.action === 'POP' &&
              <div style={{ marginBottom: '15px' }}>
                <label className="Label--fullWidth Required" htmlFor="types">Выберите тип организации</label>
                {this.props.types.length > 0 &&
                  this.props.types.map((item, i) =>
                    <div key={i} className="Radio">
                      <input
                        id={item.id}
                        type="radio"
                        name="types"
                        value={item.id}
                        onChange={(event) => {
                          this.setState({ type: event.target.value },
                            () => {
                              if (this.props.types.filter(elm => this.state.type === elm.id)[0].name === 'Исполнитель') {
                                this.setState({ showCommission: true });
                              } else {
                                this.setState({
                                  showCommission: false,
                                  commission: '',
                                });
                              }
                            },
                          );
                        }}
                        required
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>,
                  )
                }
              </div>
            }
            {this.state.showCommission &&
              <div style={{ marginBottom: '15px' }}>
                <label className="Label--fullWidth" htmlFor="category">Категория</label>
                {this.props.organizationCategory.length > 0 &&
                  this.props.organizationCategory.map((item, i) =>
                    <div style={{ marginRight: '15px', marginBottom: '5px' }} key={i} className="Checkbox">
                      <input
                        id={item.id}
                        type="checkbox"
                        name="category"
                        value={item.id}
                        onChange={(event) => {
                          this.setState({
                            category: this.state.category.some(elm => elm === event.target.value) ?
                            this.state.category.filter(elm => elm !== event.target.value) :
                            [...this.state.category, event.target.value],
                          });
                        }}
                      />
                      <label htmlFor={item.id}>{item.name}</label>
                    </div>,
                  )
                }
              </div>
            }
            {this.state.showCommission &&
              <div>
                <label className="Required" htmlFor="commission">Комиссия, %</label>
                <input
                  id="commission"
                  type="text"
                  maxLength="3"
                  className="Input Input--fullWidth"
                  placeholder="Комиссия"
                  value={this.state.commission}
                  pattern="[0-9]{1,3}"
                  onChange={event => this.setState({
                    commission: Number(event.target.value) <= 100 ?
                      event.target.value : '100',
                  })}
                  onInput={event =>
                    event.target.value = event.target.value.replace(/\D/g, '')
                  }
                  required
                />
              </div>
            }
            <span className="Required-hint">* - обязательные поля</span>
            <button
              className="Button ButtonPrimary"
              onClick={this.onAddOrganization}
            >
              Add
            </button>
            <button
              className="Button"
              style={{ marginLeft: '20px' }}
              onClick={browserHistory.goBack}
            >
              Назад
            </button>
          </form>
          {messageSuccessCondition &&
            <span className="Message-success">{this.props.apiCallback.success.message}</span>
          }
          {messageErrorCondition &&
            <span className="Message-error">{this.props.apiCallback.error.message}</span>
          }
        </div>
      </div>
    );
  }

}
