import { DataStore } from './base/DataStore.js'  
export class Director{
    constructor() {
        this.dataStore = DataStore.getInstance();
    }
    static getIntance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }
    run() {
        this.dataStore.get('background').draw();
        console.log(this.dataStore.get('background'));
        console.log(this.dataStore.get('land'));
        // this.dataStore.get('land').draw();
    }

}