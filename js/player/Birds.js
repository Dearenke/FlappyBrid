import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";
//循环渲染三只小鸟,其实是    循环渲染图片的三个部分（canvas特性） 不用精灵图(可以省去resource 和resourceloader)是为了提高开发效率 
export class Birds extends Sprite{
    constructor() {
        const ctx = DataStore.getInstance();
        console.log('this.ctx',ctx );
        const image = Sprite.getImage('birds');
        super(image,
            0, 0,
            image.width, image.height,
            0, 0,
            image.width, image.height);
        //小鸟上下边距 左右边距是9 宽34 高24
        this.clippingX = [
            9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18];//没有第三个是翅膀
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        //const 对外不可见
        const birdX = window.innerWidth / 4;//单只小鸟初始X坐标 
        this.birdsX = [birdX, birdX, birdX];//三只小鸟初始X坐标
        this.birdY = window.innerHeight / 2;//初始Y坐标
        this.birdsY = [this.birdY, this.birdY, this.birdY];
        this.y = [this.birdY, this.birdY, this.birdY];//每只小鸟的Y坐标
        //判断小鸟属于第几只
        this.index = 0;
        this.count = 0; //循环小鸟个数 小鸟从0位=> 1位 => 2位 => 0位
        this.time = 0;//自由落体公式会涉及到时间.
    }
    draw() {
        //切换三只小鸟的速度 
        const speed = 0.2;
        this.count = this.count + speed;
        if (this.index >= 2) {
            this.count = 0;
        }
        //减速器的作用 向下取整
        this.index = Math.floor(this.count);
        //受重力作用
        const offsetUp = 30;
        const g = 0.98 / 2.5;
        const offsetY = (g * this.time * (this.time - offsetUp) ) / 2;
        for (let i = 0; i <= 2; i++){
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time++;
        console.log('test====',this.y[0],this.birdsY[0]);
        //渲染小鸟
        super.draw(
            this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index]);
    }
}