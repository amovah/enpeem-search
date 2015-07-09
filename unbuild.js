import request from 'request';
import cheerio from 'cheerio';

export default function(pack, limit = 1, offset = 0) {
  const URL = `https://www.npmjs.com/`
  const METHOD = `search?q=${pack}`;
  return new Promise((resolve, reject) => {
    request(URL + METHOD, (err, res, body) => {
      const $ = cheerio.load(body);
      const Data = (index) => {
        try {
          const BASE = `.search-results > li:nth-child(${index}) >`;
          let result = {};
          result.name =  $(`${BASE} div:nth-child(1) > h3:nth-child(1) > a:nth-child(1)`).attr('href').split('/')[2];
          result.author =  $(`${BASE} div:nth-child(1) > h3:nth-child(1) > a:nth-child(2)`).attr('href').split('/~')[1];
          result.description =  $(`${BASE} div:nth-child(1) > p:nth-child(2)`).text();
          result.stars =  $(`${BASE} div:nth-child(1) > p:nth-child(3) > span:nth-child(1)`).text();
          result.version = $(`${BASE} div:nth-child(1) > p:nth-child(3) > span:nth-child(2)`).text().slice(1);
          result.url = `${URL}package/${result.name}`;
          return result;
        } catch(e) {
          return;
        }
      }
      let result = [];
      while (offset < 20 && result.length < limit) {
        if (Data(offset + 1)) result.push(Data(offset + 1));
        ++offset;
      }
      result.length ? resolve(result) : reject();
    });
  });
}
