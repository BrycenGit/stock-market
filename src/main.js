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
  html += `<div class='card-body'>`;
  html += `<div class="row">`;
  html += `<div class='col'><img src=${values[0].logo.url} style="height:150px;"></div>`;
  html += `<div class='col'><p>Company Name: ${values[0].quote.companyName}</p>`;
  html += `<p>Change Amount: $${values[0].quote.change}</p>`;
  html += `<p>Change Percent: ${(values[0].quote.changePercent *100).toFixed(2)}%</p>`;
  
  html += `<p>Real Time Price: $${values[0].quote.iexRealtimePrice}</p></div>`;
  html += `<div class='col'><canvas id="#chart" class="carouselChart"></canvas></div>`;
  html += `</div></div></div></div>`;
  HistoricalData.getChart("#chart", `${keys[0]}`, temp);
  for (let i = 1; i < keys.length; i++) {
    let temp = ["changePercent"];
    html += `<div class="carousel-item">`;
    html += `<div class='card search-card'>`;
    html += `<div class='card-body'>`;
    html += `<div class="row">`;
    html += `<div class='col'><img src=${values[i].logo.url} style="height:150px;"></div>`;
    html += `<div class='col'><p>Company Name: ${values[i].quote.companyName}</p>`;
    html += `<p>Change Amount: $${values[i].quote.change}</p>`;
    html += `<p>Change Percent: ${(values[i].quote.changePercent *100).toFixed(2)}%</p>`;
    html += `<p>Real Time Price: $${values[i].quote.iexRealtimePrice}</p></div>`;
    html += `<div class='col'><canvas id="#chart${i}" class="carouselChart"></canvas></div>`;
    html += `</div></div></div></div>`;
    HistoricalData.getChart(`#chart${i}`, `${keys[i]}`, temp);
  }
  $(".carousel-inner").html(html);
}

async function writeAutoComplete(input, searchBox) {
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

async function addToWatchlist(symbol, watchlistArray) {
  let info = await StockInfo.getData(symbol);
  let object = {
    name: info.companyName,
    symbol: info.symbol,
    realtimePrice: info.iexRealtimePrice,
    change: info.changePercent,
  };
  if (!checkWatchlist(symbol, watchlistArray)) {
    watchlistArray.push(object);
  }
  return true;
}

function removeFromList(symbol, watchlist) {
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].symbol == symbol) {
      watchlist.splice(i, 1);
      return;
    }
  }
}

function checkWatchlist(symbol, watchlist) {
  for (let i = 0; i < watchlist.length; i++) {
    if (watchlist[i].symbol.toLowerCase() == symbol.toLowerCase()) {
      return true;
    }
  }
  return false;
}


async function writeDetailCompanyInfo(symbol, divElement) {
  let info = await StockInfo.getData(symbol);
  let html = '';
  let d = new Date(info.iexLastUpdate);
  html = `<div class='card'>`;
  html += `<div class='card-header'>`;
  html += `<h3><img class='logo' src=${info.logo}>${info.companyName}(<span id='symbol'>${info.symbol}</span>)</h3>`;
  if (info.changePercent > 0) {
    html += `<h2>$${info.iexRealtimePrice} <span style='color: green;'>+${info.change} (${(info.changePercent * 100).toFixed(2)}%)</span></h2>`;
  } else {
    html += `<h2>$${info.iexRealtimePrice} <span style='color: red;'>${info.change} (${(info.changePercent * 100).toFixed(2)}%)</span></h2>`;
  }
  html += `<p>${d.toLocaleDateString()} ${d.toLocaleTimeString()} <button class='btn btn-outline-dark' disabled id='stock-button'>Stock</button><button class='btn btn-outline-dark' id='company-button'>Company</button><button class='btn btn-outline-dark' id='add-button'>Add to Watchlist</button><button class='btn btn-outline-dark' id='remove-button'>Remove from Watchlist</button></p>`;
  html += `</div>`;

  html += `<div id='stock-info' class='card-body'>`;
  html += `<div class='row'>`;
  html += `<div id='table-info' class='col-4'>`;
  html += `<table class="table table-striped">`;
  html += `<tr><td>Exchange</td><td>${info.exchange}</td></tr>`;
  html += `<tr><td>High</td><td>$${info.high}</td></tr>`;
  html += `<tr><td>Low</td><td>$${info.low}</td></tr>`;
  html += `<tr><td>MarketCap</td><td>$${info.marketCap.toLocaleString()}</td></tr>`;
  html += `<tr><td>P/E Ratio</td><td>${info.peRatio}</td></tr>`;
  html += `<tr><td>52 Week Range</td><td>$${info.week52Low} - $${info.week52High}</td></tr>`;
  html += `<tr><td>YTD Change</td><td>${(info.ytdChange * 100).toFixed(2)}%</td></tr>`;

  html += `</table>`;
  html += `</div>`;
  html += `<div id='chart-info' class='col-8'>`;
  html += `<canvas id='chart'></canvas>`;
  html += `</div>`;
  html += `</div>`;
  html += `</div>`;

  html += `<div id='company-info' class='card-body'>`;
  html += `<div class='row'>`;
  html += `<div id='table-info' class='col-12'>`;
  html += `<table class="table table-striped">`;
  html += `<tr><td>Company CEO</td><td>${info.ceo}</td></tr>`;
  html += `<tr><td>Company Description</td><td>${info.description}</td></tr>`;
  html += `<tr><td>Company Industry</td><td>${info.industry}</td></tr>`;
  html += `<tr><td>Tags:</td><td>${info.tags}</td></tr>`;
  html += `<tr><td>Location</td><td>${info.city}, ${info.state}</td></tr>`;
  html += `<tr><td>Company Website</td><td><a href=${info.website}>${info.website}</a></td></tr>`;
  html += `</table>`;
  html += `</div>`;
  html += `</div>`;
  html += `</div>`;

  html += `</div>`;
  divElement.html(html);
  HistoricalData.getChart($('#detail-div #chart'), symbol, ['close', 'changePercent', 'high', 'low', 'change']);
}

