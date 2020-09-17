import Chart from 'chart.js';
export default class HistoricalData {

  static async makeApiCall(symbol) {
    try {
      const url = `https://sandbox.iexapis.com/stable/stock/${symbol}/chart/1m?token=${process.env.API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getData(symbol, dataType) {
    const response = await HistoricalData.makeApiCall(symbol);
    if (response.length > 0) {
      let label = [];
      let value = [];
      for (let i = 0; i < response.length; i++) {
        label.push(response[i].label);
        value.push(response[i][dataType]);
      }
      let result = {
        'label': label,
        'value': value
      };
      return result;
    }
  }

  static async getChart(canvas, symbol, dataTypeArr) {
    let dataObjectArr = [];
    let colors = ['red','green','blue','black','purple','brown','pink','silver'];
    const response = await HistoricalData.makeApiCall(symbol);
    if (response.length > 0) {
      for (let i = 0; i < dataTypeArr.length; i++) {
        let label = [];
        let value = [];
        for (let j = 0; j < response.length; j++) {
          label.push(response[j].label);
          value.push(response[j][dataTypeArr[i]]);
        }
        let temp = {
          'label': label,
          'value': value
        };
        dataObjectArr.push(temp);
      }
    }
    if (dataObjectArr.length > 0) {
      let myChart = new Chart(canvas, {
        type: 'line',
        data: {
          labels: dataObjectArr[0].label,
        },
      });
      for (let i = 0; i < dataObjectArr.length; i++) {
        let data = {
          label: dataTypeArr[i],
          data: dataObjectArr[i].value,
          backgroundColor: 'transparent',
          borderColor: colors[i],
          borderWidth: 1
        };
        myChart.data.datasets.push(data);
      }
      myChart.update();
    }
  }
}