import { evolve, set, lensProp, merge, insert, map, when, propEq } from 'ramda';

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
        profile: {},
      }, state);
    }
    case 'FETCH_PROFILE_SUCCESS': {
      return merge(state,
        { profile: action.data },
      );
    }
    case 'FETCH_ACTS_SUCCESS': {
      return merge(state,
        { acts: Object.keys(action.data).map(key => ({ id: key, ...action.data[key] })) },
      );
    }
    case 'FETCH_ACT_PRINT_SUCCESS': {
      return merge(state,
        { actToPrint: action.data.file },
      );
    }
    case 'FETCH_INVOICE_FILE': {
      return merge(state,
        { refillFile: action.postData.file },
      );
    }
    case 'FETCH_VEHICLE_SUCCESS': {
      return merge(state,
        {
          vehicle: Object.keys(action.data.data).map(key => ({ id: key, ...action.data.data[key] })),
          vehiclePagination: {
            currentPage: action.data.currentPage,
            pagesCount: action.data.pagesCount,
          },
        },
      );
    }
    case 'FETCH_VEHICLE_LIST_SUCCESS': {
      return merge(state,
        {
          vehicleList: action.data,
        },
      );
    }
    case 'FETCH_VEHICLE_VENDORS_SUCCESS': {
      return merge(state,
        { vehicleVendors: Object.keys(action.data).map(key => action.data[key]) },
      );
    }
    case 'FETCH_BALANCE_SUCCESS': {
      return merge(state,
        { balance: action.data },
      );
    }
    case 'EXCHANGE_WAITING_SUCCESS': {
      return merge(state,
        { exchangeWaiting: action.data },
      );
    }
    case 'FETCH_VEHICLE_MODELS_SUCCESS': {
      return merge(state,
        { vehicleModels: Object.keys(action.data).map(key => action.data[key]) },
      );
    }
    case 'EDIT_USERS_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editUser'), { error: action.errors }),
        },
      }, state);
    }
    case 'FETCH_DRIVERS_LIST_SUCCESS': {
      return merge(state,
        { driversList: Object.keys(action.data).map(key => ({ id: key, name: action.data[key] })) },
      );
    }
    case 'FETCH_DRIVERS_SUCCESS': {
      return merge(state,
        {
          drivers: Object.keys(action.data.data).map(key => ({ id: key, ...action.data.data[key] })),
          driversPagination: {
            currentPage: action.data.currentPage,
            pagesCount: action.data.pagesCount,
          },
        },
      );
    }
    case 'ACTIVATE_DRIVER_SUCCESS': {
      return evolve({
        drivers: map(when(propEq('id', action.id),
          set(lensProp('status'), 1),
        )),
      }, state);
    }
    case 'DEACTIVATE_DRIVER_SUCCESS': {
      return evolve({
        drivers: map(when(propEq('id', action.id),
          set(lensProp('status'), 0),
        )),
      }, state);
    }
    case 'ACTIVATE_VEHICLE_SUCCESS': {
      return evolve({
        vehicle: map(when(propEq('id', action.id),
          set(lensProp('status'), 1),
        )),
      }, state);
    }
    case 'DEACTIVATE_VEHICLE_SUCCESS': {
      return evolve({
        vehicle: map(when(propEq('id', action.id),
          set(lensProp('status'), 0),
        )),
      }, state);
    }
    case 'EDIT_DRIVER_SUCCESS': {
      const drivers =
        state.drivers.filter(item => item.user_id !== action.postData.user_id);
      return merge(state, {
        drivers: insert(1, action.postData, drivers),
      });
    }
    case 'EDIT_DRIVER_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editDriver'), { error: action.errors }),
        },
      }, state);
    }
    case 'EDIT_VEHICLE_SUCCESS': {
      const vehicle =
        state.vehicle.filter(item => item.id !== action.postData.id);
      return merge(state, {
        vehicle: insert(1, action.postData, vehicle),
      });
    }
    case 'SAVE_DRIVER_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addDriver'), { success: action.success }),
        },
      }, state);
    }
    case 'SAVE_DRIVER_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addDriver'), { error: action.errors }),
        },
      }, state);
    }
    case 'SAVE_VEHICLE_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addVehicle'), { success: action.success }),
        },
      }, state);
    }
    case 'SAVE_VEHICLE_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addVehicle'), { error: action.errors }),
        },
      }, state);
    }
    case 'EDIT_VEHICLE_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editVehicle'), { error: action.errors }),
        },
      }, state);
    }
    case 'INVOICE_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('refillBalance'), { success: action.success }),
        },
      }, state);
    }
    case 'INVOICE_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('refillBalance'), { error: action.errors }),
        },
      }, state);
    }
    case 'CLEAR_VEHICLE_LIST': {
      return merge(state, {
        vehicle: [],
        vehiclePagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'FIND_VEHICLE_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('findVehicle'), action.errors),
        },
      }, state);
    }
    case 'CLEAR_DRIVERS_LIST': {
      return merge(state, {
        drivers: [],
        driversPagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'FIND_DRIVERS_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('findDrivers'), action.errors),
        },
      }, state);
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
    case 'ADD_VEHICLE_REQUEST_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addVehicleRequest'), { success: action.success }),
        },
      }, state);
    }
    case 'ADD_VEHICLE_REQUEST_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('addVehicleRequest'), { error: action.errors }),
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
    case 'CLEAR_STATISTIC': {
      return merge(state, {
        statistic: [{ id: 1 }],
      });
    }
    case 'CLEAR_VEHICLE_VENDORS': {
      return merge(state, {
        vehicleVendors: [],
      });
    }
    case 'CLEAR_VEHICLE_MODELS': {
      return merge(state, {
        vehicleModels: [],
      });
    }
    default: {
      return state;
    }
  }
}
