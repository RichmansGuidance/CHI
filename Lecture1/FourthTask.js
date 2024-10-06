const arrayOf42 = new Array(10).fill(42);
console.log(arrayOf42);
arrayOf42.splice(4, 0, "answer");

const found = arrayOf42.find(item => item === "answer");
const index = arrayOf42.findIndex(item => item === "answer");
console.log(arrayOf42);
console.log(found,index);
