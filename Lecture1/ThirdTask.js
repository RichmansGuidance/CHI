const people = [
    { name: 'Heinz', age: 25, pets: ['cat'] },
    { name: 'Friedrich', age: 19, pets: ['dog'] },
    { name: 'Wilhelm', age: 30, pets: ['parrot'] },
    { name: 'Nikolaus', age: 22, pets: [] },
    { name: 'Karl', age: 18, pets: ['cat', 'dog'] },
];

const newPet = 'rabbit';
const adults = people.filter(({ age }) => age > 20);
const peopleWithNewPet = people.map(person => ({
    ...person,
    pets: [...person.pets, newPet]
}));

console.log(adults);
console.log(peopleWithNewPet);
