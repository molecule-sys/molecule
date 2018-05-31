import { api } from '../api/requestor';

const getDriversList = () => (dispatch) => {
  api.get.drivers.driversList().then((data) => {
    dispatch({
      type: 'FETCH_DRIVERS_LIST_SUCCESS',
      data,
    });
  });
};

const getDrivers = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.drivers.drivers(params).then((data) => {
    dispatch({
      type: 'FETCH_DRIVERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const saveDriver = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.drivers.save(params).then(() => {
    dispatch({
      type: 'SAVE_DRIVER_SUCCESS',
      success: {
        message: 'Водитель успешно сохранен!',
      },
    });
    api.get.drivers.driversList().then((data) => {
      dispatch({
        type: 'FETCH_DRIVERS_LIST_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_DRIVER_FAIL',
      errors,
    });
  });
};

const editDriver = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.drivers.save(params).then((postData) => {
    dispatch({
      type: 'EDIT_DRIVER_SUCCESS',
      postData,
    });
    api.get.drivers.driversList().then((data) => {
      dispatch({
        type: 'FETCH_DRIVERS_LIST_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'EDIT_DRIVER_FAIL',
      errors,
    });
  });
};

const activateDriver = id => (dispatch) => {
  api.get.drivers.activate(id).then(() => {
    dispatch({
      type: 'ACTIVATE_DRIVER_SUCCESS',
      id,
    });
  });
};

const deactivateDriver = id => (dispatch) => {
  api.get.drivers.deactivate(id).then(() => {
    dispatch({
      type: 'DEACTIVATE_DRIVER_SUCCESS',
      id,
    });
  });
};

const findDriver = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_DRIVER',
  });
  api.get.drivers.findDriver(params).then((data) => {
    dispatch({
      type: 'FIND_DRIVER_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const findDrivers = serchText => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_DRIVERS_LIST',
  });
  api.get.drivers.findDrivers(serchText).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'findDrivers',
    });
    dispatch({
      type: 'FETCH_DRIVERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FIND_DRIVERS_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const changePageDrivers = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_DRIVERS_LIST',
  });
  api.get.drivers.changePageDrivers(params).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'findDrivers',
    });
    dispatch({
      type: 'FETCH_DRIVERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FIND_DRIVERS_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

export {
  getDriversList,
  getDrivers,
  saveDriver,
  editDriver,
  activateDriver,
  deactivateDriver,
  findDriver,
  findDrivers,
  changePageDrivers,
};
