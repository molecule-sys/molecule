import { api } from '../api/requestor';

const invoice = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.post.exchange.invoice(params).then((postData) => {
    dispatch({
      type: 'FETCH_INVOICE_FILE',
      postData,
    });
    api.get.exchange.waiting().then((data) => {
      dispatch({
        type: 'EXCHANGE_WAITING_SUCCESS',
        data,
      });
    });
    api.get.organizations.getBalance().then((data) => {
      dispatch({
        type: 'INVOICE_SUCCESS',
        success: {
          message: 'Счет успешно отправлен на почту',
        },
      });
      dispatch({
        type: 'FETCH_BALANCE_SUCCESS',
        data,
      });
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'INVOICE_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const waiting = () => (dispatch) => {
  api.get.exchange.waiting().then((data) => {
    dispatch({
      type: 'EXCHANGE_WAITING_SUCCESS',
      data,
    });
  });
};

const getActs = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.exchange.getActs(params).then((data) => {
    dispatch({
      type: 'FETCH_ACTS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const getActPrint = params => (dispatch) => {
  api.get.exchange.getActPrint(params).then((data) => {
    dispatch({
      type: 'FETCH_ACT_PRINT_SUCCESS',
      data,
    });
  });
};

export {
  invoice,
  waiting,
  getActs,
  getActPrint,
};
