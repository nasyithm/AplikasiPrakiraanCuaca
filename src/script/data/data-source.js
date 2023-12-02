import axios from "axios";

class DataSource {
  static searchLocation(keyword) {
    return axios
      .request({
        method: "GET",
        url: "http://api.weatherapi.com/v1/forecast.json",
        params: { q: keyword, days: "3" },
        headers: {
          key: process.env.API_KEY,
        },
      })
      .then((response) => {
        return Promise.resolve(response.data);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

export default DataSource;
