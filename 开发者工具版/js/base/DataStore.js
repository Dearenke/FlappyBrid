// 变量缓存器,方便我们在不同的类中访问和修改变量.
export class DataStore{
    static getInstance() {
        //长期保存放在instance中 
        if(!DataStore.instance) {
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    constructor() {
        //需要随时销毁的东西,放在map中  
        this.map = new Map();
    }
    //省去了new的步骤
    put(key, value) {
        if ( typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        //操作DataStore连续进行put的时候,就不需要instance.put了,可以直接链式操作了
        return this;

    }
    get(key) {
        return this.map.get(key);
    }
    destory() {
        //清零内存和精灵
        for (let value of this.map.values()) {
            value = null;
        }
    }
}