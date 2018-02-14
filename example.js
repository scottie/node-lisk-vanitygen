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
    messageInterval: 1000,
    debugMode: true
});

onzAddGen.run((data) => {
    let txt = `
Pattern:    ${data.pattern}
Address:    ${data.address}
Passphrase: ${data.passphrase}
`;
    onzAddGen.log(txt);
 
    fs.appendFileSync('found.txt', txt, (error) => {});
}, (data) => {
    let txt = `\r\rCount: ${data.count} | Time: ${data.time} s. | Avg: ${data.avg} keys/s | Found: ${data.foundCount}`;
    process.stdout.write(txt); // to back cursor to the start of the line (in console.log doesn't work)
});
