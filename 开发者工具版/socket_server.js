(function () {
    const WebSocketServer = require('ws').Server;
    const ws = new WebSocketServer({
        port: 8282
    })
    ws.on('connection', (ws) => {
        console.log('服务器连接成功');
        //接收小游戏发送消息
        ws.on('message', (msg) => {
            console.log(msg);
            //这里没传data  但是浏览器会默认添加一个data
            ws.send('{ "name": "胜天半子丶", "age": "3" }');
        });
    });
})();