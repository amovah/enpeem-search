#enpeem-search

Search npm packages with web scraping and without indexing all npm packages

##Usage

`search(package_name [,limit [,offset]]).then(function(result){});`

##Example
```
npm install enpeem-search

var search = require('enpeem-search');
search('express').then(function(result) {
  console.log(result);  
});
/* result:
  [ { name: 'express',
    author: 'dougwilson',
    description: 'Fast, unopinionated, minimalist web framework',
    stars: '947',
    version: '4.13.0',
    html_url: 'https://www.npmjs.com/package/express' } ]
*/
```
