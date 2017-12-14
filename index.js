const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

require.extensions['.html'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const dom = new JSDOM(require('./templates/first.html'));

console.log(dom.window.document.querySelector("#change").textContent);
dom.window.document.querySelector("#change").textContent = `"Бягай!" е един от големите хитове на независимото кино за тази година. Режисьор и сценарист на филма е Джордан Пийл, който загърбва скечовете, за да създаде този хорър. В главните роли са Даниел Калуя и Алисън Уилямс, които с напредването на сюжета разкриват ужасяваща расова конспирация. Освен брилянтната актьорска игра, другият най-голям плюс е, че филмът определено успява да държи зрителя в напрежение чак до финалните надписи.`
console.log(dom.window.document.querySelector("#change").textContent);
const html  = dom.window.document.documentElement.outerHTML;
var options = { "format": 'Letter', "orientation": "landscape", "quality": "100", "dpi": 300};
var pdf = require('html-pdf');
/*pdf.create(html, options).toFile('./pages/businesscard.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});*/

/*pdf.create(html, options).toStream(function(err, stream){
    stream.pipe(fs.createWriteStream('./pages/businesscard.pdf'));
});*/
var htmlToPdf = require('html-to-pdf');
/*
htmlToPdf.setInputEncoding('UTF8');
htmlToPdf.setOutputEncoding('UTF8');
htmlToPdf.convertHTMLString(html, './pages/first.pdf',
    function (error, success) {
        if (error) {
            console.log('Oh noes! Errorz!');
            console.log(error);
        } else {
            console.log('Woot! Success!');
            console.log(success);
        }
    }
);*/


// var fs = require('fs')
var conversion = require("phantom-html-to-pdf")();
conversion({ html: html }, function(err, pdf) {
    var output = fs.createWriteStream('./pages/first.pdf');
    console.log(pdf.logs);
    console.log(pdf.numberOfPages);
    // since pdf.stream is a node.js stream you can use it
    // to save the pdf to a file (like in this example) or to
    // respond an http request.
    pdf.stream.pipe(output);
});