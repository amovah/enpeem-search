import request from 'request';
import cheerio from 'cheerio';

const enpeemSearch = (pack, limit = 1, skip = 0) => {
  const URL = `https://www.npmjs.com`;
  const METHOD = `/search?q=${pack}`;

  return new Promise((resolve, reject) => {
    request(URL + METHOD, (err, res, body) => {
      const $ = cheerio.load(body);
      let results = [];

      while (skip < 20 && results.length < limit) {
        let base = `.search-results > li:nth-child(${skip + 1})`;

        if ($(base).length) {
          results.push({
            name:  $(`${base} .name`).text(),
            author:  $(`${base} .author`).text(),
            description:  $(`${base} .description`).text(),
            stars:  $(`${base} .stars`).text(),
            version: $(`${base} .version`).text().slice(1),
            url: URL + $(`${base} .name`).attr('href')
          });
        }

        ++skip;
      }

      results.length ? resolve(results) : reject();
    });
  });
};

export default enpeemSearch;
