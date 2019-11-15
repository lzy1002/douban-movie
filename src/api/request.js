import axiso from "axios";

export function request(config) {
  const instance = axiso.create({
    // baseURL: "http://api.douban.com",
    timeout: 5000
  });

  instance.interceptors.request.use((config) => {
    return config;
  }, (error) => {
    console.log(error);
  });

  instance.interceptors.response.use((data) => {
    return data.data;
  }, (error) => {
    console.log(error);
  });

  return instance(config);
}
