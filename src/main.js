import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import Chart from 'chart.js';
import HistoricalData from './historical.js';

$(document).ready(async function () {

  let dataPromise = await HistoricalData.getCloseData('aapl');
  
  console.log(dataPromise);
  
  
  //console.log(this);
  
  //  let ch = $('#chart');
  //  let myChart = new Chart(ch, {
  //    type: 'line',
  //    data: {
  //      dataPoints.close
  //    }
  //  })



});