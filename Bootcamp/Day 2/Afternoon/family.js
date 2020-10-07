function newPerson(name, age, parents, siblings) {
    this.name = name;
    this.age = age;
    this.parents = parents;
    this.siblings = siblings;
    //this.childOf = childOf;
    //this.siblingOf = siblingOf;
}

var person1 = new newPerson('Person 1', 18, [], []);
var person2 = new newPerson('Person 2', 16, [], []);


let parent1 = new newPerson('Parent 1', 48, [], []);
var parent2 = new newPerson('Parent 2', 51, [], []);
var parent3 = new newPerson('Parent 3', 53, [], []);

var grandparent1 = new newPerson('Grandparent 1', 71, [], []);
var grandparent2 = new newPerson('Grandparent 2', 73, [], []);
var grandparent3 = new newPerson('Grandparent 3', 79, [], []);

person1.parents.push(parent1);
person1.parents.push(parent2);

person2.parents.push(parent1);
person2.parents.push(parent2);

parent1.parents.push(grandparent1);
parent1.parents.push(grandparent2);

parent2.parents.push(grandparent3);

parent3.parents.push(grandparent1);
parent3.parents.push(grandparent2);

person1.siblings.push(person2);
person2.siblings.push(person1);

parent1.siblings.push(parent3);
parent3.siblings.push(parent1);


var everyone = {person1, person2, parent1, parent2, parent3, grandparent1, grandparent2, grandparent3};

module.exports = everyone;