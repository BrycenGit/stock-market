export default class HistoricalData {





  static getDataBySymbol(symbol) {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${process.env.API_KEY}`;
      console.log(url);
      request.onload = function () {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(request.response);
        }
      };
      request.open('GET', url, true);
      request.send();
    });
  }
  static getCloseGraphData(symbol) {
    let result;
    let promise = HistoricalData.getDataBySymbol(symbol);
    promise.then(function (response) {
      const body = JSON.parse(response);
      console.log(body);
      if (body.length > 0) {
        let label = [];
        let close = [];
        for (let i = 0; i < body.length; i++) {
          
          label.push(body[i].label);
          close.push(body[i].close);
        }
        result = {
          'label': label,
          'close': close
        };
        console.log(result);
        //sessionStorage.setItem('result', result);
      
      } else {
        console.log('error wrong symbol');
      }
    }, function (error) {
      console.log(error);
    });
    return new Promise(result);
  }
    
  static async getData(symbol) {
    try {
      const url = `https://cloud.iexapis.com/stable/stock/${symbol}/chart/1m?token=${process.env.API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
  static async getCloseData(symbol){
    const response = await HistoricalData.getData(symbol);
    console.log(response);
    
    if (response.length > 0) {
      let label = [];
      let close = []; 
      for (let i = 0; i < response.length; i++) {
        
        label.push(response[i].label);
        close.push(response[i].close);
      }
      let result = {
        'label': label,
        'close': close
      };
      console.log(result);
      //sessionStorage.setItem('result', result);
      return result;
    } else {
      console.log('error wrong symbol');
    }

  }
  





}