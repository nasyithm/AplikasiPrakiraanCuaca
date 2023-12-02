import "../component/app-bar.js";
import "../component/info-container.js";
import DataSource from "../data/data-source.js";

const main = () => {
  const searchElement = document.querySelector("app-bar");
  const weatherInfo = document.querySelector("info-container");
  const STORAGE_KEY = "WEATHER_FORECAST_APPS";
  let location = "";

  window.addEventListener("load", () => {
    loadDataFromStorage();
    if (location == "") {
      location = "jakarta";
    }

    DataSource.searchLocation(location)
      .then(renderResult)
      .catch(fallbackResult);
    saveData();
  });

  const onButtonSearchClicked = () => {
    DataSource.searchLocation(searchElement.value)
      .then(renderResult)
      .catch(fallbackResult);

    if (searchElement.value !== "") {
      location = searchElement.value;
    }
    saveData();
  };

  const renderResult = (result) => {
    weatherInfo.location = result;
  };

  const fallbackResult = (message) => {
    weatherInfo.renderError(message);
  };

  const saveData = () => {
    if (isStorageExist()) {
      const parsed = JSON.stringify(location);
      localStorage.setItem(STORAGE_KEY, parsed);
    }
  };

  const isStorageExist = () => {
    if (typeof Storage == "undefined") {
      alert("Browser kamu tidak mendukung local storage");
      return false;
    }

    return true;
  };

  const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
      location = data;
    }
  };

  searchElement.clickEvent = onButtonSearchClicked;
};

export default main;
