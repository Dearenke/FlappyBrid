// 精灵的基类,负责初始化精灵加载的资源的大小以及位置.
import { DataStore } from './DataStore.js'
export class Sprite{
    constructor(img = null,//要绘制的图片对象
                srcX = 0,// 剪裁的X坐标
                srcY = 0,// 剪裁的Y坐标
                srcW = 0,// 剪裁的宽度
                srcH = 0,// 剪裁的高度
                x = 0, y = 0,//资源在canvas上的摆放位置
                width = 0 , height = 0) {//检查完后,要使用的宽度和大小
        this.dataStore = DataStore.getInstance()            
        this.ctx = this.dataStore.ctx;
        this.img = img;//要绘制的图片对象
        this.srcX = srcX;// 剪裁的X坐标
        this.srcY = srcY;// 剪裁的Y坐标
        this.srcW = srcW;// 剪裁的宽度
        this.srcH = srcH;// 剪裁的高度
        this.x = x;
        this.y = y;//资源在canvas上的摆放位置
        this.width = width;
        this.height = height;
    }
    
    /**
     * img 传入Image对象
     * srcX 要剪裁的起始X坐标
     * srcY 要剪裁的起始Y坐标
     * srcW 剪裁的宽度
     * srcH 剪裁的高度
     * x 放置的x坐标
     * y 放置的y坐标
     * width 要使用的宽度
     * height 要使用的高度
     */
    //让Sprite获取Image 静态方法直接获取实例 不需要this了
    static getImage(key) {
        return DataStore.getInstance().res.get(key);
    } 

    draw(img = this.img,
        srcX = this.srcX,
        srcY = this.srcY,
        srcW = this.srcW,
        srcH = this.srcH,
        x = this.x,
        y = this.y,
        width = this.width,
        height = this.height) {
        this.ctx.drawImage(
           img,
           srcX,
           srcY,
           srcW,
           srcH,
           x,
           y,
           width,
           height
        )
    }
}
































// let image = new Image();
// image.src = '../resource/background.png';
// image.onload = () => {
//     this.ctx.drawImage(
//         image,
//         0,//起始位置
//         0,//起始位置
//         image.width,//裁剪的大小
//         image.height,//裁剪的大小
//         0,//放置在画布上的位置
//         0,//放置在画布上的位置
//         image.width,//使用的图片大小
//         image.height,//使用的图片大小
//     );
// }