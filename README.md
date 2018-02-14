ONZ Vanity Generator
===================

Fast and First, ONZcoin Vanity address generator!



Getting Started
---------------

Install `onz-vanity-gen` into your project:

```bash
npm install onz-vanity-gen
```

Create a `app.js` file and add the following:

```js
const onzAddGen = require('onz-vanity-gen');

let onzAddGen = new ONZVanitygen({
    pattern: 123456
});

onzAddGen.run((data) => {
    console.log('found: ', data);
}, (data) => {
    console.log('status: ', data);
});
```
Run your `app.js` file:

```bash
node app.js
```

API
---

```js
let onzAddGen = new ONZVanitygen(config);
```

`config` properties:

Name            | Default | Type                       | Required | Description
----------------|---------|----------------------------|----------|------------
pattern         | -       | char or array of chars     | Yes      | Pattern(s) to find.
continue        | true    | boolean                    | No       | Should continue after first found?
messageInterval | 1000    | number                     | No       | Interval in ms between status callback.
debugOutput     | false   | boolen                     | No       | true or false for debug output.

```js
onzAddGen.run(foundCallback, statusCallback);
```

Name           | Type     | Required | Description
---------------|----------|----------|------------
foundCallback  | function | Yes      | Callback when key was found.
statusCallback | function | No       | Callback with status information.

Example
-------

Example is found on github or in your main fodler as example.js
https://github.com/scottie/onz-vanity-gen.example.js

```js
/*
    Example ONZ Vanity Generator
*/
//CONFIG
var patterns = ["666", "god", "scott", "luv", "onz", "123", "abc", "ABC", "GOD", "SCOTT", "LuV", "0nZ"];
// 3 is good, 6 is hard, anything else is IMPOSSIBLE :)


//LEAVE BE
//////////////////////////////////
const ONZVanitygen = require('./');
const fs = require('fs');

let onzAddGen = new ONZVanitygen({
    pattern: patterns,
    continue: true,
    messageInterval: 5000,
    debugMode: true
});

onzAddGen.run(function(data){
    let txt = `
    Pattern:    ${data.pattern}
    Address:    ${data.address}
    Passphrase: ${data.passphrase}
    DebugMode: ${data.debugMode}
    `;
});


fs.appendFileSync('out.txt', txt, function(error){
    if(!error){
        let txt = `\r\rCount: ${data.count} | Time: ${data.time} s. | Avg: ${data.avg} keys/s | Found: ${data.foundCount}`;
        process.stdout.write(txt); // to back cursor to the start of the line (in console.log doesn't work)
    }

});


```

To run the example:
```bash
npm install
npm run example
```


License
-------

MIT © [Scott Lindh](https://github.com/scottie)
MIT © [Radosław Wiliński](https://github.com/rwilinski)