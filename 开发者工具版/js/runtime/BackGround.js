import { Sprite } from '../base/Sprite.js';
import { DataStore } from '../base/DataStore.js';
//根据Sprite创建出一个名为BackGround的类
export class BackGround extends Sprite{
    constructor() {
        //不能用this 用静态方法 
        const image = Sprite.getImage('background');
        super( image,
            0, 0,//剪裁的位置
            image.width, image.height, //剪裁多少
            0, 0,//放置的位置
            DataStore.getInstance().canvas.width, DataStore.getInstance().canvas.height//使用多少
        )
    }
}   