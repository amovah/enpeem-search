'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enpeemSearch = function enpeemSearch(pack) {
  var limit = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
  var skip = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

  var URL = 'https://www.npmjs.com';
  var METHOD = '/search?q=' + pack;

  return new Promise(function (resolve, reject) {
    (0, _request2.default)(URL + METHOD, function (err, res, body) {
      var $ = _cheerio2.default.load(body);
      var results = [];

      while (skip < 20 && results.length < limit) {
        var base = '.search-results > li:nth-child(' + (skip + 1) + ')';

        if ($(base).length) {
          results.push({
            name: $(base + ' .name').text(),
            author: $(base + ' .author').text(),
            description: $(base + ' .description').text(),
            stars: $(base + ' .stars').text(),
            version: $(base + ' .version').text().slice(1),
            url: URL + $(base + ' .name').attr('href')
          });
        }

        ++skip;
      }

      results.length ? resolve(results) : reject();
    });
  });
};

exports.default = enpeemSearch;
module.exports = exports['default'];