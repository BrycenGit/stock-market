export default class Search {
  //https://cloud.iexapis.com/stable/search/tesla?token=pk_6a652ab6ada0484ea2f4655d25029df1
  //https://sandbox.iexapis.com/stable/search/apple?token=Tsk_45b9e84525e046ae8e38888656639cab
  static async makeApiCall(input) {
    try {
      const url = `https://cloud.iexapis.com/stable/search/${input}?token=${process.env.API_KEY2}`;//`https://sandbox.iexapis.com/stable/search/${input}?token=${process.env.API_KEY}`;
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
    //console.log(response);
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
      console.log('error wrong symbol');
      return result;
    }
  }



}