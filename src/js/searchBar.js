export default class Search {
  static async makeApiCall(input) {
    try {
      const url = `https://cloud.iexapis.com/stable/search/${input}?token=${process.env.API_KEY2}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    } catch (error) {
      return error.message;
    }
  }

  static async getData(input) {
    const response = await Search.makeApiCall(input);
    let result = [];
    if (response.length > 0) {
      for (let i = 0; i < response.length; i++) {
        let temp = {
          'symbol': response[i].symbol,
          'securityName': response[i].securityName,
          'securityType': response[i].securityType,
          'region': response[i].region,
          'exchange': response[i].exchange
        };
        if (temp.region.toLowerCase() === 'us') {
          result.push(temp);
        }
      }
      return result;
    } else {
      return result;
    }
  }



}