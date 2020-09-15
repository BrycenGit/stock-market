import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CarouselPage from "./js/carousel.js";
import HistoricalData from './js/historical.js';
import Search from './js/searchBar.js';

function makeCarousel(keys, values, entries, imgArray) { // writes to carousel html
  let html = ('');
  html += `<div class="carousel-item active">`;
  html += `<div class='card search-card'><div class='card-header'>${keys[0]}</div>`;
  html += `<div class='card-body'><img src=${imgArray[0]} style="height:100px;">`;
  html += `<p>Company Name: ${values[0].quote.companyName}</p>`;
  html += `<p>Real Time Price: $${values[0].quote.iexRealtimePrice}</p>`;
  html += `</div></div></div>`;
  for (let i=1; i<keys.length; i++) {
    html += `<div class="carousel-item">`;
    html += `<div class='card search-card'><div class='card-header'>${keys[i]}</div>`;
    html += `<div class='card-body'><img src=${imgArray[i]} style='height:100px;'>`;
    html += `<p>Company Name: ${values[i].quote.companyName}</p>`;
    html += `<p>Real Time Price: $${values[i].quote.iexRealtimePrice}</p>`;
    html += `</div></div></div>`;
  }
  $('.carousel-inner').html(html);
}

async function writeAutoComplete(input, searchBox) { //autocomplete for searching stock symbols
  let html = '';
  html += '<datalist id="auto">';
  let result = await Search.getData(input);
  if(result.length > 0) {
    result.forEach(element => {
      html += `<option value=${element.symbol}>${element.securityName}</option>`;
    });
  }
  html += '</datalist>';
  searchBox.html(html);  

}
function writeSearchResultsToList(results, list) {
  let html = '';
  results.forEach(element => {
    html += `<li><a href=#>${element.symbol} | ${element.securityName}</a></li>`;
  });
  list.html(html);
}


$(document).ready(async function() {
  // CarouselPage.getCarousel('aapl','amzn','fb','tsla','msft')
  //   .then(function(response) {
  //     let imgArray = ['https://bit.ly/3iute7m','https://bit.ly/2ZCtaep',"https://bit.ly/3c2wfsX",'https://bit.ly/2E08Ewu','https://bit.ly/2ZTvKNh'];
  //     let keys = Object.keys(response);
  //     let values = Object.values(response);
  //     let entries = Object.entries(response);
  //     makeCarousel(keys, values, entries, imgArray);
      
  //   });
  // let ch = $('#chart');
  // let temp = ['high','low','close'];
  // let myChart = await HistoricalData.getChart(ch, 'aapl', temp);
  // console.log(myChart);

  $('#searchForm').submit(async function (event) { // for searching list of stocks
    event.preventDefault();
    let input = $('#stock').val();
    
    
    console.log(input);
    let result = await Search.getData(input);
    if(result.length > 0) {
      if(input.toLowerCase() === result[0].symbol.toLowerCase()) {
        //alert('you selected' + result[0].symbol);
        console.log(result[0]);
      } else {
        console.log(result);
        writeSearchResultsToList(result, $('#results-list'));
      }
    }
    
  });
  $('#stock').on('change keyup paste',function () { // for autocomplete need this event handler
    //alert('changed');
    let input = $('#stock').val();
    if(input !== '') {
      writeAutoComplete(input, $('#stock'));
    }
  });
  // $('#stock').on('click','option',  function () {
  //   alert('here');
  // });

});


////  
//import Chart from 'chart.js';

//https://sandbox.iexapis.com/stable/search/apple?token=Tsk_45b9e84525e046ae8e38888656639cab
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