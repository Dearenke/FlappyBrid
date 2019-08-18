import { Pencil } from "./Pencil.js";
import { Sprite } from "../base/Sprite.js";

//ES6 没有抽象类
export class UpPencil extends Pencil{
    constructor(top) {
        const image = Sprite.getImage('pencilUp');
        super(image, top);
    }
    draw() {
        this.y = this.top - this.height;
        super.draw();
    }
}