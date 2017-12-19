'use strict';

const request = require('request');

const quoteMachine = function (req, res) {
  res.render('quote', { title: 'Quote Machine' });
};

const nextQuote = function (req, res) {
    var options = {
        url : 'http://api.forismatic.com/api/1.0/',
        form : {
            method : 'getQuote',
            format : 'json',
            lang : 'en'
        }
    };

    var sanitize = function(data) {
        return data.replace(/\\/g, '')
            .replace(/\s+"/g, '"')
            .replace(/"\s+/g, '"')
            .replace(/(\w+\s*[^:]\s*)["]{2,}/g, '$1"')
            .replace(/("quoteText"\s*:\s*".*?)["](.*?)["](.*"\s*,\s*"quoteAuthor")/, '$1 `$2` $3')
            .replace(/("quoteText"\s*:\s*".*?)["](.*"\s*,\s*"quoteAuthor")/, '$1$2');
    }

    var callback = function (err, response, body) {

        if (err) {
            console.error('unable to connect to forismatic ' + err);
            res.status(500).send('Unable to connect to quotes server. Please try again.');
            return;
        }

        console.log(body);
        try {
            var data = JSON.parse(sanitize(body));
            var author = data['quoteAuthor'].trim() || 'Unknown';
            res.status(200).json({quote: data['quoteText'].trim(), author: author});
        } catch (err) {
            console.error('error in parsing string to Json object ' + err);
            res.status(500).send('Temporary error occurred. Please try again.');
        }
    }

    request.post(options, callback);
};

module.exports = {
    quoteMachine : quoteMachine,
    nextQuote : nextQuote
};
