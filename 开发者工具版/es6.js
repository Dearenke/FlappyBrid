class Animal {
    constructor(name='没取名 ',age=0) {
        this.name = name;
        this.age = age;
    }
    say() {
        console.log(this.name,this.age);
    }
}
class Cat extends Animal {
    constructor(name, age) {
        super(name, age);
    }
}
const cat = new Cat('小花猫哈哈哈',2);
cat.say();