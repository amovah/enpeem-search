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
        var BASE = '.search-results > li:nth-child(' + index + ') >';
        var result = {};

        result.name = $('' + BASE + ' div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)').attr('href').split('/')[2];
        result.author = $('' + BASE + ' div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)').attr('href').split('/~')[1];
        result.description = $('' + BASE + ' div:nth-child(1) > p:nth-child(2)').text();
        result.stars = $('' + BASE + ' div:nth-child(1) > p:nth-child(3) > span:nth-child(1)').text();
        result.version = $('' + BASE + ' div:nth-child(1) > p:nth-child(3) > span:nth-child(2)').text().slice(1);
        result.url = '' + URL + 'package/' + result.name;

        return result;
      };
      try {
        var result = [];
        while (offset < 20 && result.length < limit) {
          result.push(new Data(offset + 1));
          ++offset;
        }
        resolve(result);
      } catch (e) {
        reject(new Error('Package not found'));
      }
    });
  });
};

module.exports = exports['default'];
