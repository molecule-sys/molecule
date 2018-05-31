import { evolve, set, lensProp, merge } from 'ramda';

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
    case 'FETCH_ORDERS_SUCCESS': {
      return merge(state,
        {
          orders: Object.keys(action.data.data).map(key => ({ id: key, ...action.data.data[key] })),
          ordersPagination: {
            currentPage: action.data.currentPage,
            pagesCount: action.data.pagesCount,
          },
        },
      );
    }
    case 'FETCH_SERVICE_LIST_SUCCESS': {
      return merge(state,
        { serviceList: action.data },
      );
    }
    case 'FIND_DRIVER_SUCCESS': {
      return merge(state,
        { clients: action.data },
      );
    }
    case 'CLEAR_DRIVER': {
      return merge(state, {
        clients: {},
      });
    }
    case 'EDIT_USERS_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('editUser'), { error: action.errors }),
        },
      }, state);
    }
    case 'CONFIRM_ORDER_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('confirmOrder'), { id: action.id, ...action.errors }),
        },
      }, state);
    }
    case 'SAVE_ORDER_SUCCESS': {
      return evolve({
        data: {
          apiCallback: set(lensProp('newOperation'), { success: action.success }),
        },
      }, state);
    }
    case 'SAVE_ORDER_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('newOperation'), { error: action.errors }),
        },
      }, state);
    }
    case 'CLEAR_ORDERS_LIST': {
      return merge(state, {
        orders: [],
        ordersPagination: {
          currentPage: 1,
          pagesCount: 1,
        },
      });
    }
    case 'FIND_ORDERS_FAIL': {
      return evolve({
        data: {
          apiCallback: set(lensProp('findOrders'), action.errors),
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
    default: {
      return state;
    }
  }
}
