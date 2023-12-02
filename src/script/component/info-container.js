class InfoContainer extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  set location(location) {
    this._location = location;
    this.render();
  }

  renderError(error) {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .placeholder {
          text-align: center;
          font-weight: lighter;
          color: rgba(0,0,0,0.5);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      </style>
    `;
    this.shadowDOM.innerHTML += `<h2 class="placeholder">${
      error.response !== undefined
        ? error.response.data.error.message
        : error
    }</h2>`;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .info-container {
          max-width: 1024px;
          width: 100%;
          margin: auto;
          display: flex;
          gap: 1rem;
        }
        h3 {
          padding-bottom: 10px;
          font-size: 25px;
          color: #19A7CE;
        }
        h4 {
          padding-bottom: 5px;
          font-size: 22px;
        }
        p {
          font-size: 20px;
        }
        .container {
          max-width: 920px;
          margin: 20px auto;
        }
        .flexbox {
          display: flex;
          justify-content: space-around;
        }
        .wrap {
          flex-wrap: wrap;
          gap: .5rem;
        }
        .wrap > * {
          flex: 1 1 250px;
        }
        .card {
          max-width: 1024px;
          width: 100%;
          padding: 40px;
          border-radius: 10px;
          text-align: center;
          background-color: rgba(154, 160, 185, .05);
          box-shadow: 0 5px 10px rgba(154, 160, 185, .1), 0 15px 40px rgba(166, 173, 201, .3);
        }
        @media screen and (max-width: 768px) {
          .info-container {
            flex-direction: column;
          }
        }
      </style>
      
      <div id="info-container" class="info-container">
        <section class="location-container card">
          <h3>Lokasi Anda</h3>
          <h4>${this._location.location.name}</h4>
          <p>${this._location.location.region}</p>
          <p>${this._location.location.country}</p>
          <p>Lat: ${this._location.location.lat} & Long: ${this._location.location.lon}</p>
        </section>
        <section class="weather-container card">
          <h3>Cuaca Saat Ini</h3>
          <img src="${this._location.current.condition.icon}">
          <h4>${this._location.current.condition.text}</h4>
          <p>Terakhir Diupdate: ${this._location.current.last_updated}</p>
        </section>
      </div>
      <div class="container card">
        <h3>Detail Cuaca Saat Ini</h3>
        <div class="flexbox wrap">
          <p>Suhu: <b>${this._location.current.temp_c}</b>&deg;C</p>
          <p>Kelembapan: <b>${this._location.current.humidity}</b>%</p>
          <p>Curah Hujan: <b>${this._location.current.precip_mm}</b>mm</p>
          <p>Tekanan Udara: <b>${this._location.current.pressure_mb}</b>mb</p>
          <p>Jarak Pandang: <b>${this._location.current.vis_km}</b>km</p>
          <p>Kecepatan Angin: <b>${this._location.current.wind_kph}</b>kpj</p>
          <p>Indeks UV: <b>${this._location.current.uv}</b></p>
        </div>
      </div>
      <div class="container card">
        <h3>Prakiraan Cuaca Beberapa Hari Kedepan</h3>
        <div class="flexbox wrap">
          <div class="forecast-day">
            <p>${this._location.forecast.forecastday[0].date}</p>
            <img src="${this._location.forecast.forecastday[0].day.condition.icon}">
            <h4>${this._location.forecast.forecastday[0].day.condition.text}</h4>
          </div>
          <div class="forecast-day">
            <p>${this._location.forecast.forecastday[1].date}</p>
            <img src="${this._location.forecast.forecastday[1].day.condition.icon}">
            <h4>${this._location.forecast.forecastday[1].day.condition.text}</h4>
          </div>
          <div class="forecast-day">
            <p>${this._location.forecast.forecastday[2].date}</p>
            <img src="${this._location.forecast.forecastday[2].day.condition.icon}">
            <h4>${this._location.forecast.forecastday[2].day.condition.text}</h4>
          </div>
        </div>
      </div>
      <div class="flexbox">
        <p>Data didapatkan dari <a href="https://www.weatherapi.com" target="_blank">WeatherAPI.com</a></p>
      </div>
    `;
  }
}

customElements.define("info-container", InfoContainer);
