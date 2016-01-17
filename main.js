import request from 'request';
import cheerio from 'cheerio';

const enpeemSearch = (pack, limit = 1, skip = 0) => {
  const URL = `https://www.npmjs.com/`;
  const METHOD = `search?q=${pack}`;

  return new Promise((resolve, reject) => {
    request(URL + METHOD, (err, res, body) => {
      const $ = cheerio.load(body);
      let results = [];

      while (skip < 20 && results.length < limit) {
        let base = `.search-results > li:nth-child(${skip + 1})`;

        if ($(base).length) {
          results.push({
            name:  $(`${base} div:nth-child(1) > h3:nth-child(1) >
            a:nth-child(1)`).attr('href').split('/')[2],
            author:  $(`${base} div:nth-child(1) > h3:nth-child(1) >
            a:nth-child(2)`).attr('href').split('/~')[1],
            description:  $(`${base} div:nth-child(1) > p:nth-child(2)`).text(),
            stars:  $(`${base} div:nth-child(1) > p:nth-child(3) >
            span:nth-child(1)`).text(),
            version: $(`${base} div:nth-child(1) > p:nth-child(3) >
            span:nth-child(2)`).text().slice(1)
          });

          let item = results[results.length - 1];
          item.url = `${URL}package/${item.name}`;
        }

        ++skip;
      }

      results.length ? resolve(results) : reject();
    });
  });
};

export default enpeemSearch;
