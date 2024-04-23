const http = require('http');
const fs = require('fs');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data);
const tempOverview = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`, 'utf-8')


const server = http.createServer((req, res) => {
    const {query, pathname: pathName} = url.parse(req.url, true);

    if (pathName === '/' || pathName === '/overview') {
        const cardHtml = productData?.map(el => replaceTemplate(tempCard, el)).join('')
        const output = tempOverview.replace(/%PRODUCT_CARDS%/g, cardHtml);
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        res.end(output)
    } else if (pathName === '/product') {
        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product)
        res.writeHead(200, {
            'Content-type': 'text/html',
        })
        
        res.end(output)
    } else if (pathName === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, (err, data) => {
        //     res.writeHead(200, {
        //         'Content-type': 'application/json'
        //     })
        // }
        // )
        res.writeHead(200, {
            'Content-type': 'application/json'
        })
        res.end(data)
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello custom header'
        })
        res.end('<h1>Page not found!</h1>')
    }
})

server.listen(8000, 'localhost', () => {
    console.log('Listening on port 8000');
});