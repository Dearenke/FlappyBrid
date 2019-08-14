import { Sprite } from '../base/Sprite.js';

export class Land extends Sprite{
    constructor() {
        //不能用this 用静态方法 
        const image = Sprite.getImage('background');
        super( image,
            0, 0,//剪裁的位置
            image.width, image.height, //剪裁多少
            0, 0,//放置的位置
            window.innerWidth, window.innerHeight//使用多少
        )
    }
    draw() {
        this.landX = this.landX + this.landSpeed;
        super.draw(this.img,
        this.srcX,
        this.srcY,
        this.srcW,
        this.srcH,
        -this.landX,
        this.y,
        this.width,
        this.height)
    }
}