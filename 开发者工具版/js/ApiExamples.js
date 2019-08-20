export class ApiExamples {
  getInfo(){
    let button = wx.createUserInfoButton({
      type: 'text',
      text: '获取用户信息',
      style: {
        left: 100,
        bottom: 36,
        width: 200,
        height: 40,
        lineHeight: 40,
        backgroundColor: '#ff0000',
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        borderRadius: 4
      }
    })
    button.onTap((res) => {
      console.log(res)
    })
  };
  getSetting(){
      wx.getSetting({
      success: res=> {
        console.log(res);
      }
    })
  };
  httpExample() {
    // wx.request({
    //   url: 'http://127.0.0.1:8181/',
    //   method: 'GET',
    //   success: (res)=>{
    //     console.log(res);
    //     //根据服务器的指示做相应的事件
    //   }
    // })

    wx.request({
      url: 'http://127.0.0.1:8181/',
      method: 'POST',
      data: {name:'李晨',age:'20'},
      success: (res)=>{
        console.log(res);
        //根据服务器的指示做相应的事件
      }
    })
  }
  socketExample(){
    wx.connectSocket({
      url: 'ws://127.0.0.1:8282',
      success: () => {
        console.log('连接客户端成功');
      }
    })
    //发送数据必须在wx.onSocketOpen中进行
    wx.onSocketOpen(() => {
      wx.sendSocketMessage({
        //必须在服务端使用ws.on('message')才有用
        data:'这个是来自客户端的消息'
      })
      //监听服务器的消息
      wx.onSocketMessage((msg) => {
        // const a = '{ "name": "胜天半子丶", "age": "3" }';
        const stringify = JSON.stringify(msg)
        // console.log('msg',typeof msg );//测出msg是object 所以会报错
        const tf = typeof msg == 'string' ? JSON.parse(msg) : msg;
        const parse = JSON.parse(msg.data);
        // 找到原因了  是msg里面还需要在.data一下成为字符串
        console.log('parse',parse);
        console.log('name',parse.name);
      })
    })
  }
  downLoad(){
    wx.downloadFile({
      url:'http://img3.imgtn.bdimg.com/it/u=495625508,3408544765&fm=26&gp=0.jpg',
      success: (dl) => {
        console.log(JSON.stringify(dl.tempFilePath));
      }
    })
  }
};