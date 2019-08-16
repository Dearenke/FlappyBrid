// 初始化整个游戏的精灵,作为游戏开始的入口.
import { ResourceLoader } from './js/base/ResourceLoader.js'
import { Director } from "./js/Director.js";
import { DataStore } from './js/base/DataStore.js'  
import { BackGround } from './js/runtime/BackGround.js'  
import { Land } from './js/runtime/Land.js'  
import { Birds } from './js/player/Birds.js';
import { StartButton } from './js/player/StartButton.js';


export class Main{
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getIntance();
        const loader = ResourceLoader.create();
        loader.onLoaded (map => this.onResourceFirstLoaded(map));
    };
    
    onResourceFirstLoaded(map){
        this.dataStore.ctx = this.ctx;//长期保留在内存中,把它放在类变量中,永远保存
        this.dataStore.res = map;//长期保留在内存中 
        this.init();
    }
    init() { 
        this.director.isGameOver = false;
        this.dataStore
            .put('pencils', [])
            .put('background', BackGround)
            .put('land', Land)
            .put('birds', Birds)
            // .put('startButton',StartButton)
         //初始化BackGround
        // let background = new BackGround(this.ctx, map.get('background'));
        // background.draw();
        this.director.createPencil();
        this.director.run();
    }


}