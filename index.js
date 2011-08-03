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
  var url, body, type;
  
  if(data.html) {
    url = 'http://mailgun.net/api/messages.eml?servername=' + data.mailgun.server;
    var lines = [data.from, Array.isArray(data.to) ? data.to.join(', ') : data.to, ''];
    lines.push('From: ' + lines[0]);
    lines.push('To: ' + lines[1]);
    lines.push('Content-Type: text/html;charset=utf-8');
    lines.push('Subject: ' + (data.subject || ''));
    lines.push('');
    lines.push(data.html || '');
    body = lines.join('\n');
    type = 'text/plain';

  } else {
    url = 'http://mailgun.net/api/messages.txt';
    type = 'application/x-www-form-urlencoded';
    body = params({
      servername: data.mailgun.server,
      sender: data.from,
      recipients: Array.isArray(data.to) ? data.to.join(', ') : data.to,
      subject: data.subject || '',        
      body: data.text || ''
    });
  }
  
  var headers = {
    'Content-Type': type,
    'Authorization': 'Basic ' + encode('api:' + data.mailgun.key)
  };

  var options = {
    method: 'POST',
    url: url, 
    body: [body], 
    headers: headers
  };
  
  var response = new HttpClient(options).finish();
  if(response.status != 201) {
    throw new Error(response.body); 
  }
}