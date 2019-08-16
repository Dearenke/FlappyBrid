import { DataStore } from './base/DataStore.js'  
import { UpPencil } from './runtime/UpPencil.js';
import { DownPencil } from './runtime/DownPencil.js';
export class Director{
    constructor() {
        this.dataStore = DataStore.getInstance();
        //初始化speed;
        this.moveSpeed = 2;
    }
    static getIntance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        const top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }
    birdsEvent() {//点击才触发
        for (let i = 0; i <= 2; i++){
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i]; //y[i]变为birdsY[i]的上一个数据
        }
        //因为速度是越来越大的 所以要让offsetY置零
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(bird, pencil) {
        const strike = false;
        if (bird.top > pencil.bottom ||
            bird.bottom < pencil.top ||
            bird.left > pencil.right ||
            bird.right < pencil.left
        ) {
            strike = true
        }
        //false的话返回true 继续运行
        return !strike
    }
    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        if (birds.birdsY[0] + birds.clippingHeight[0] >= land.y) {
            this.isGameOver = true;
            return;
        }
        //小鸟边界模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.clippingHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.clippingWidth[0]
        };
        //铅笔边界模型
        const length = pencils.length
        for (let i = 0; i < length; i++){
            const pencil = pencils[i];
            const pencilsBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            if (Director.isStrike(birdsBorder, pencilsBorder)) {
                console.log('游戏结束');
                this.isGameOver = true;
                return;
            }
        }
        
    }
    //运行所有的方法
    run() {
        this.check();
        //终止逻辑 isGameOver是false
        if (this.isGameOver === false) {
            this.dataStore.get('background').draw();
            const pencils = this.dataStore.get('pencils');
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                //将数组的第一个元素推出去,数组个数减一.
                pencils.shift();
                pencils.shift();
            }
            if (pencils[0].x < (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
                this.createPencil();
            }
            //forEach三个参数 数组元素,角标,数组本身
            this.dataStore.get('pencils').forEach((element) => {
                element.draw();
            });
            this.dataStore.get('land').draw();
            //requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行
            this.dataStore.get('birds').draw();
            let timer = requestAnimationFrame(() => { this.run() })
            this.dataStore.put('timer', timer);
        } else {
              // 保证浏览器不会有额外的线程执行动画
            cancelAnimationFrame(this.dataStore.get('timer'));
            console.log('游戏结束');
        }
       
    }

}