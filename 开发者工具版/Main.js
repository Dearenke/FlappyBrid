// 初始化整个游戏的精灵,作为游戏开始的入口.
import { ResourceLoader } from './js/base/ResourceLoader.js'
import { Director } from "./js/Director.js";
import { DataStore } from './js/base/DataStore.js'  
import { BackGround } from './js/runtime/BackGround.js'  
import { Land } from './js/runtime/Land.js'  
import { Birds } from './js/player/Birds.js';
import { StartButton } from './js/player/StartButton.js';
import { Score } from './js/player/Score.js';
import { ApiExamples } from './js/ApiExamples.js';


export class Main{
    constructor() {
      //区别1 ：document.getElementById('game_canvas') ==> wx.createCanvas()
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.dataStore.Test = '这里测试看看有用吗';
        this.dataStore.Test2 = '这里测试看看有用吗';
        this.dataStore.Test3 = '这里测试看看有用吗';
        this.director = Director.getIntance();
      const loader = ResourceLoader.create();
        //把属性循环到
      loader.onLoaded(map => this.onResourceFirstLoaded(map));
    };
    
    createBackgroundMusic(){
      const bgm = wx.createInnerAudioContext();
      bgm.autoplay = true;
      bgm.loop = true;
      bgm.src = 'audio/bgm.mp3';
    };
  onResourceFirstLoaded(map) {
      //给DataStore实例添加属性
        this.dataStore.canvas = wx.createCanvas();
        this.dataStore.ctx = this.ctx;//长期保留在内存中,把它放在类变量中,永远保存
        this.dataStore.res = map;//长期保留在内存中 
        this.dataStore['自己添加的属性'] = {'真的假的':'是真的'};
        this.createBackgroundMusic();
        const example = new ApiExamples();
        example.getInfo();
    example.getSetting();
    example.httpExample();
        this.init();
    }
    init() { 
        this.director.isGameOver = false;
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            .put('startButton', StartButton)
            .put('score',Score)
            // .put('startButton',StartButton)
         //初始化BackGround
        // let background = new BackGround(this.ctx, map.get('background'));
        // background.draw();
        this.director.createPencil();
        this.director.run();//运行导演的所有方法
        this.registerEvent();
    }
    registerEvent() {
        wx.onTouchStart(()=>{
          //阻止事件冒泡
          if (this.director.isGameOver) {
            console.log('游戏开始');
            this.init();
          } else {
            this.director.birdsEvent();
          }
            //箭头函数的this本质是Main类 this是指向外部的
        })
    }
}