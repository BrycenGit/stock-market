import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CarouselPage from "./js/carousel.js";
import HistoricalData from './js/historical.js';

function makeCarousel(keys, values, entries, imgArray, chartArray) {
  let temp = ['high','low','close'];
  let html = ('');
  
  html += `<div class="carousel-item active">`;
  html += `<div class='card search-card'><div class='card-header'>${keys[0]}</div>`;
  html += `<div class='card-body'><img src=${imgArray[0]} style="height:100px;">`;
  html += `<p>Company Name: ${values[0].quote.companyName}</p>`;
  html += `<p>Real Time Price: $${values[0].quote.iexRealtimePrice}</p>`;
  html += `<canvas id="#chart"></canvas>`
  HistoricalData.getChart('#chart', 'aapl', temp);
  html += `</div></div></div>`;
  for (let i=1; i<keys.length; i++) {
    let temp = ['high','low','close'];
    html += `<div class="carousel-item">`;
    html += `<div class='card search-card'><div class='card-header'>${keys[i]}</div>`;
    html += `<div class='card-body'><img src=${imgArray[i]} style='height:100px;'>`;
    html += `<p>Company Name: ${values[i].quote.companyName}</p>`;
    html += `<p>Real Time Price: $${values[i].quote.iexRealtimePrice}</p>`;
    html += `<canvas id="#chart${i}"></canvas>`
    HistoricalData.getChart(`#chart${i}`, 'aapl', temp);
    // html += `<canvas id="#chart${chartArray[i]}"></canvas>`
    html += `</div></div></div>`;
  }
  $('.carousel-inner').html(html);
}

// function displayGraph(keys) {
//   let ch = $('#chart');
//   let temp = ['high','low','close'];
//   HistoricalData.getChart(ch, keys, temp);
// }



$(document).ready(function() {
  CarouselPage.getCarousel('aapl','amzn','fb','tsla','msft')
    .then(function(response) {
      let imgArray = ['https://bit.ly/3iute7m','https://bit.ly/2ZCtaep',"https://bit.ly/3c2wfsX",'https://bit.ly/2E08Ewu','https://bit.ly/2ZTvKNh'];
      let keys = Object.keys(response);
      let values = Object.values(response);
      let entries = Object.entries(response);
      makeCarousel(keys, values, entries, imgArray);
      // let ch = $('#chart');
      // let temp = ['high','low','close'];
      // displayGraph(keys);
      // let chartArray = [(HistoricalData.getChart(ch, 'appl', temp)), (HistoricalData.getChart(ch, 'amzn', temp))]
      
    });

});
//import Chart from 'chart.js';


// $(document).ready(async function () {

//   // let dataObject = await HistoricalData.getData('aapl', 'high');
//   // let test = await HistoricalData.getData('aapl', 'low');

  
//   // let myChart = new Chart(ch, {
//   //   type: 'line',
//   //   data: {
//   //     labels: dataObject.label,
//   //     datasets: [{
//   //       label: 'change Percent',
//   //       data: dataObject.value,
//   //       backgroundColor: 'transparent',
//   //       borderColor: 'green',
//   //       borderWidth: 1
//   //     },
//   //     {
//   //       label: 'Close',
//   //       data: test.value,
//   //       backgroundColor: 'transparent',
//   //       borderColor: 'blue',
//   //       borderWidth: 1
//   //     }],
      

//   //   },
//   // });
//   console.log(myChart);

   
// 