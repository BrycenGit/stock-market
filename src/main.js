import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CarouselPage from "./js/carousel.js";
import HistoricalData from './js/historical.js';
import StockInfo from './js/stockInfo.js';
import Search from './js/searchBar.js';

function makeCarousel(keys, values) {
  
  let temp = ["changePercent"];
  let html = "";
  html += `<div class="carousel-item active">`;
  html += `<div class='card search-card'>`;
  html += `<div class='card-header'>${keys[0]}</div>`;
  html += `<div class='card-body'>`;
  html += `<div class="row">`;
  html += `<div class='col'><img src=${values[0].logo.url} style="height:150px;"></div>`;
  html += `<div class='col'><p>Company Name: ${values[0].quote.companyName}</p>`;
  html += `<p>Real Time Price: $${values[0].quote.iexRealtimePrice}</p></div>`;
  html += `<div class='col'><canvas id="#chart"></canvas></div>`;
  html += `</div></div></div></div>`;
  //HistoricalData.getChart("#chart", `${keys[0]}`, temp);
  console.log(values[0].logo.url);
  for (let i = 1; i < keys.length; i++) {
    let temp = ["changePercent"];
    html += `<div class="carousel-item">`;
    html += `<div class='card search-card'>`;
    html += `<div class='card-header'>${keys[i]}</div>`;
    html += `<div class='card-body'>`;
    html += `<div class="row">`;
    html += `<div class='col'><img src=${values[i].logo.url} style="height:150px;"></div>`;
    html += `<div class='col'><p>Company Name: ${values[i].quote.companyName}</p>`;
    html += `<p>Real Time Price: $${values[i].quote.iexRealtimePrice}</p></div>`;
    html += `<div class='col'><canvas id="#chart${i}"></canvas></div>`;
    html += `</div></div></div></div>`;
    //HistoricalData.getChart(`#chart${i}`, `${keys[i]}`, temp);
  }
  $(".carousel-inner").html(html);
}

async function writeAutoComplete(input, searchBox) { //autocomplete for searching stock symbols
  let html = '';
  html += '<datalist id="auto">';
  let result = await Search.getData(input);
  if (result.length > 0) {
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
    html += `<li><a id='${element.symbol}'href=#>${element.symbol} | ${element.securityName}</a></li>`;
  });
  list.html(html);

}


