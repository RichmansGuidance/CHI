const sampleObject = {
    name: 'Margo',
    age: 21,
    city: 'Lemberg'
};

const keys = Object.keys(sampleObject);
console.log(keys); 

const hasAge = sampleObject.hasOwnProperty('age');
console.log(hasAge);

const values = Object.values(sampleObject);
console.log(values); 
