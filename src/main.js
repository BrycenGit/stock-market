import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
//import Chart from 'chart.js';
import HistoricalData from './historical.js';

$(document).ready(async function () {

  // let dataObject = await HistoricalData.getData('aapl', 'high');
  // let test = await HistoricalData.getData('aapl', 'low');

  let ch = $('#chart');
  let temp = ['high','low','close'];
  let myChart = HistoricalData.getChart(ch, 'aapl', temp);
  // let myChart = new Chart(ch, {
  //   type: 'line',
  //   data: {
  //     labels: dataObject.label,
  //     datasets: [{
  //       label: 'change Percent',
  //       data: dataObject.value,
  //       backgroundColor: 'transparent',
  //       borderColor: 'green',
  //       borderWidth: 1
  //     },
  //     {
  //       label: 'Close',
  //       data: test.value,
  //       backgroundColor: 'transparent',
  //       borderColor: 'blue',
  //       borderWidth: 1
  //     }],
      

  //   },
  // });
  console.log(myChart);

   
});