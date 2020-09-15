export default class StockInfo {
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
    let urlCompany = `https://sandbox.iexapis.com/stable/stock/${symbol}/company?token=${process.env.API_KEY}`;
    const responseCompany = await StockInfo.makeApiCall(urlCompany);
    let urlLogo = `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=${process.env.API_KEY2}`;
    const responseLogo = await StockInfo.makeApiCall(urlLogo);
    let urlQuote = `https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`;
    const responseQuote = await StockInfo.makeApiCall(urlQuote);
    // console.log(responseCompany);
    // console.log(responseLogo);
    // console.log(responseQuote);
    if (responseCompany && responseLogo && responseQuote) {
      let result = {
        ceo: responseCompany.CEO,
        description: responseCompany.description,
        companyName: responseCompany.companyName,
        symbol: responseCompany.symbol,
        exchange: responseCompany.exchange,
        industry: responseCompany.industry,
        website: responseCompany.website,
        tags: responseCompany.tags,
        city: responseCompany.city,
        state: responseCompany.state,
        logo: responseLogo.url,
        change: responseQuote.change,
        changePercent: responseQuote.changePercent,
        high: responseQuote.high,
        highTime: responseQuote.highTime,
        iexRealtimePrice: responseQuote.iexRealtimePrice,
        iexLastUpdate: responseQuote.iexLastUpdated,
        low: responseQuote.low,
        lowTime: responseQuote.lowTime,
        marketCap: responseQuote.marketCap,
        peRatio: responseQuote.peRatio,
        previousClose: responseQuote.previousClose,
        week52High: responseQuote.week52High,
        week52Low: responseQuote.week52Low,
        ytdChange: responseQuote.ytdChange
      };
      return result;
    } else {
      console.log('error wrong symbol');
      return [];
    }
  }









}
//`https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${process.env.API_KEY}`
//`https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=${process.env.API_KEY}`
//`https://sandbox.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.API_KEY}`




// "week52High"\
// "week52Low"
// marketCap
// "ytdChange"
// changePercent"
// "latestPrice":
// "high"//daily or alltime
// "symbol": 
// "companyName": 