import axios from 'axios';
import Cookies from 'universal-cookie';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = window.location.origin;

const setupAxiosInterceptors = onUnauthenticated => {
  const onRequestSuccess = config => {
    const cookies = new Cookies();
    const token = cookies.get('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403) {
      onUnauthenticated();
      return Promise.reject(err);
    }

    if (status === 401) {
      console.warn(err.request.responseURL);
      if (err.request.responseURL.includes('/oauth/token')) {
        onUnauthenticated();
        return Promise.reject(err);
      }
      const cookies = new Cookies();
      const urlencoded = new URLSearchParams();
      urlencoded.append('grant_type', 'refresh_token');
      urlencoded.append('refresh_token', cookies.get('refresh_token'));
      return axios
        .post('/oauth/token', urlencoded.toString())
        .then(res => {
          if (res.status !== 200) {
            throw Error('refresh token failed');
          }
          const d = new Date();
          d.setTime(d.getTime() + 60 * 60 * 1000);
          cookies.set('access_token', res.data.access_token, {
            path: '/',
            expires: d,
          });
          cookies.set('refresh_token', res.data.refresh_token, {
            path: '/',
            expires: d,
          });
          err.config.headers.Authorization = `Bearer ${res.data.access_token}`;
          return axios.request(err.config);
        })
        .catch(error => {
          onUnauthenticated();
          return Promise.reject(error);
        });
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
