var HttpClient = require('httpclient').HttpClient;
var encode = require('base64').encode;

function params(object) {
  var string = [];
  for(var key in object) {
     string.push(key + "=" + encodeURIComponent(object[key]));
  }
  return string.join("&");
}

/**
 * Does the actual job of sending mail.
 *
 * Usage example:
 *
 *     mail.send({from: 'jdoe@example.com', to: 'hugo@example.com', text: 'Hi'});
 *
 * @param {Object} data the data of mail to send
 */
exports.send = function(data) {
  var body = {
    servername: data.mailgun.server,
    sender: data.from,
    recipients: Array.isArray(data.to) ? data.to.join(', ') : data.to,
    subject: data.subject || '',        
    body: data.text || ''
  };
  
  var headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + encode('api:' + data.mailgun.key)
  };

  var options = {
    method: 'POST',
    // TODO add raw/html mail support
    // https://github.com/mailgun/mailgun.http/blob/master/samples/sending-mail.py
    url: 'http://mailgun.net/api/messages.txt', 
    body: [params(body)], 
    headers: headers
  };
  
  var response = new HttpClient(options).finish();
  if(response.status != 201) {
    throw new Error(response.body); 
  }
}