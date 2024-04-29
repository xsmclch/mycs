let person = new Object();
person.name = 'Nicholas';
person.age = 29;

console.log(person, typeof person);

person = {
    name: 'Nicholas',
    age: 29,
}

console.log(person, typeof person)

person = {
    name: 'CZUi',
    age: 19,
    60: true,
    'my Person': {
        name: 'Kisara',
        age: 17,
    }
}

console.log(person, typeof person);
console.log(person['my Person'].age);
