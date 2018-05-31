import { api } from '../api/requestor';

const auth = (username, password) => (dispatch) => {
  const params = {
    username,
    password,
  };
  api.post.auth.login(params).then((data) => {
    dispatch({
      type: 'LOGIN_SUCCESS',
    });
    localStorage.setItem('token', data.jwt);
    api.get.user.profile('me').then((profile) => {
      dispatch({
        type: 'FETCH_PROFILE_SUCCESS',
        data: profile,
      });
    });
  }).catch((errors) => {
    dispatch({
      type: 'LOGIN_FAIL',
      errors,
    });
  });
};

const logout = () => (dispatch) => {
  dispatch({
    type: 'LOGOUT',
  });
  localStorage.removeItem('token');
  window.location.href = 'http://demo.login.molecule.ws';
  // window.location.href = 'http://localhost:8100';
};

const getProfile = () => (dispatch) => {
  api.get.user.profile('me').then((profile) => {
    dispatch({
      type: 'FETCH_PROFILE_SUCCESS',
      data: profile,
    });
  });
};

const loginAs = ({ id, roleCode }) => () => {
  api.get.user.loginAs(id).then((data) => {
    switch (roleCode) {
      case 'SYSTEM_ADMIN': {
        // window.location.href = `http://localhost:8103/sign/${localStorage.getItem('token')}`;
        // window.location.href = `http://m2.molecule.ws/sign/${data.jwt}`;
          window.location.href = `http://demo.m2.molecule.ws/sign${data.jwt}`;
        break;
      }
      case 'SYSTEM_MANAGER': {
        // window.location.href = `http://localhost:8103/sign/${localStorage.getItem('token')}`;
        // window.location.href = `http://m2.molecule.ws/sign/${data.jwt}`;
          window.location.href = `http://demo.m2.molecule.ws/sign${data.jwt}`;
        break;
      }
      case 'ORG_MANAGER': {
        // window.location.href = `http://localhost:8102/sign/${localStorage.getItem('token')}`;
        window.location.href = `http://demo.m1.molecule.ws/sign/${data.jwt}`;
        break;
      }
      case 'EXEC_OPERATOR': {
        // window.location.href = `http://localhost:8101/sign/${localStorage.getItem('token')}`;
        window.location.href = `http://demo.o1.molecule.ws/sign/${data.jwt}`;
        break;
      }
      default: {
        window.location.href = `http://demo.o1.molecule.ws/sign/${data.jwt}`;
      }
    }
  });
};

const recovery = email => (dispatch) => {
  const params = {
    ForgotForm: {
      email,
    },
  };
  api.post.user.recovery(params).then((data) => {
    dispatch({
      type: 'RECOVERY_SUCCESS',
      data,
    });
  }).catch((errors) => {
    dispatch({
      type: 'RECOVERY_FAIL',
      errors,
    });
  });
};

const feedback = param => (dispatch) => {
  const params = {
    ...param,
  };
  dispatch({
    type: 'LOADING_START',
  });
  api.post.user.feedback(params).then((data) => {
    dispatch({
      type: 'FEEDBACK_SEND_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  }).catch((errors) => {
    dispatch({
      type: 'FEEDBACK_SEND_FAIL',
      errors,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const changePassword = param => (dispatch) => {
  const params = {
    ...param,
  };
  api.post.user.changePassword(params).then(() => {
    dispatch({
      type: 'CHANGE_PASSWORD_SUCCESS',
      success: {
        message: 'Пароль успешно изменен!',
      },
    });
    setTimeout(() => {
      dispatch({
        type: 'LOGOUT',
      });
      localStorage.setItem('token', '');
      window.location.href = 'http://demo.login.molecule.ws';
    }, 2000);
  }).catch((errors) => {
    dispatch({
      type: 'CHANGE_PASSWORD_FAIL',
      errors,
    });
  });
};

const getUsers = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  api.get.user.getUsers(params).then((data) => {
    dispatch({
      type: 'FETCH_USERS_SUCCESS',
      data,
    });
    dispatch({
      type: 'LOADING_STOP',
    });
  });
};

const changePageUsers = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_USERS_LIST',
  });
  api.get.user.changePageUsers(params).then((data) => {
    dispatch({
      type: 'FETCH_USERS_SUCCESS',
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

const findUsers = params => (dispatch) => {
  dispatch({
    type: 'LOADING_START',
  });
  dispatch({
    type: 'CLEAR_USERS_LIST',
  });
  api.get.user.findUsers(params).then((data) => {
    dispatch({
      type: 'FETCH_USERS_SUCCESS',
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

const activateUserOrganizations = id => (dispatch) => {
  api.get.user.activate(id).then(() => {
    dispatch({
      type: 'ACTIVATE_USERS_SUCCESS',
      id,
    });
  });
};

const deactivateUserOrganizations = id => (dispatch) => {
  api.get.user.deactivate(id).then(() => {
    dispatch({
      type: 'DEACTIVATE_USERS_SUCCESS',
      id,
    });
  });
};

const saveUser = params => (dispatch) => {
  api.post.user.save(params).then(() => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'addUser',
    });
  }).catch((errors) => {
    dispatch({
      type: 'SAVE_USERS_FAIL',
      errors,
    });
  });
};

const setUser = params => (dispatch) => {
  api.post.user.save(params).then((postData) => {
    dispatch({
      type: 'CLEAR_CALLBACK_RESPONSE',
      key: 'editUser',
    });
    dispatch({
      type: 'EDIT_USERS_SUCCESS',
      postData,
    });
  }).catch((errors) => {
    dispatch({
      type: 'EDIT_USERS_FAIL',
      errors,
    });
  });
};

export {
  auth,
  logout,
  getProfile,
  recovery,
  feedback,
  changePassword,
  getUsers,
  changePageUsers,
  findUsers,
  activateUserOrganizations,
  deactivateUserOrganizations,
  saveUser,
  setUser,
  loginAs,
};
