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
    run() {
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
            let timer = requestAnimationFrame(() => { this.run() })
            this.dataStore.put('timer', timer);
        } else {
              // 保证浏览器不会有额外的线程执行动画
            cancelAnimationFrame(this.dataStore.get('timer'));
            console.log('游戏结束');
        }
       
    }

}