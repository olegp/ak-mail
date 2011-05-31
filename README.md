# Akshell Mail

* This package provides a simple interface to [Mailgun](http://www.mailgun.com) for sending email via Akshell.
* It is modelled after [Ringo Mail](https://github.com/robi42/ringo-mail/)

## Usage

Sending an email is as simple as:

    var mail = require('mail');
    mail.send({ 
      mailgun: {server: 'akshell.mailgun.org', key: 'key-12345'}, 
      from: 'test@akshell.com', to: 'test@akshell.com', 
      subject: 'hello', 
      text: 'world'
    });

The `server` and `key` parameters are available via your [Mailgun control panel](http://www.mailgun.com).

To email multiple recipients, set `to` to be an array of Strings.


