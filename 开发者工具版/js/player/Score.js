import { DataStore } from "../base/DataStore.js";

// 计分器类
export class Score{
    constructor() {
        this.ctx = DataStore.getInstance().ctx;
        this.scoreNumber = 0;
        this.isScore = true;
    }
    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(
            this.scoreNumber,
            DataStore.getInstance().canvas.width / 16,
            DataStore.getInstance().canvas.height / 15,
            1000
        )
    }

}