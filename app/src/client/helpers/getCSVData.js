import moment from 'moment';

export default (data) => {
  const head = [];
  const columns = [];

  if (data.some(item => item.payment_date)) {
    head.push('Дата');
  }
  if (data.some(item => item.order_date)) {
    head.push('Дата услуги');
  }
  if (data.some(item => item.vehicle_name)) {
    head.push('Авто');
  }
  if (data.some(item => item.full_name)) {
    head.push('ФИО водителя');
  }
  if (data.some(item => item.organization_from_name)) {
    head.push('Заказчик');
  }
  if (data.some(item => item.organization_to_name)) {
    head.push('Исполнитель');
  }
  if (data.some(item => item.order_content)) {
    head.push('Наименование услуг');
  }
  if (data.some(item => item.order_content)) {
    head.push('Цена, руб.');
  }
  if (data.some(item => item.total_sum)) {
    head.push('Стоимость, руб.');
  }

  data.map(item => {
    const column = [];
    if (item.payment_date) {
      column.push(moment(item.payment_date).locale('ru').format('DD.MM.YYYY'));
    }
    if (item.order_date) {
      column.push(moment(item.order_date).locale('ru').format('DD.MM.YYYY'));
    }
    if (item.vehicle_name) {
      column.push(item.vehicle_name);
    }
    if (item.full_name) {
      column.push(item.full_name);
    }
    if (item.organization_from_name) {
      column.push(item.organization_from_name);
    }
    if (item.organization_to_name) {
      column.push(item.organization_to_name);
    }
    if (item.order_content) {
      const orderContent = JSON.parse(item.order_content);
      column.push(orderContent.map(elm => elm.name));
    }
    if (item.order_content) {
      const orderContent = JSON.parse(item.order_content);
      column.push(orderContent.map(elm => elm.price));
    }
    if (item.total_sum) {
      column.push(item.total_sum);
    }
    columns.push(column);
  });

  return [
    head,
    ...columns,
  ];
};
