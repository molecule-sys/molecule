import { evolve, set, lensProp, merge, insert, map, propEq, when } from 'ramda';

export default function reducer(state = {}, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return evolve({
        data: set(lensProp('isLogged'), true),
      }, state);
    }
    case 'LOGIN_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('login'), action.errors),
        },
      }, state);
    }
    case 'LOGOUT': {
      return evolve({
        data: set(lensProp('isLogged'), false),
      }, state);
    }
    case 'FETCH_PROFILE_SUCCESS': {
      return merge(state,
        { profile: action.data },
      );
    }
    case 'FETCH_VEHICLE_VENDORS_SUCCESS': {
      return merge(state,
        { vehicleVendors: Object.keys(action.data).map(key => action.data[key]) },
      );
    }
    case 'FETCH_VEHICLE_MODELS_SUCCESS': {
      return merge(state,
        { vehicleModels: Object.keys(action.data).map(key => action.data[key]) },
      );
    }
    case 'FETCH_VEHICLE_MODELS_PAGINATE_SUCCESS': {
      return merge(state,
        {
          vehicleModels: Object.keys(action.data.data).map(key => ({ id: key, ...action.data.data[key] })),
          vehicleModelsPagination: {
            currentPage: action.data.currentPage,
            pagesCount: action.data.pagesCount,
          },
        },
      );
    }
    case 'FETCH_USERS_SUCCESS': {
      return merge(state,
        {
          users: Object.keys(action.data.data).map(key => ({ id: key, ...action.data.data[key] })),
          usersPagination: {
            currentPage: action.data.currentPage,
            pagesCount: action.data.pagesCount,
          },
          roleId: action.data.role_id,
        },
      );
    }
    case 'FETCH_CUSTOMERS_SUCCESS': {
      return merge(state, {
        customers: action.data.data,
        customersPagination: {
          currentPage: action.data.currentPage,
          pagesCount: action.data.pagesCount,
        },
      });
    }
    case 'FETCH_EXECUTIVES_SUCCESS': {
      return merge(state, {
        executives: action.data.data,
        executivesPagination: {
          currentPage: action.data.currentPage,
          pagesCount: action.data.pagesCount,
        },
      });
    }
    case 'FETCH_ORGANIZATION_TYPES_SUCCESS': {
      return merge(state, {
        types: action.data,
      });
    }
    case 'SAVE_VEHICLE_MODEL_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('vehicleModel'), action.errors),
        },
      }, state);
    }
    case 'FIND_CUSTOMER_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('findCustomer'), action.errors),
        },
      }, state);
    }
    case 'EDIT_VENDOR_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editVendor'), { error: action.errors }),
        },
      }, state);
    }
    case 'SAVE_VENDOR_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addVendor'), { error: action.errors }),
        },
      }, state);
    }
    case 'SAVE_USERS_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addUser'), { error: action.errors }),
        },
      }, state);
    }
    case 'SAVE_MODEL_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addModel'), { error: action.errors }),
        },
      }, state);
    }
    case 'EDIT_MODEL_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editModel'), { error: action.errors }),
        },
      }, state);
    }
    case 'EDIT_USERS_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editUser'), { error: action.errors }),
        },
      }, state);
    }
    case 'EDIT_USERS_SUCCESS': {
      const user =
        state.users.filter(item => item.id !== action.postData.id);
      return merge(state, {
        users: insert(1, action.postData, user),
      });
    }
    case 'EDIT_MODEL_SUCCESS': {
      const model =
        state.vehicleModels.filter(item => item.id !== action.data.id);
      return merge(state, {
        vehicleModels: insert(1, action.data, model),
      });
    }
    case 'ACTIVATE_CUSTOMER_SUCCESS': {
      return evolve({
        customers: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ACTIVE'),
        )),
      }, state);
    }
    case 'DEACTIVATE_CUSTOMER_SUCCESS': {
      return evolve({
        customers: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ARCHIVED'),
        )),
      }, state);
    }
    case 'ACTIVATE_EXECUTIVE_SUCCESS': {
      return evolve({
        executives: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ACTIVE'),
        )),
      }, state);
    }
    case 'DEACTIVATE_EXECUTIVE_SUCCESS': {
      return evolve({
        executives: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ARCHIVED'),
        )),
      }, state);
    }
    case 'SAVE_MODEL_SUCCESS': {
      return merge(state, {
        vehicleModels: [...state.vehicleModels, action.data],
      });
    }
    case 'SAVE_ORGANIZATION_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addOrganization'), { success: { message: 'Company created' } }),
        },
      }, state);
    }
    case 'EDIT_ORGANIZATION_CALLBACK_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editOrganization'), { success: { message: 'Company created' } }),
        },
      }, state);
    }
    case 'SAVE_ORGANIZATION_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addOrganization'), { error: action.errors }),
        },
      }, state);
    }
    case 'EDIT_ORGANIZATION_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editOrganization'), { error: action.errors }),
        },
      }, state);
    }
    case 'FIND_EXECUTIVE_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('findExecutive'), action.errors),
        },
      }, state);
    }
    case 'CLEAR_CUSTOMERS_LIST': {
      return merge(state, {
        customers: [],
        customersPagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'CLEAR_EXECUTIVE_LIST': {
      return merge(state, {
        executives: [],
        executivesPagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'CLEAR_USERS_LIST': {
      return merge(state, {
        users: [],
        usersPagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'CLEAR_STATISTIC': {
      return merge(state, {
        statistic: [{ id: 1 }],
      });
    }
    case 'EDIT_ORGANIZATION_SUCCESS': {
      return merge(state, {
        [action.key]: insert(1, action.postData, action.key === 'customers' ?
          state.customers.filter(item => item.id !== action.postData.id) :
          state.executives.filter(item => item.id !== action.postData.id)),
      });
    }
    case 'CLEAR_CALLBACK_RESPONSE': {
      return evolve({
        data: {
          apiCallback: set(lensProp(action.key), {}),
        },
      }, state);
    }
    case 'FEEDBACK_SEND_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('feedback'), action.data),
        },
      }, state);
    }
    case 'FEEDBACK_SEND_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('feedback'), action.errors),
        },
      }, state);
    }
    case 'RECOVERY_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('recovery'), action.data),
        },
      }, state);
    }
    case 'RECOVERY_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('recovery'), action.errors),
        },
      }, state);
    }
    case 'CHANGE_PASSWORD_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('settings'), { success: action.success }),
        },
      }, state);
    }
    case 'CHANGE_PASSWORD_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('settings'), { error: action.errors }),
        },
      }, state);
    }
    case 'ACTIVATE_USERS_SUCCESS': {
      return evolve({
        users: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ACTIVE'),
        )),
      }, state);
    }
    case 'DEACTIVATE_USERS_SUCCESS': {
      return evolve({
        users: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ARCHIVED'),
        )),
      }, state);
    }
    case 'ACTIVATE_MODEL_SUCCESS': {
      return evolve({
        vehicleModels: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ACTIVE'),
        )),
      }, state);
    }
    case 'DEACTIVATE_MODEL_SUCCESS': {
      return evolve({
        vehicleModels: map(when(propEq('id', action.id),
          set(lensProp('status'), 'ARCHIVED'),
        )),
      }, state);
    }
    case 'CLEAR_VEHICLE_MODELS_LIST': {
      return merge(state, {
        vehicleModels: [],
        vehicleModelsPagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'FETCH_STATISTIC_SUCCESS': {
      return merge(state,
        { statistic: action.data },
      );
    }
    case 'FETCH_FILTER_ORGANIZATIONS_LIST_SUCCESS': {
      return merge(state, {
        filterOrganizationList: Object.keys(action.data).map(key => ({ id: key, ...action.data[key] })),
      });
    }
    case 'FETCH_ORGANIZATIONS_LIST_SUCCESS': {
      return merge(state, {
        organizationList: Object.keys(action.data).map(key => ({ id: key, ...action.data[key] })),
      });
    }
    case 'FETCH_FILTER_VEHICLES_LIST_SUCCESS': {
      return merge(state, {
        filterVehiclesList: Object.keys(action.data).map(key => ({ id: key, ...action.data[key] })),
      });
    }
    case 'FETCH_FILTER_DRIVERS_LIST_SUCCESS': {
      return merge(state, {
        filterDriversList: Object.keys(action.data).map(key => ({ id: key, ...action.data[key] })),
      });
    }
    case 'LOADING_START' : {
      return evolve({
        data: set(lensProp('loading'), state.data.loading + 1),
      }, state);
    }
    case 'LOADING_STOP' : {
      return evolve({
        data: set(lensProp('loading'), state.data.loading - 1),
      }, state);
    }
    case 'FETCH_ORGANIZATION_CATEGORY_SUCCESS' : {
      return merge(state,
        { organizationCategory: action.data },
      );
    }
    default: {
      return state;
    }
  }
}
