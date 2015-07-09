'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

exports['default'] = function (pack) {
  var limit = arguments[1] === undefined ? 1 : arguments[1];
  var offset = arguments[2] === undefined ? 0 : arguments[2];

  var URL = 'https://www.npmjs.com/';
  var METHOD = 'search?q=' + pack;
  return new Promise(function (resolve, reject) {
    (0, _request2['default'])(URL + METHOD, function (err, res, body) {
      var $ = _cheerio2['default'].load(body);
      var Data = function Data(index) {
        try {
          var BASE = '.search-results > li:nth-child(' + index + ') >';
          var _result = {};
          _result.name = $(BASE + ' div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').attr('href').split('/')[2];
          _result.author = $(BASE + ' div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)').attr('href').split('/~')[1];
          _result.description = $(BASE + ' div:nth-child(1) > p:nth-child(2)').text();
          _result.stars = $(BASE + ' div:nth-child(1) > p:nth-child(3) > span:nth-child(1)').text();
          _result.version = $(BASE + ' div:nth-child(1) > p:nth-child(3) > span:nth-child(2)').text().slice(1);
          _result.url = URL + 'package/' + _result.name;
          return _result;
        } catch (e) {
          return;
        }
      };
      var result = [];
      while (offset < 20 && result.length < limit) {
        if (Data(offset + 1)) result.push(Data(offset + 1));
        ++offset;
      }
      result.length ? resolve(result) : reject();
    });
  });
};

module.exports = exports['default'];

