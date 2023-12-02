class AppBar extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.shadowDOM.querySelector("#searchElement").value;
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      h1 {
        padding: 16px;
      }
      .search-container {
        display: flex;
        text-align: center;
        gap: 5px;
      }
      .search-container > input, button {
        padding: 5px;
        border: 1px solid #19A7CE;
        border-radius: 10px;
        font-size: 20px;
        font-family: "Dosis", sans-serif;
      }
      .search-container > input {
        width: 200px;
      }
      .search-container > input:focus {
        outline-color: #19A7CE;
      }
      .search-container > button {
        background-color: #19A7CE;
        padding-inline: 10px;
        color: white;
        cursor: pointer;
        transition: all .1s ease-in-out;
      }
      .search-container > button:hover {
        background-color: white;
        color: #19A7CE;
      }
      </style>
      
      <h1>Aplikasi Prakiraan Cuaca</h1>
      <div id="search-container" class="search-container">
          <input placeholder="Cari kota Anda..." id="searchElement">
          <button id="searchButtonElement" type="submit">Cari</button>
      </div>
    `;

    this.shadowDOM
      .querySelector("#searchButtonElement")
      .addEventListener("click", this._clickEvent);
  }
}

customElements.define("app-bar", AppBar);
