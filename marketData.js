// Provider adapter: keep provider-specific API calls on the server, never in the browser.
// Configure MARKET_DATA_PROVIDER and MARKET_DATA_BASE_URL only after reviewing your API docs.
export const demoStocks=[
 {symbol:'RELIANCE',name:'Reliance Industries',price:1284.65,change:1.42,sector:'Energy'},
 {symbol:'TCS',name:'Tata Consultancy Services',price:3988.20,change:-0.63,sector:'IT'},
 {symbol:'HDFCBANK',name:'HDFC Bank',price:1762.40,change:0.86,sector:'Banking'},
 {symbol:'INFY',name:'Infosys',price:1544.90,change:1.18,sector:'IT'},
 {symbol:'ICICIBANK',name:'ICICI Bank',price:1298.75,change:0.52,sector:'Banking'},
 {symbol:'TATAMOTORS',name:'Tata Motors',price:684.30,change:-1.21,sector:'Auto'},
 {symbol:'ITC',name:'ITC',price:432.15,change:0.34,sector:'FMCG'},
 {symbol:'BHARTIARTL',name:'Bharti Airtel',price:1865,change:2.06,sector:'Telecom'},
 {symbol:'SBIN',name:'State Bank of India',price:812.50,change:0.71,sector:'Banking'},
 {symbol:'WIPRO',name:'Wipro',price:294.60,change:-0.29,sector:'IT'}
];
export async function getQuotes(){
 // Intentionally returns clearly labeled demo data until a vendor-specific adapter is implemented.
 // Do not assume a generic API URL works: quote endpoints and symbol formats vary by provider.
 return {provider:'demo',isLive:false,quotes:demoStocks};
}
export async function getQuote(symbol){
 const result=await getQuotes();return result.quotes.find(s=>s.symbol===symbol.toUpperCase())||null;
}
