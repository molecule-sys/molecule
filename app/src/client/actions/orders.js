import { api } from '../api/requestor';

const getOrders = () => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.orders.ordersList().then((data) => {
    dispatch({
      type: 'FETCH_ORDERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const confirmOrder = param => (dispatch) => {
  const params = {
    id: param.id,
    code: param.smsCode,
  };
  api.get.orders.confirmOrder(params).then(() => {
    api.get.orders.ordersList().then((data) => {
      setTimeout(() => {
        dispatch({
          type: 'FETCH_ORDERS_SUCCESS',
          data,
        });
      }, 2000);
    });
  }).catch((errors) => {
    dispatch({
      type: 'CONFIRM_ORDER_FAIL',
      id: param.id,
      errors,
    });
  });
};

const getDeleteOrder = id => (dispatch) => {
  api.get.orders.deleteOrder(id).then(() => {
    api.get.orders.ordersList().then((data) => {
      dispatch({
        type: 'FETCH_ORDERS_SUCCESS',
        data,
      });
    });
  });
};

const getRenewCode = id => () => {
  api.get.orders.renewCode(id);
};

const addOrder = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.orders.save(params).then(() => {
    dispatch({
      type: 'SAVE_ORDER_SUCCESS',
      success: {
        message: 'Заказ успешно создан!',
      },
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_ORDER_FAIL',
      errors,
    });
  });
};

const changePageOrders = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_ORDERS_LIST',
  });
  api.get.orders.changePageOrders(params).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'findOrders',
    });
    dispatch({
      type: 'FETCH_ORDERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FIND_ORDERS_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const getServiceList = () => (dispatch) => {
  api.get.orders.getServiceList().then((data) => {
    dispatch({
      type: 'FETCH_SERVICE_LIST_SUCCESS',
      data,
    });
  });
};

export {
  getOrders,
  addOrder,
  confirmOrder,
  getDeleteOrder,
  getRenewCode,
  changePageOrders,
  getServiceList,
};
