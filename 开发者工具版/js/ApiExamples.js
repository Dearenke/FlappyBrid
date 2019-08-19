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
};