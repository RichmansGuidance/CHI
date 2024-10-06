const mixedArray = [42, "Hello", true, null, undefined, Symbol("sym"), 3.14, "World", false, BigInt(123)];

mixedArray.forEach(item => console.log(typeof item));

for (let i = 0; i < mixedArray.length; i++) {
    console.log(typeof mixedArray[i]);
}

let i = 0;
while (i < mixedArray.length) {
    console.log(typeof mixedArray[i]);
    i++;
}

i = 0;
do {
    console.log(typeof mixedArray[i]);
    i++;
} while (i < mixedArray.length);
