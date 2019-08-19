(function () {
    'use strict';
    const http = require('http');
    http.createServer((request, response) => {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk;
        });
        request.on('end', () => {
            // response.write("{ name: '小黑', age: '3' }");
            const arr = [1, 2, 3];
            // response.send(arr);
            response.end('这是服务器返回的数据');
            // response.json({name:'小黑',age:'3'})
            console.log('body', body);
        })
    }).listen(8181);
})();