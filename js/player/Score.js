import { DataStore } from "../base/DataStore.js";

// 计分器类
export class Score{
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        console.log(this.ctx );
    }
}