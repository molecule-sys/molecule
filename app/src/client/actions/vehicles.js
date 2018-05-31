import { api } from '../api/requestor';

const getVehicles = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.vehicles.vehicleList(params).then((data) => {
    dispatch({
      type: 'FETCH_VEHICLE_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const getVehiclesList = () => (dispatch) => {
  api.get.vehicles.vehiclesList().then((data) => {
    dispatch({
      type: 'FETCH_VEHICLE_LIST_SUCCESS',
      data,
    });
  });
};

const getVehiclesVendors = params => (dispatch) => {
  api.get.vehicles.vehicleVendors(params).then((data) => {
    dispatch({
      type: 'FETCH_VEHICLE_VENDORS_SUCCESS',
      data,
    });
  });
};

const getVehiclesModels = params => (dispatch) => {
  api.get.vehicles.vehicleModels(params).then((data) => {
    dispatch({
      type: 'FETCH_VEHICLE_MODELS_SUCCESS',
      data,
    });
  });
};

const getVehiclesModelsPaginate = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_VEHICLE_MODELS_LIST',
  });
  api.get.vehicles.vehicleModelsPaginate(params).then((data) => {
    dispatch({
      type: 'FETCH_VEHICLE_MODELS_PAGINATE_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch(() => {
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const activateVehicle = id => (dispatch) => {
  api.get.vehicles.activate(id).then(() => {
    dispatch({
      type: 'ACTIVATE_VEHICLE_SUCCESS',
      id,
    });
  });
};

const deactivateVehicle = id => (dispatch) => {
  api.get.vehicles.deactivate(id).then(() => {
    dispatch({
      type: 'DEACTIVATE_VEHICLE_SUCCESS',
      id,
    });
  });
};

const activateVehicleModel = id => (dispatch) => {
  api.get.vehicles.vehicleModelActivate(id).then((data) => {
    dispatch({
      type: 'ACTIVATE_MODEL_SUCCESS',
      id: data.id,
    });
  });
};

const deactivateVehicleModel = id => (dispatch) => {
  api.get.vehicles.vehicleModelDeactivate(id).then((data) => {
    dispatch({
      type: 'DEACTIVATE_MODEL_SUCCESS',
      id: data.id,
    });
  });
};

const saveVehicle = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.save(params).then(() => {
    dispatch({
      type: 'SAVE_VEHICLE_SUCCESS',
      success: {
        message: 'Автомобиль успешно сохранен!',
      },
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_VEHICLE_FAIL',
      errors,
    });
  });
};

const addVehicleRequest = params => (dispatch) => {
  api.post.vehicles.addVehicleRequest(params).then(() => {
    dispatch({
      type: 'ADD_VEHICLE_REQUEST_SUCCESS',
      success: {
        message: 'Запрос успешно отправлен!',
      },
    });
  }).catch((errors) => {
    dispatch({
      type: 'ADD_VEHICLE_REQUEST_FAIL',
      errors,
    });
  });
};

const editVehicle = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.save(params).then((postData) => {
    dispatch({
      type: 'EDIT_VEHICLE_SUCCESS',
      postData,
    });
  }).catch((errors) => {
    dispatch({
      type: 'EDIT_VEHICLE_FAIL',
      errors,
    });
  });
};

const saveVendor = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.saveVendor(params).then(() => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'addVendor',
    });
    api.get.vehicles.vehicleVendors().then((data) => {
      dispatch({
        type: 'FETCH_VEHICLE_VENDORS_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_VENDOR_FAIL',
      errors,
    });
  });
};

const editVendor = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.saveVendor(params).then(() => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'editVendor',
    });
    api.get.vehicles.vehicleVendors().then((data) => {
      dispatch({
        type: 'FETCH_VEHICLE_VENDORS_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'EDIT_VENDOR_FAIL',
      errors,
    });
  });
};

const saveModel = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.saveModel(params).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'addModel',
    });
    dispatch({
      type: 'SAVE_MODEL_SUCCESS',
      data,
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_MODEL_FAIL',
      errors,
    });
  });
};

const editModel = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.saveModel(params).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'addModel',
    });
    dispatch({
      type: 'EDIT_MODEL_SUCCESS',
      data,
    });
  }).catch((errors) => {
    dispatch({
      type: 'EDIT_MODEL_FAIL',
      errors,
    });
  });
};

const saveVehicleModel = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.saveVehicleTypes(params).then(() => {
    api.get.vehicles.vehicleTypes().then((data) => {
      dispatch({
        type: 'CLEAR_CALLBACK_RESPONSE',
        key: 'vehicleModel',
      });
      dispatch({
        type: 'FETCH_VEHICLE_TYPES_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_VEHICLE_MODEL_FAIL',
      errors,
    });
  });
};

const editVehicleModel = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.vehicles.saveVehicleTypes(params).then((postData) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'vehicleModel',
    });
    dispatch({
      type: 'EDIT_VEHICLE_TYPES_SUCCESS',
      postData,
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_VEHICLE_MODEL_FAIL',
      errors,
    });
  });
};

const findVehicle = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_VEHICLE_LIST',
  });
  api.get.vehicles.findVehicle(params).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'findVehicle',
    });
    dispatch({
      type: 'FETCH_VEHICLE_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FIND_VEHICLE_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const changePageVehicles = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_VEHICLE_LIST',
  });
  api.get.vehicles.changePageVehicles(params).then((data) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'findVehicle',
    });
    dispatch({
      type: 'FETCH_VEHICLE_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FIND_VEHICLE_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const changePageVehicleModels = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_VEHICLE_MODELS_LIST',
  });
  api.get.vehicles.changePageVehiclesModels(params).then((data) => {
    dispatch({
      type: 'FETCH_VEHICLE_MODELS_PAGINATE_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FETCH_VEHICLE_MODELS_PAGINATE_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

export {
  getVehicles,
  getVehiclesList,
  getVehiclesVendors,
  getVehiclesModels,
  getVehiclesModelsPaginate,
  saveVehicle,
  saveVendor,
  editVendor,
  saveModel,
  editModel,
  editVehicle,
  saveVehicleModel,
  editVehicleModel,
  activateVehicleModel,
  deactivateVehicleModel,
  activateVehicle,
  deactivateVehicle,
  findVehicle,
  changePageVehicles,
  changePageVehicleModels,
  addVehicleRequest,
};
