import { Sprite } from "../base/Sprite.js";

export class StartButton extends Sprite{
    constructor() {
        const image = Sprite.getImage('startButton');
        //super就是Sprite的构造器
        super(image,
            0, 0,
            image.width, image.height,
            (window.innerWidth - image.width)  / 2,(window.innerHeight- image.height) / 2.5,
            image.width, image.height
        )
    }
   
}