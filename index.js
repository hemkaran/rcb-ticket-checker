const notifier = require('node-notifier');
const request = require('request');
const opn = require('opn');

const sendRequest = function () {
  console.log('Checking for new match tickets');
  var options = { method: 'POST',
    url: 'https://tickets.royalchallengers.com/MatchList.aspx/LoadEvents',
    headers:
      { 'Postman-Token': 'fd21d9d8-a69e-4bed-b43f-f516eb9bdc94',
        referer: 'https://tickets.royalchallengers.com/',
        authority: 'tickets.royalchallengers.com',
        'cache-control': 'no-cache,no-cache',
        accept: 'application/json, text/javascript, */*; q=0.01',
        'content-type': 'application/json; charset=UTF-8',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36',
        pragma: 'no-cache',
        cookie: 'ASP.NET_SessionId=i1qvzme5darxmuietq50dceb; _ga=GA1.2.840425491.1553507249; _gid=GA1.2.565277660.1553507249; _gcl_au=1.1.1583152698.1553507249; _fbp=fb.1.1553507249587.1364902644; AMP_TOKEN=%24NOT_FOUND; _ga=GA1.3.840425491.1553507249; _gid=GA1.3.565277660.1553507249; _gat_gtag_UA_135480190_1=1',
        'x-requested-with': 'XMLHttpRequest',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8,hi;q=0.7',
        'accept-encoding': 'gzip, deflate, br',
        origin: 'https://tickets.royalchallengers.com' },
    body: '{"EventGroup": "Season-12" }' };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    
    const data = JSON.parse(body);
    if (data.d.length > 2 && data.d[0].EVENT_CODE !== 3) {
      notifier.notify({
        'title': 'RCB Tickets',
        'subtitle': 'Daily Maintenance',
        'message': 'New match ticket arrived!!',
        'icon': 'dwb-logo.png',
        'contentImage': 'blog.png',
        'sound': 'ding.mp3',
        'wait': true,
        closeLabel: 'Dismiss',
        actions: 'Buy Now',
      }, (err, response) => {
        if(response === 'activate') {
          opn('https://tickets.royalchallengers.com/BuyTickets/Season-12');
        }
      });
    } else {
      console.log('Sorry!!! No new match tickets');
    }
  });
};

sendRequest();

// Check for every 5 min
setInterval(sendRequest, 300000);
