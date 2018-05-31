import { api } from '../api/requestor';

const getCustomers = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.organizations.customersList(params).then((data) => {
    dispatch({
      type: 'FETCH_CUSTOMERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const getExecutives = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.organizations.executivesList(params).then((data) => {
    dispatch({
      type: 'FETCH_EXECUTIVES_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const activateOrganization = (id, key) => (dispatch) => {
  api.get.organizations.activate(id).then(() => {
    if (key === 'customer') {
      dispatch({
        type: 'ACTIVATE_CUSTOMER_SUCCESS',
        id,
      });
    } else {
      dispatch({
        type: 'ACTIVATE_EXECUTIVE_SUCCESS',
        id,
      });
    }
  });
};

const deactivateOrganization = (id, key) => (dispatch) => {
  api.get.organizations.deactivate(id).then(() => {
    if (key === 'customer') {
      dispatch({
        type: 'DEACTIVATE_CUSTOMER_SUCCESS',
        id,
      });
    } else {
      dispatch({
        type: 'DEACTIVATE_EXECUTIVE_SUCCESS',
        id,
      });
    }
  });
};

const getOrganizationTypes = () => (dispatch) => {
  api.get.organizations.types().then((data) => {
    dispatch({
      type: 'FETCH_ORGANIZATION_TYPES_SUCCESS',
      data,
    });
  });
};

const saveOrganization = param => (dispatch) => {
  const params = {
    ...param.params,
  };
  api.post.organizations.save(params).then(() => {
    dispatch({
      type: 'SAVE_ORGANIZATION_SUCCESS',
    });
    if (param.key === 'Заказчик') {
      api.get.organizations.customersList().then((data) => {
        dispatch({
          type: 'FETCH_CUSTOMERS_SUCCESS',
          data,
        });
      });
    } else {
      api.get.organizations.executivesList().then((data) => {
        dispatch({
          type: 'FETCH_EXECUTIVES_SUCCESS',
          data,
        });
      });
    }
    api.get.organizations.types().then((data) => {
      dispatch({
        type: 'FETCH_ORGANIZATION_TYPES_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_ORGANIZATION_FAIL',
      errors,
    });
  });
};

const editOrganization = param => (dispatch) => {
  const params = {
    ...param.params,
  };
  api.post.organizations.save(params).then((postData) => {
    dispatch({
      type: 'EDIT_ORGANIZATION_CALLBACK_SUCCESS',
    });
    if (param.key === 'Заказчик') {
      dispatch({
        type: 'EDIT_ORGANIZATION_SUCCESS',
        postData,
        key: 'customers',
      });
    } else {
      dispatch({
        type: 'EDIT_ORGANIZATION_SUCCESS',
        postData,
        key: 'executives',
      });
    }
    api.get.organizations.types().then((data) => {
      dispatch({
        type: 'FETCH_ORGANIZATION_TYPES_SUCCESS',
        data,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'EDIT_ORGANIZATION_FAIL',
      errors,
    });
  });
};

const findOrganization = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  if (params.type === 'customer') {
    dispatch({
      type: 'CLEAR_CUSTOMERS_LIST',
    });
  } else {
    dispatch({
      type: 'CLEAR_EXECUTIVE_LIST',
    });
  }
  api.get.organizations.findOrganization(params).then((data) => {
    if (params.type === 'customer') {
      dispatch({
        type: 'CLEAR_CALLBACK_RESPONSE',
        key: 'findCustomer',
      });
      dispatch({
        type: 'FETCH_CUSTOMERS_SUCCESS',
        data,
      });
    } else {
      dispatch({
        type: 'CLEAR_CALLBACK_RESPONSE',
        key: 'findExecutive',
      });
      dispatch({
        type: 'FETCH_EXECUTIVES_SUCCESS',
        data,
      });
    }
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    if (params.type === 'customer') {
      dispatch({
        type: 'FIND_CUSTOMER_FAIL',
        errors,
      });
    } else {
      dispatch({
        type: 'FIND_EXECUTIVE_FAIL',
        errors,
      });
    }
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const changePageOrganization = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  if (params.type === 'customer') {
    dispatch({
      type: 'CLEAR_CUSTOMERS_LIST',
    });
  } else {
    dispatch({
      type: 'CLEAR_EXECUTIVE_LIST',
    });
  }
  api.get.organizations.changePageOrganization(params).then((data) => {
    if (params.type === 'customer') {
      dispatch({
        type: 'CLEAR_CALLBACK_RESPONSE',
        key: 'findCustomer',
      });
      dispatch({
        type: 'FETCH_CUSTOMERS_SUCCESS',
        data,
      });
    } else {
      dispatch({
        type: 'CLEAR_CALLBACK_RESPONSE',
        key: 'findExecutive',
      });
      dispatch({
        type: 'FETCH_EXECUTIVES_SUCCESS',
        data,
      });
    }
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    if (params.type === 'customer') {
      dispatch({
        type: 'FIND_CUSTOMER_FAIL',
        errors,
      });
    } else {
      dispatch({
        type: 'FIND_EXECUTIVE_FAIL',
        errors,
      });
    }
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const getStatistic = params => (dispatch) => {
  api.get.organizations.getStatistic(params).then((data) => {
    dispatch({
      type: 'FETCH_STATISTIC_SUCCESS',
      data,
    });
  });
};

const getFilterOrganizationsList = type => (dispatch) => {
  api.get.organizations.getFilterOrganizationsList(type).then((data) => {
    dispatch({
      type: 'FETCH_FILTER_ORGANIZATIONS_LIST_SUCCESS',
      data,
    });
  });
};

const getOrganizationsList = type => (dispatch) => {
  api.get.organizations.organizationsList(type).then((data) => {
    dispatch({
      type: 'FETCH_ORGANIZATIONS_LIST_SUCCESS',
      data,
    });
  });
};

const getFilterVehiclesList = params => (dispatch) => {
  api.get.organizations.getFilterVehiclesList(params).then((data) => {
    dispatch({
      type: 'FETCH_FILTER_VEHICLES_LIST_SUCCESS',
      data,
    });
  });
};

const getFilterDriversList = params => (dispatch) => {
  api.get.organizations.getFilterDriversList(params).then((data) => {
    dispatch({
      type: 'FETCH_FILTER_DRIVERS_LIST_SUCCESS',
      data,
    });
  });
};

const getBalance = () => (dispatch) => {
  api.get.organizations.getBalance().then((data) => {
    dispatch({
      type: 'FETCH_BALANCE_SUCCESS',
      data,
    });
  });
};

const getCategory = () => (dispatch) => {
  api.get.organizations.getCategory().then((data) => {
    dispatch({
      type: 'FETCH_ORGANIZATION_CATEGORY_SUCCESS',
      data,
    });
  });
};

export {
  getCustomers,
  getExecutives,
  activateOrganization,
  deactivateOrganization,
  getOrganizationTypes,
  saveOrganization,
  editOrganization,
  findOrganization,
  changePageOrganization,
  getStatistic,
  getFilterOrganizationsList,
  getFilterVehiclesList,
  getFilterDriversList,
  getBalance,
  getCategory,
  getOrganizationsList,
};
