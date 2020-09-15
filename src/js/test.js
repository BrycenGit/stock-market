export default class Carousel {
  static async makeApiCall(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getData(symbol) {
    let url = `https://sandbox.iexapis.com/stable/stock/market/batch?symbols=${first},${second},${third},${fourth},${fifth}&types=quote,news,chart,logo&range=1m&last=10&token=${process.env.API_KEY}`;
    const response = await StockInfo.makeApiCall(url);

    // console.log(response);

    if (response) {
      let result = {

      };
      return result;
    } else {
      console.log('error wrong symbol');
      return [];
    }
  }