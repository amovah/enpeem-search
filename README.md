# enpeem-search

Search npm packages by web scraping and without indexing all npm packages

## Why should we use this module?

It's good question. I used npm module to search packages, but npm first must indexing all packages then search. some of developers have problem with npm search. So I made a decision to create a module to search package without indexing all package. I use web scraping and site search to search packages.

## Usage

`serach(pkg [[,limit] [,skip]]).then(callback).catch(callback);`

### pkg

type: `String`

required: Yes

It is package name that you want to search for that.

### limit

type: `Number`

required: No

default: `1`

The search result is limited. If you want more results than 1 result change it and increase it.

Note: max value of this argument is 20 because there are only 20 results in a page.

### skip

type: `Number`

required: No

default: `0`

This option, for example if option set to 3, skips 3 results and return result from 4th results.

### then

type: `Function`

required: No

If there is a result or more you can get them with `then` method.

#### callback(result)

type of result: `Array`

result includes objects of the results. The object includes:

1. `name`: name of the package
2. `author`: author of the package
3. `description`: description of the package
4. `stars`: stars of the package
5. `version`: version of the package
6. `url`: URL of the package

### catch

type: `Function`

required: No

If there is no result for the package name, It has been called.

#### callback()

The callback have no argument.

## LICENSE

[MIT](http://mit-license.org/)
