import axios from "axios";

class DataSource {
  static searchLocation(keyword) {
    return axios
      .request({
        method: "GET",
        url: "http://api.weatherapi.com/v1/forecast.json",
        params: { q: keyword, days: "3" },
        headers: {
          key: "b888bee4d805454fb2c223832230304",
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
