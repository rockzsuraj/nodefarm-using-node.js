const fs = require('fs')


fs.readFile('./text/start.txt', 'utf-8', (err, data1) => {
    console.log('data1', data1);
    fs.readFile(`./text/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log('data2', data2);
        fs.readFile(`./text/append.txt`, 'utf-8', (err, data3) => {
            console.log(data3);
            fs.writeFile('./text/final.txt',`${data2} \n${data3}` , 'utf-8', (err) => {
                console.log('file is written successfully');

            })
        })
    })
})
console.log('File reading');

