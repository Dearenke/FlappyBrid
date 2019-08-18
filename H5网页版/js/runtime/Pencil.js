import { Sprite } from "../base/Sprite.js";
import { Director } from "../Director.js";

export class Pencil extends Sprite{
    constructor(image, top) {
        //super指向父类的构造器
        super(image,
            0, 0,
            image.width, image.height,
            // 刚好放在右侧看不到的地方
            window.innerWidth, 0,
            image.width, image.height);
        this.top = top;
        this.moveSpeed = 2; 
    }
    draw() {
        this.x = this.x - this.moveSpeed;
        super.draw(this.img,
            0, 0,
            this.img.width, this.img.height,
            this.x, this.y,
            this.img.width, this.img.height
        )
    }
}