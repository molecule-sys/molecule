import isLogged from '../helpers/isLogged';

export default class ApiRequestor {

  static defaults = {
    // baseUrl: 'https://molecule-backend.herokuapp.com/api',
    baseUrl: 'https://molecule-backend-staging.herokuapp.com/api',
    version: 1,
  };

  constructor(options) {
    this.options = Object.assign({}, ApiRequestor.defaults, options);
    this.requests = {};
  }

  request({ type, path, params }) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const token = localStorage.getItem('token');
      const requestPath = `${this.options.baseUrl}/v${this.options.version}/${path}`;

      xhr.timeout = 60000;
      xhr.open(type, requestPath, true);
      if (type === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      if (isLogged()) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      }
      xhr.onload = () => {
        const response = JSON.parse(xhr.response);
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(response);
        } else if (xhr.status === 401 && response.name === 'Unauthorized') {
          if (window.location.href !== 'http://localhost:8100/' && window.location.href !== 'http://demo.login.molecule.ws/') {
            localStorage.removeItem('token');
            window.location.href = 'http://demo.login.molecule.ws';
          }
          reject({
            status: response.status,
            code: response.code,
            message: response.message,
          });
        } else {
          reject({
            status: response.status,
            code: response.code,
            message: response.message,
          });
        }
      };
      xhr.ontimeout = () => {
        alert('Превышено время выполнения запроса. Попробуйте перезагрузить страницу или обратитесь в техническую поддержку системы.');
      };
      xhr.onerror = () => {
        const response = JSON.parse(xhr.response);
        reject({
          status: response.status,
          code: response.code,
          message: response.message,
        });
      };
      if (params) {
        xhr.send(JSON.stringify(params));
      } else {
        xhr.send();
      }
    });
  }

  get = {
    user: {
      profile: id => this.request({
        type: 'GET',
        path: `users/${id}/profile`,
      }),
      getUsers: ({ roleName, status }) => this.request({
        type: 'GET',
        path: `user-organizations?filter=${roleName}&status=${status}`,
      }),
      changePageUsers: ({ page, filter, status }) => this.request({
        type: 'GET',
        path: `user-organizations?page=${page}&filter=${filter}&status=${status}`,
      }),
      findUsers: ({ searchText, filter, status }) => this.request({
        type: 'GET',
        path: `user-organizations?filter=${filter}&search=${searchText}&status=${status}`,
      }),
      activate: id => this.request({
        type: 'GET',
        path: `user-organizations/${id}/activate`,
      }),
      deactivate: id => this.request({
        type: 'GET',
        path: `user-organizations/${id}/deactivate`,
      }),
      loginAs: id => this.request({
        type: 'GET',
        path: `users/${id}/login-as`,
      }),
    },
    vehicles: {
      vehicleList: ({ status }) => this.request({
        type: 'GET',
        path: `vehicles?status=${status}`,
      }),
      vehiclesList: () => this.request({
        type: 'GET',
        path: 'vehicles/vehicle-list',
      }),
      vehicleVendors: ({ status }) => this.request({
        type: 'GET',
        path: `vehicle-vendors/vehicle-vendor-list?status=${status}`,
      }),
      vehicleModels: ({ vendorId, status }) => this.request({
        type: 'GET',
        path: `vehicle-models/vehicle-model-list?vendor_id=${vendorId}&status=${status}`,
      }),
      vehicleModelsPaginate: ({ vendorId, status }) => this.request({
        type: 'GET',
        path: `vehicle-models?vendor_id=${vendorId}&status=${status}`,
      }),
      activate: id => this.request({
        type: 'GET',
        path: `vehicles/${id}/activate`,
      }),
      deactivate: id => this.request({
        type: 'GET',
        path: `vehicles/${id}/deactivate`,
      }),
      vehicleModelActivate: id => this.request({
        type: 'GET',
        path: `vehicle-models/${id}/activate`,
      }),
      vehicleModelDeactivate: id => this.request({
        type: 'GET',
        path: `vehicle-models/${id}/deactivate`,
      }),
      findVehicle: ({ searchText, status }) => this.request({
        type: 'GET',
        path: `vehicles?search=${searchText}&status=${status}`,
      }),
      changePageVehicles: ({ page, status }) => this.request({
        type: 'GET',
        path: `vehicles?page=${page}&status=${status}`,
      }),
      changePageVehiclesModels: ({ page, vendorId }) => this.request({
        type: 'GET',
        path: `vehicle-models?vendor_id=${vendorId}&page=${page}`,
      }),
    },
    drivers: {
      drivers: ({ status }) => this.request({
        type: 'GET',
        path: `drivers?status=${status}`,
      }),
      driversList: () => this.request({
        type: 'GET',
        path: 'drivers/user-list',
      }),
      activate: id => this.request({
        type: 'GET',
        path: `drivers/${id}/activate`,
      }),
      deactivate: id => this.request({
        type: 'GET',
        path: `drivers/${id}/deactivate`,
      }),
      findDriver: phone => this.request({
        type: 'GET',
        path: `drivers/find-driver?phone=${phone}`,
      }),
      findDrivers: ({ searchText, status }) => this.request({
        type: 'GET',
        path: `drivers?search=${searchText}&status=${status}`,
      }),
      changePageDrivers: ({ page, status }) => this.request({
        type: 'GET',
        path: `drivers?page=${page}&status=${status}`,
      }),
    },
    organizations: {
      customersList: ({ status }) => this.request({
        type: 'GET',
        path: `organizations?type=customer&status=${status}`,
      }),
      executivesList: ({ status }) => this.request({
        type: 'GET',
        path: `organizations?type=executive&status=${status}`,
      }),
      organizationsList: type => this.request({
        type: 'GET',
        path: `organizations/organization-list?type=${type}`,
      }),
      types: () => this.request({
        type: 'GET',
        path: 'organizations/get-type',
      }),
      activate: id => this.request({
        type: 'GET',
        path: `organizations/${id}/activate`,
      }),
      deactivate: id => this.request({
        type: 'GET',
        path: `organizations/${id}/deactivate`,
      }),
      findOrganization: ({ searchText, type, status }) => this.request({
        type: 'GET',
        path: `organizations?type=${type}&search=${searchText}&status=${status}`,
      }),
      changePageOrganization: ({ page, type, status }) => this.request({
        type: 'GET',
        path: `organizations?type=${type}&page=${page}&status=${status}`,
      }),
      getStatistic: ({ dimensions, startDate, endDate, type, organization, vehicle, driver, statisticType }) => this.request({
        type: 'GET',
        path: `statistics?dimensions=${dimensions}&start_date=${startDate}&end_date=${endDate}&type=${type}&organization=${organization}&vehicle=${vehicle}&driver=${driver}&show=${statisticType}`,
      }),
      getFilterOrganizationsList: type => this.request({
        type: 'GET',
        path: `statistics/filter-organization?show=${type}`,
      }),
      getFilterVehiclesList: ({ organization_id, driver_id }) => this.request({
        type: 'GET',
        path: `statistics/filter-vehicle?organization_id=${organization_id}&driver_id=${driver_id}`,
      }),
      getFilterDriversList: ({ organization_id, vehicle_id }) => this.request({
        type: 'GET',
        path: `statistics/filter-driver?organization_id=${organization_id}&vehicle_id=${vehicle_id}`,
      }),
      getBalance: () => this.request({
        type: 'GET',
        path: 'organizations/get-balance',
      }),
      getCategory: () => this.request({
        type: 'GET',
        path: 'organizations/get-category',
      }),
    },
    orders: {
      ordersList: () => this.request({
        type: 'GET',
        path: 'orders',
      }),
      confirmOrder: ({ id, code }) => this.request({
        type: 'GET',
        path: `orders/${id}/confirm?confirm=${code}`,
      }),
      deleteOrder: id => this.request({
        type: 'GET',
        path: `orders/${id}/delete-order`,
      }),
      renewCode: id => this.request({
        type: 'GET',
        path: `orders/${id}/renew-code`,
      }),
      changePageOrders: ({ page }) => this.request({
        type: 'GET',
        path: `orders?page=${page}`,
      }),
      getServiceList: () => this.request({
        type: 'GET',
        path: 'services/service-list',
      }),
    },
    exchange: {
      waiting: () => this.request({
        type: 'GET',
        path: 'exchanges/transaction-waiting',
      }),
      getActs: ({ id }) => this.request({
        type: 'GET',
        path: `exchanges/act-for-period?organization_id=${id}`,
      }),
      getActPrint: ({ guid }) => this.request({
        type: 'GET',
        path: `exchanges/act-print-form?guid=${guid}`,
      }),
      // getActPrint: ({ guid }) => this.request({
      //   type: 'GET',
      //   path: `exchanges/act-print-form-fake`,
      // }),
    },
  }

  post = {
    auth: {
      login: params => this.request({
        type: 'POST',
        path: 'users/auth',
        params,
      }),
    },
    user: {
      recovery: params => this.request({
        type: 'POST',
        path: 'users/forgot-password',
        params,
      }),
      feedback: params => this.request({
        type: 'POST',
        path: 'support-messages/send',
        params,
      }),
      changePassword: params => this.request({
        type: 'POST',
        path: 'users/save',
        params,
      }),
      save: params => this.request({
        type: 'POST',
        path: 'user-organizations/save',
        params,
      }),
    },
    vehicles: {
      save: params => this.request({
        type: 'POST',
        path: 'vehicles/save',
        params,
      }),
      saveVehicleTypes: params => this.request({
        type: 'POST',
        path: 'vehicle-types/save',
        params,
      }),
      saveVendor: params => this.request({
        type: 'POST',
        path: 'vehicle-vendors',
        params,
      }),
      saveModel: params => this.request({
        type: 'POST',
        path: 'vehicle-models',
        params,
      }),
      addVehicleRequest: params => this.request({
        type: 'POST',
        path: 'vehicles/add-vehicle-request',
        params,
      }),
    },
    drivers: {
      save: params => this.request({
        type: 'POST',
        path: 'drivers/save',
        params,
      }),
    },
    organizations: {
      save: params => this.request({
        type: 'POST',
        path: 'organizations/save',
        params,
      }),
    },
    orders: {
      save: params => this.request({
        type: 'POST',
        path: 'orders/save',
        params,
      }),
    },
    exchange: {
      invoice: params => this.request({
        type: 'POST',
        path: 'exchanges/invoice',
        params,
      }),
    },
  }

}

const api = new ApiRequestor();

export { api };