async function writeDetailCompanyInfo(symbol, divElement) {
  let info = await StockInfo.getData(symbol);
  let html = '';
  let htmlCompany = '';
  let d = new Date(info.iexLastUpdate);
  //console.log(info);
  html = `<div class='card'>`;
  html += `<div class='card-header'>`;
  html += `<h3><img class='logo' src=${info.logo}>${info.companyName}(${info.symbol})</h3>`;
  if(info.changePercent > 0) {
    html += `<h2>$${info.iexRealtimePrice} <span style='color: green;'>+${info.change} (${info.changePercent}%)</span></h2>`;
  } else {
    html += `<h2>$${info.iexRealtimePrice} <span style='color: red;'>${info.change} (${info.changePercent}%)</span></h2>`;
  }
  html += `<p>${d.toLocaleDateString()} ${d.toLocaleTimeString()} <button disabled id='stock-button'>Stock</button><button id='company-button'>Company</button><button id='add-button'>Add to Watchlist</button><button id='remove-button'>Remove from Watchlist</button></p>`;
  html += `</div>`;

  html += `<div id='stock-info' class='card-body'>`;
  html += `<div class='row'>`;
  html += `<div id='table-info' class='col-6'>`;
  html += `<table class="table table-striped">`;
  html += `<tr><td>Exchange</td><td>${info.exchange}</td></tr>`;
  html += `<tr><td>High</td><td>$${info.high}</td></tr>`;
  html += `<tr><td>Low</td><td>$${info.low}</td></tr>`;
  html += `<tr><td>MarketCap</td><td>$${info.marketCap.toLocaleString()}</td></tr>`;
  html += `<tr><td>P/E Ratio</td><td>${info.peRatio}</td></tr>`;
  html += `<tr><td>52 Week Range</td><td>$${info.week52Low}-$${info.week52High}</td></tr>`;
  html += `<tr><td>YTD Change</td><td>${info.ytdChange}%</td></tr>`;

  
  // html += `<tr>`;
  // html += `<td>low</td><td>market cap</td><td>P/E ratio</td><td>52 week range</td>`;
  // html += `</tr>`;
  // html += `<tr>`;
  // html += `<td>${info.low}</td><td>${info.marketCap}</td><td>${info.peRatio}</td><td>${info.week52Low}-${info.week52High}</td>`;
  // html += `</tr>`;
  html += `</table>`;
  html += `</div>`;
  html += `<div id='chart-info' class='col-6'>`;
  html += `<canvas id='chart'></canvas>`;
  html += `</div>`;
  html += `</div>`;
  html += `</div>`;

  html += `<div id='company-info' class='card-body'>`;
  html += `<div class='row'>`;
  html += `<div id='table-info' class='col-12'>`;
  html += `<table class="table table-striped">`;
  html += `<tr><td>Company CEO</td><td>${info.ceo}</td></tr>`;
  html += `<tr><td>Company description</td><td>${info.description}</td></tr>`;
  html += `<tr><td>Company Industry</td><td>${info.industry}</td></tr>`;
  html += `<tr><td>Tags:</td><td>${info.tags}</td></tr>`;
  html += `<tr><td>city,state</td><td>${info.city}, ${info.state}</td></tr>`;
  html += `<tr><td>Company website</td><td>${info.website}</td></tr>`;
  html += `</table>`;
  html += `</div>`;
  html += `</div>`;
  html += `</div>`;




  html += `</div>`;
  divElement.html(html);
  //HistoricalData.getChart($('#detail-div #chart'), symbol, ['close', 'changePercent', 'high', 'low', 'change', 'volume']);
}



$(document).ready(async function () {
  CarouselPage.getCarousel('aapl', 'amzn', 'fb', 'tsla', 'msft')
    .then(function (response) {
      let imgArray = ['https://bit.ly/3iute7m', 'https://bit.ly/2ZCtaep', "https://bit.ly/3c2wfsX", 'https://bit.ly/2E08Ewu', 'https://bit.ly/2ZTvKNh'];
      let keys = Object.keys(response);
      let values = Object.values(response);
      console.log(values);
      makeCarousel(keys, values);

    });
  // let ch = $('#chart');
  // let temp = ['high','low','close'];
  // let myChart = await HistoricalData.getChart(ch, 'aapl', temp);
  // console.log(myChart);
  // let stockInfo = await StockInfo.getData('aapl');
  // console.log(stockInfo);

  $('#searchForm').submit(async function (event) { // for searching list of stocks
    event.preventDefault();
    let input = $('#stock').val();
    $('#stock').val('');
    let result = await Search.getData(input);
    if (result.length > 0) {
      if (input.toLowerCase() === result[0].symbol.toLowerCase()) {
        //alert('you selected' + result[0].symbol);
        console.log(result[0]);
        writeDetailCompanyInfo(input, $('#detail-div'));
      } else {
        console.log(result);
        writeSearchResultsToList(result, $('#results-list'));
      }
    }

  });
  $('#stock').on('change keyup paste', function () { // for autocomplete need this event handler
    //alert('changed');
    let input = $('#stock').val();
    if (input !== '') {
      writeAutoComplete(input, $('#stock'));
    }
  });
  $('#results-list').on('click', 'a', function () {
    writeDetailCompanyInfo($(this).attr('id'), $('#detail-div'));
  });

  $('#detail-div').on('click','#stock-button',function () {
    $('#company-button').attr('disabled',false);
    $('#stock-button').attr('disabled',true);
    $('#stock-info').show();
    $('#company-info').hide();
  });
  $('#detail-div').on('click','#company-button',function () {
    $('#company-button').attr('disabled',true);
    $('#stock-button').attr('disabled',false);
    $('#stock-info').hide();
    $('#company-info').show();
  });
  $('#detail-div').click('click', '#add-button',function () {

  });
  $('#detail-div').click('click', '#remove-button',function () {

  });

});

