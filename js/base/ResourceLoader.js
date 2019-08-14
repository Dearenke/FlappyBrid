// 资源文件加载器，确保canvas在图片资源加载完成后才进行渲染。
import {Resources} from './Resources.js';

export class ResourceLoader{
    constructor() {
        this.map = new Map(Resources)//初始化资源
        for (let [key, value] of this.map) {
            const image = new Image();
            image.src = value;
            this.map.set(key,image)
        }
    }
    //确保图片都加载完毕了 记录
    onLoaded(callback) {
        console.log('进来了onLoaded');
        let loadedCount = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= this.map.size) {
                    callback(this.map)
                }
            }
        }
    }
    //这个static和java中的是一样的，可以通过ResourceLoader.create()去访问他
    static create(){
        return new ResourceLoader();
    }
}