function checkAddRemove(addButton, removeButton, symbol, watchList) {
  if (checkWatchlist(symbol, watchList)) {
    addButton.attr('disabled', true);
    removeButton.attr('disabled', false);
  } else {
    addButton.attr('disabled', false);
    removeButton.attr('disabled', true);
  }

}
function openNav() {
  $("#myWatchList").css('width', '250px');
}

function closeNav() {
  $("#myWatchList").css('width', '0px');
}


function writeWatchList(watchlistArray) {
  let html ='<a href="javascript:void(0)" class="closebtn" id="closeNav">&times;</a>';
  if(watchlistArray.length > 0){
    for (let i=0; i < watchlistArray.length; i++) {
      html += `<a class='stocks' href="#" id=${watchlistArray[i].symbol}>${watchlistArray[i].name}</a>`;
    }
  }
  $('#myWatchList').html(html);
}


$(document).ready(async function () {
  let watchlistArray = [];
  if(sessionStorage.length > 0) {
    watchlistArray = $.parseJSON(sessionStorage.getItem('watchlistArray'));
    writeWatchList(watchlistArray);
  }
  
  CarouselPage.getCarousel('aapl', 'amzn', 'fb', 'tsla', 'msft')
    .then(function (response) {
      let keys = Object.keys(response);
      let values = Object.values(response);
      makeCarousel(keys, values);
    });

  $('#searchForm').submit(async function (event) { // for searching list of stocks
    event.preventDefault();
    $('#landing').hide();
    let input = $('#stock').val();
    $('#stock').val('');
    let result = await Search.getData(input);
    if (result.length > 0) {
      if (input.toLowerCase() === result[0].symbol.toLowerCase()) {
        await writeDetailCompanyInfo(input, $('#detail-div'));
        checkAddRemove($('#add-button'), $('#remove-button'), input, watchlistArray);
        $('#detail-div').show();
      } else {
        writeSearchResultsToList(result, $('#results-list'));
        $('#results-list').show();
        $('#detail-div').hide();
      }
    }
  });
  $('#stock').on('change keyup paste', function () { // for autocomplete need this event handler
    let input = $('#stock').val();
    if (input !== '') {
      writeAutoComplete(input, $('#stock'));
    }
  });
  $('#results-list').on('click', 'a', async function () {
    await writeDetailCompanyInfo($(this).attr('id'), $('#detail-div'));
    checkAddRemove($('#add-button'), $('#remove-button'), $(this).attr('id'), watchlistArray);
    $('#results-list').hide();
    $('#detail-div').show();
  });
  $('#detail-div').on('click', '#stock-button', function () {
    $('#company-button').attr('disabled', false);
    $('#stock-button').attr('disabled', true);
    $('#stock-info').show();
    $('#company-info').hide();
  });
  $('#detail-div').on('click', '#company-button', function () {
    $('#company-button').attr('disabled', true);
    $('#stock-button').attr('disabled', false);
    $('#stock-info').hide();
    $('#company-info').show();
  });
  $('#detail-div').on('click', '#add-button', async function () {
    let symbol = $(this).parentsUntil('.card').parentsUntil('.card').find('#symbol');
    if (await addToWatchlist(symbol.text(), watchlistArray)) {
      $('#add-button').attr('disabled', true);
      $('#remove-button').attr('disabled', false);
    }
    writeWatchList(watchlistArray);
    sessionStorage.watchlistArray = JSON.stringify(watchlistArray);
  });
  $('#detail-div').on('click', '#remove-button', function () {
    let symbol = $(this).parentsUntil('.card').parentsUntil('.card').find('#symbol');
    removeFromList(symbol.text(), watchlistArray);
    if (!checkWatchlist(symbol.text(), watchlistArray)) {
      $('#add-button').attr('disabled', false);
      $('#remove-button').attr('disabled', true);
    }
    writeWatchList(watchlistArray);
    sessionStorage.watchlistArray = JSON.stringify(watchlistArray);
    
  });
  $('#openNav').click(function(){
    openNav();
  });
  $('#myWatchList').on('click', '.closebtn', function(){
    closeNav();
  });
  $('#myWatchList').on('click', '.stocks', async function(){
    await writeDetailCompanyInfo($(this).attr('id'), $('#detail-div'));
    checkAddRemove($('#add-button'), $('#remove-button'), $(this).attr('id'), watchlistArray);
    $('#detail-div').show();
    $('#results-list').hide();
    $('#landing').hide();
  });

});

