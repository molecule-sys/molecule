import React from 'react';
import { browserHistory } from 'react-router';
import Modal from '../Shared/Modal';
import formIsValid from '../../helpers/form-validation';

export default class EditOrganization extends React.PureComponent {

  static propTypes = {
    organization: React.PropTypes.instanceOf(Object).isRequired,
    apiCallback: React.PropTypes.instanceOf(Object).isRequired,
    clearCallbackResponse: React.PropTypes.func.isRequired,
    types: React.PropTypes.instanceOf(Array).isRequired,
    organizationCategory: React.PropTypes.instanceOf(Array).isRequired,
    typeName: React.PropTypes.string.isRequired,
    openDialog: React.PropTypes.bool.isRequired,
    closeDialog: React.PropTypes.func.isRequired,
    fetchOrganizationCategory: React.PropTypes.func,
    editOrganization: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.organization.name,
      short_name: props.organization.short_name,
      type: props.organization.organization_type_id,
      inn: props.organization.inn,
      kpp: props.organization.kpp,
      ogrn: props.organization.ogrn,
      okpo: props.organization.okpo,
      ur_address: props.organization.ur_address,
      address: props.organization.address,
      requisits: props.organization.requisits,
      average_price: props.organization.average_price,
      working_time: props.organization.working_time,
      category: props.organization.category.length > 0 ? JSON.parse(props.organization.category) : [],
      commission: props.organization.commission !== null ? Number(props.organization.commission).toFixed() : '',
      showCommission: props.typeName === 'executive',
    };
  }

  componentWillMount = () => {
    this.props.fetchOrganizationCategory();
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.apiCallback.success) {
      if (this.state.type.length > 0) {
        const key =
          this.props.types.filter(item => this.state.type === item.id)[0].name;
        if (key === 'Заказчик') {
          this.props.closeDialog();
          browserHistory.push('/');
        } else {
          this.props.closeDialog();
          browserHistory.push('/executives');
        }
      }
    }
  }

  componentWillUnmount = () => {
    this.props.clearCallbackResponse('editOrganization');
  }

  onEditOrganization = (event) => {
    const key =
      this.props.types.filter(item => this.state.type === item.id)[0].name;
    if (formIsValid(`#Edit-organization-${this.props.organization.id}`)) {
      event.preventDefault();
      if (this.state.showCommission) {
        this.props.editOrganization({
          params: {
            organization_id: this.props.organization.id,
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
            average_price: this.state.average_price ? this.state.average_price.trim() : this.state.average_price,
            working_time: this.state.working_time ? this.state.working_time.trim() : this.state.working_time,
            commission: this.state.commission ? this.state.commission.trim() : this.state.commission,
            category: this.state.category ? this.state.category : this.state.category,
          },
          key,
        });
      } else {
        this.props.editOrganization({
          params: {
            organization_id: this.props.organization.id,
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
      this.props.clearCallbackResponse('editOrganization');
    }
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
    const actions = [
      <button
        className="Button ButtonLink"
        onClick={this.props.closeDialog}
      >
          Close
      </button>,
    ];
    return (
      <Modal
        title={`Edit organization ${this.props.organization.short_name}`}
        actions={actions}
        open={this.props.openDialog}
        close={this.props.closeDialog}
      >
        <form id={`Edit-organization-${this.props.organization.id}`} className="Container-sub">
          <label htmlFor="full_name" className="Required">Полное название</label>
          <input
            id="full_name"
            type="text"
            maxLength="255"
            className="Input Input--fullWidth"
            placeholder="Полное название"
            value={this.state.name ? this.state.name : ''}
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
            value={this.state.short_name ? this.state.short_name : ''}
            onChange={event => this.setState({ short_name: event.target.value })}
            required
          />
          <div className="Form-control-half">
            <div>
              <label htmlFor="inn" className="Required">Tax number</label>
              <input
                id="inn"
                type="text"
                minLength="10"
                maxLength="12"
                className="Input Input--fullWidth"
                placeholder="Tax nomber"
                pattern="[0-9]{10,12}"
                onInvalid={event =>
                  event.currentTarget.setCustomValidity('Номер состоит из 12 цифр')
                }
                value={this.state.inn ? this.state.inn : ''}
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
                minLength="9"
                maxLength="9"
                className="Input Input--fullWidth"
                placeholder="КПП"
                pattern="[0-9]{9}"
                onInvalid={event =>
                  event.currentTarget.setCustomValidity('Код состоит из 9 цифр')
                }
                value={this.state.kpp ? this.state.kpp : ''}
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
                minLength="13"
                maxLength="15"
                className="Input Input--fullWidth"
                placeholder="ОГРН"
                pattern="[0-9]{13,15}"
                onInvalid={event =>
                  event.currentTarget.setCustomValidity('ОГРН состоит из 13 цифр, ОГРНИП состоит из 15 цифр')
                }
                value={this.state.ogrn ? this.state.ogrn : ''}
                onChange={event => this.setState({ ogrn: event.target.value })}
                onInput={event => (
                  event.target.value = event.target.value.replace(/\D/g, ''),
                  event.currentTarget.setCustomValidity('')
                )}
                required={this.state.ogrn ? this.state.ogrn.length > 0 : ''}
              />
            </div>
            <div>
              <label htmlFor="inn">ОКПО</label>
              <input
                id="okpo"
                type="text"
                maxLength="10"
                className="Input Input--fullWidth"
                placeholder="ОКПО"
                minLength="10"
                pattern="[0-9]{10}"
                onInvalid={event =>
                  event.currentTarget.setCustomValidity('Код состоит из 10 цифр')
                }
                value={this.state.okpo ? this.state.okpo : ''}
                onChange={event => this.setState({ okpo: event.target.value })}
                onInput={event => (
                  event.target.value = event.target.value.replace(/\D/g, ''),
                  event.currentTarget.setCustomValidity('')
                )}
                required={this.state.okpo ? this.state.okpo.length > 0 : ''}
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
            value={this.state.ur_address ? this.state.ur_address : ''}
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
            value={this.state.address ? this.state.address : ''}
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
                value={this.state.average_price ? this.state.average_price : ''}
                onChange={event => this.setState({ average_price: event.target.value })}
              />
              <label htmlFor="working_time">Время работы</label>
              <input
                id="working_time"
                type="text"
                maxLength="255"
                className="Input Input--fullWidth"
                placeholder="Время работы"
                value={this.state.working_time ? this.state.working_time : ''}
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
            value={this.state.requisits ? this.state.requisits : ''}
            onChange={event => this.setState({ requisits: event.target.value })}
          />
          <div style={{ marginBottom: '15px' }}>
            <label className="Label--fullWidth Required" htmlFor="types">Выберите тип организации</label>
            {this.props.types.length > 0 &&
              this.props.types.map((item, i) =>
                <div key={i} className="Radio">
                  <input
                    id={`${this.props.organization.id}${i}`}
                    type="radio"
                    name="types"
                    value={item.id}
                    checked={item.id === this.state.type}
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
                  <label htmlFor={`${this.props.organization.id}${i}`}>{item.name}</label>
                </div>,
              )
            }
          </div>
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
                      checked={this.state.category.some(elm => elm === item.id)}
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
            onClick={this.onEditOrganization}
          >
              Save
          </button>
        </form>
        {messageSuccessCondition &&
          <span className="Message-success">{this.props.apiCallback.success.message}</span>
        }
        {messageErrorCondition &&
          <span className="Message-error">{this.props.apiCallback.error.message}</span>
        }
      </Modal>
    );
  }
}
