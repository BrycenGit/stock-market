import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import CarouselPage from "./js/carousel.js";
import HistoricalData from "./js/historical.js";

function makeCarousel(keys, values) {
  let temp = ["changePercent"];
  let html = "";
  html += `<div class="carousel-item active">`;
  html += `<div class='card search-card'>`;
  html += `<div class='card-header'>${keys[0]}</div>`;
  html += `<div class='card-body'>`;
  html += `<div class="row">`;
  html += `<div class='col'><img src=${values[0].logo.url} style="height:70px;"></div>`;
  html += `<div class='col'><p>Company Name: ${values[0].quote.companyName}</p>`;
  html += `<p>Real Time Price: $${values[0].quote.iexRealtimePrice}</p></div>`;
  html += `<div class='col'><canvas id="#chart"></canvas></div>`;
  html += `</div></div></div></div>`;
  HistoricalData.getChart("#chart", `${keys[0]}`, temp);
  console.log(values[0].logo.url);
  for (let i = 1; i < keys.length; i++) {
    let temp = ["changePercent"];
    html += `<div class="carousel-item">`;
    html += `<div class='card search-card'>`;
    html += `<div class='card-header'>${keys[i]}</div>`;
    html += `<div class='card-body'>`;
    html += `<div class="row">`;
    html += `<div class='col'><img src=${values[i].logo.url} style="height:70px;"></div>`;
    html += `<div class='col'><p>Company Name: ${values[i].quote.companyName}</p>`;
    html += `<p>Real Time Price: $${values[i].quote.iexRealtimePrice}</p></div>`;
    html += `<div class='col'><canvas id="#chart${i}"></canvas></div>`;
    html += `</div></div></div></div>`;
    HistoricalData.getChart(`#chart${i}`, `${keys[i]}`, temp);
  }
  $(".carousel-inner").html(html);
}

$(document).ready(function () {
  CarouselPage.getCarousel("aapl", "amzn", "fb", "tsla", "msft").then(function (
    response
  ) {
    let imgArray = [
      "https://bit.ly/3iute7m",
      "https://bit.ly/2ZCtaep",
      "https://bit.ly/3c2wfsX",
      "https://bit.ly/2E08Ewu",
      "https://bit.ly/2ZTvKNh",
    ];
    console.log(response);
    let keys = Object.keys(response);
    let values = Object.values(response);
    makeCarousel(keys, values);
  });
});
