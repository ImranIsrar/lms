
import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_API_BASE_URL}`,
  timeout: 500000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token;
  if (secureLocalStorage.getItem("token")) {
    token = secureLocalStorage.getItem("token");
  }

  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const responseBody = (response) => {
  return {
    data: response.data,
    countData: response?.headers['x-total-count']
  };
};

const requests = {
  get: (url, body, headers) =>
    instance.get(url, body, headers).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body, headers) =>
    instance.put(url, body, headers).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url) => instance.delete(url).then(responseBody),
};

export default requests;
